if ping -c1 -w5 google.com > /dev/null 2>&1; then
    echo "Connection found"
    cd ~/projects/webpage/
    source .venv/bin/activate
    python check_last_run.py
    # ~/projects/webpage/.venv/bin/python ~/projects/webpage/check_last_run.py
else
    echo "No internet connection"
fi
