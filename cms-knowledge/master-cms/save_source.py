"""Preserve copied Chrome view-source HTML and its form schema, without CSRF values."""
import argparse
import hashlib
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
parser = argparse.ArgumentParser()
parser.add_argument("name")
parser.add_argument("expected_title")
args = parser.parse_args()
if not re.fullmatch(r"[a-z0-9-]+", args.name):
    parser.error("Use a simple source name")
read = subprocess.run(["powershell.exe", "-NoProfile", "-Command", "[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); Get-Clipboard -Raw"], capture_output=True, encoding="utf-8", check=True)
source = read.stdout
if not re.search(r"<!doctype|<html", source, re.I) or args.expected_title not in source:
    raise SystemExit("Clipboard does not contain the expected page source; nothing saved.")
source = re.sub(r"<(?:meta|input)\b[^>]*(?:csrf|authenticity.token)[^>]*>", "<!-- CSRF-bearing tag omitted -->", source, flags=re.I)
source = re.sub(r"\snonce\s*=\s*([\"']).*?\1", "", source, flags=re.I)

class Schema(HTMLParser):
    def __init__(self):
        super().__init__()
        self.selects, self.inputs, self.forms, self.scripts, self.links = [], [], [], [], []
        self.current_select = self.current_option = None
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "select":
            self.current_select = {"attributes": data, "options": []}
            self.selects.append(self.current_select)
        elif tag == "option" and self.current_select is not None:
            self.current_option = {"attributes": data, "text": ""}
            self.current_select["options"].append(self.current_option)
        elif tag in ("input", "textarea"):
            self.inputs.append({"tag": tag, "attributes": data})
        elif tag == "form":
            self.forms.append(data)
        elif tag == "script" and data.get("src"):
            self.scripts.append(data["src"])
        elif tag == "a" and data.get("href"):
            self.links.append(data["href"])
    def handle_data(self, data):
        if self.current_option is not None:
            self.current_option["text"] += data
    def handle_endtag(self, tag):
        if tag == "option":
            self.current_option = None
        elif tag == "select":
            self.current_select = self.current_option = None

schema = Schema()
schema.feed(source)
directory = Path(__file__).resolve().parent / "sources"
directory.mkdir(exist_ok=True)
path = directory / f"{args.name}.html"
path.write_text(source, encoding="utf-8")
result = {"source": "Chrome authenticated view-source, copied through the browser UI", "sanitized": True,
          "sha256OfSanitizedHtml": hashlib.sha256(source.encode()).hexdigest(),
          "selects": schema.selects, "inputs": schema.inputs, "forms": schema.forms,
          "scripts": schema.scripts, "links": list(dict.fromkeys(schema.links))}
path.with_suffix(".schema.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"file": str(path), "characters": len(source), "selects": [{"id": s["attributes"].get("id"), "name": s["attributes"].get("name"), "optionCount": len(s["options"])} for s in schema.selects],
                  "scriptUrls": schema.scripts, "formCount": len(schema.forms)}, ensure_ascii=False, indent=2))
