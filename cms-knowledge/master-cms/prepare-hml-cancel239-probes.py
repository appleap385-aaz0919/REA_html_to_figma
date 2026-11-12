from pathlib import Path
base = Path("sources/runtime")
files = {
    "parent-initialized-baseline": "parent-baseline",
    "popup-text-and-caret-read": "popup-text-and-caret-read",
    "popup-ui-observation": "popup-ui-observation",
    "editor-save-once": "editor-save-once",
    "editor-save-outcome-observe": "editor-save-outcome",
    "family-draft-checks-read": "family-draft-checks"
}
for old, new in files.items():
    text = (base / f"explanation239-{old}.js").read_text(encoding="utf-8")
    text = text.replace("2089019", "2089104").replace("__qaExplain239", "__qaCancel239")
    text = text.replace("[QA-EXPLANATION-HML-20261110]", "[QA-HML-CANCEL-20261111]")
    (base / f"hml-cancel239-{new}.js").write_text(text, encoding="utf-8")
