#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=== Webpage installer ==="
echo "Project directory: $SCRIPT_DIR"

# ── 1. Python virtual environment ────────────────────────────────────────────
if [ ! -d "$SCRIPT_DIR/.venv" ]; then
    echo ""
    echo "Creating virtual environment..."
    python3 -m venv "$SCRIPT_DIR/.venv"
else
    echo ""
    echo "Virtual environment already exists, skipping creation."
fi

echo "Installing Python dependencies..."
source "$SCRIPT_DIR/.venv/bin/activate"
pip install -r "$SCRIPT_DIR/requirements.txt" -q
deactivate
echo "Dependencies installed."

# ── 2. .env file ─────────────────────────────────────────────────────────────
ENV_FILE="$SCRIPT_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo ""
    echo "Creating .env file..."
    read -rp "Enter MC_TOKEN: " mc_token
    read -rp "Enter EQUALITY_PERSON_EMAIL (leave blank to skip): " eq_email
    read -rp "Enter EQUALITY_PERSON_PHONE (leave blank to skip): " eq_phone
    cat > "$ENV_FILE" <<EOF
MC_TOKEN="$mc_token"
EQUALITY_PERSON_EMAIL="$eq_email"
EQUALITY_PERSON_PHONE="$eq_phone"
EOF
    echo ".env created."
else
    echo ""
    echo ".env already exists, skipping."
fi

# ── 3. Make scripts executable ────────────────────────────────────────────────
chmod +x "$SCRIPT_DIR/connection_and_last_run_time_check.sh"

# ── 4. Cron job ───────────────────────────────────────────────────────────────
CRON_CMD="*/5 * * * * $SCRIPT_DIR/connection_and_last_run_time_check.sh > /tmp/webpage_cron.log 2>&1"

echo ""
if crontab -l 2>/dev/null | grep -qF "$SCRIPT_DIR/connection_and_last_run_time_check.sh"; then
    echo "Cron job already registered, skipping."
else
    echo "The following cron job will run the update check every 5 minutes:"
    echo "  $CRON_CMD"
    read -rp "Register this cron job? [y/N] " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        ( crontab -l 2>/dev/null; echo "$CRON_CMD" ) | crontab -
        echo "Cron job registered."
    else
        echo "Skipped cron job. You can add it manually — see crontab.txt for instructions."
    fi
fi

echo ""
echo "=== Installation complete ==="
echo "The script will run every 5 minutes and update the page every 12 hours when online."
