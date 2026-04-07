#!/bin/bash
# install.sh — automated setup for the EHMS info dashboard

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "=== EHMS Dashboard Setup ==="
echo ""

# ── 1. Check Python ──────────────────────────────────────────────────────────
if ! command -v python3 &>/dev/null; then
    echo "Error: python3 is required but not found." >&2
    exit 1
fi

python_version=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
required_major=3
required_minor=8

actual_major=$(echo "$python_version" | cut -d. -f1)
actual_minor=$(echo "$python_version" | cut -d. -f2)

if [ "$actual_major" -lt "$required_major" ] || \
   { [ "$actual_major" -eq "$required_major" ] && [ "$actual_minor" -lt "$required_minor" ]; }; then
    echo "Error: Python $required_major.$required_minor+ required (found $python_version)." >&2
    exit 1
fi
echo "✓ Python $python_version found"

# ── 2. Virtual environment ───────────────────────────────────────────────────
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment already exists"
fi

source .venv/bin/activate

# ── 3. Install dependencies ──────────────────────────────────────────────────
echo "Installing dependencies..."
pip install . -q
echo "✓ Dependencies installed"

# ── 4. Environment file ──────────────────────────────────────────────────────
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    echo "⚠  .env file created from .env.example."
    echo "   Please edit it and fill in your MC_TOKEN before running the dashboard:"
    echo ""
    echo "     nano $SCRIPT_DIR/.env"
    echo ""
    echo "   Then run:  python main.py"
    echo ""
    NEED_TOKEN=true
else
    echo "✓ .env file already exists"
    NEED_TOKEN=false
fi

# ── 5. Make scripts executable ───────────────────────────────────────────────
chmod +x connection_and_last_run_time_check.sh
echo "✓ connection_and_last_run_time_check.sh is executable"

# ── 6. Initial data fetch (only if .env looks configured) ───────────────────
if [ "$NEED_TOKEN" = false ]; then
    if grep -q "your_myclub_token_here" .env; then
        echo ""
        echo "⚠  MC_TOKEN in .env still has the placeholder value — skipping data fetch."
        echo "   Edit .env, then run:  source .venv/bin/activate && python main.py"
        echo ""
    else
        echo "Fetching initial data..."
        python main.py
    fi
fi

# ── 7. Cron setup ────────────────────────────────────────────────────────────
CRON_LINE="*/5 * * * * $SCRIPT_DIR/connection_and_last_run_time_check.sh > /tmp/webpage_cron.log 2>&1"

if crontab -l 2>/dev/null | grep -qF "connection_and_last_run_time_check.sh"; then
    echo "✓ Cron job already configured"
else
    echo ""
    read -r -p "Set up automatic data updates via cron? [y/N] " answer
    case "$answer" in
        [yY]*)
            (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
            echo "✓ Cron job added: runs every 5 minutes, updates data every 12 hours"
            ;;
        *)
            echo "  Skipped. To add it later, run: crontab -e"
            echo "  and add:  $CRON_LINE"
            ;;
    esac
fi

deactivate

# ── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo "=== Setup complete ==="
echo ""
echo "To start the dashboard:"
echo "  source .venv/bin/activate"
echo "  python -m http.server"
echo "  # then open http://localhost:8000/page"
echo ""
