#! /bin/bash

# Run this script on a cron schedule often (e.g. every) 5 minutes
# */5 * * * *
# It will check
# a) if there is an internet connection and
# b) if it's been more than 12 hours since the Python scripts were last run
# if a and b are true, it will run the Python scripts


# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
INFO_PAGE_PATH="$SCRIPT_DIR"
TIMESTAMP_FILE="$INFO_PAGE_PATH/last_run_timestamp.log"

# Create timestamp file if it doesn't exist
if [ ! -f "$TIMESTAMP_FILE" ]; then
    mkdir -p "$INFO_PAGE_PATH"
    date "+%Y-%m-%d %H:%M:%S" > "$TIMESTAMP_FILE"
fi

# If internet connection is established (ping google, see if there is response)
if ping -c1 -w5 google.com > /dev/null 2>&1; then
    echo "Connection found"

    # Read the last timestamp from the file
    last_timestamp=$(tail -n 1 "$TIMESTAMP_FILE")

    if [ -z "$last_timestamp" ]; then
	echo "No timestamp found in file."
	exit 1
    fi

    # Convert last timestamp and current time to seconds since epoch
    last_epoch=$(date -d "$last_timestamp" +%s)
    now_epoch=$(date +%s)

    # Calculate the difference in seconds and then in hours
    diff_seconds=$((now_epoch - last_epoch))
    diff_hours=$((diff_seconds / 3600))

    echo "Last timestamp: $last_timestamp"
    echo "Time difference: $diff_hours hour(s)"

    # Check if difference is greater than 12 hours
    if [ "$diff_hours" -gt 12 ]; then
	echo "It has been more than 12 hours."
	# Get current timestamp in format YYYY-MM-DD HH:MM:SS
	timestamp=$(date "+%Y-%m-%d %H:%M:%S")

   	cd "$INFO_PAGE_PATH"
	if git pull; then
	    echo "Git pull successful"
	else
	    echo "Warning: Git pull failed, continuing anyway"
	fi

	if [ -f .venv/bin/activate ]; then
	    source .venv/bin/activate
	    if python main.py; then
	        echo "Python script executed successfully"
	    else
	        echo "Error: Python script failed"
	    fi
	    deactivate
	else
	    echo "Error: Virtual environment not found at .venv/bin/activate"
	fi

	# Replace timestamp in the file
	echo "$timestamp" > "$TIMESTAMP_FILE"
    else
	echo "It has NOT been more than 12 hours."
    fi
else
    echo "No internet connection"
fi


