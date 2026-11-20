@echo off
python -X utf8 "%~dp0review_agent.py" launch
if errorlevel 1 pause
