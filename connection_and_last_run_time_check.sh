#! /bin/bash

# Run this script on a cron schedule often (e.g. every) 5 minutes
# */5 * * * *
# It will check
# a) if there is an internet connection and
# b) if it's been more than 12 hours since the Python scripts were last run
# if a and b are true, it will run the Python scripts


INFO_PAGE_PATH="/home/ehms/webpage/"
MYCLUB_UPDATE_PATH="home/ehms/ehms_mc_api/"

# If internet connection is established (ping google, see if there is response)
if ping -c1 -w5 google.com > /dev/null 2>&1; then
    echo "Connection found"

    # Read the last timestamp from the file
    last_timestamp=$(tail -n 1 last_run_timestamp.log)

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

	# Append timestamp to the file
	echo "$timestamp" >> timestamp.log
	cd "$INFO_PAGE_PATH"
	source .venv/bin/activate
	python main.py
	deactivate

	cd "$MYCLUB_UPDATE_PATH"
	source .venv/bin/activate
	python src/initialise.py
	deactivate
	
	echo "$timestamp" >> last_run_timestamp.log
    else
	echo "It has NOT been more than 12 hours."
    fi
else
    echo "No internet connection"
fi


