import tkinter as tk
from tkinter import messagebox
import os
import json
from time import sleep
import threading

# Define the folder containing your JSON files
json_folder = "data"

# Get a list of JSON files in the folder
json_files = [
    os.path.join(json_folder, file)
    for file in os.listdir(json_folder)
    if file.lower().endswith(".json")
]

if not json_files:
    messagebox.showerror("Error", "No JSON files found in the folder!")
    exit()


# Function to read and parse JSON content
def read_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


# Slideshow function
def start_slideshow():
    global running
    running = True
    while running:  # Loop the slideshow
        for json_file in json_files:
            if not running:
                break
            try:
                json_data = read_json(json_file)
                title = json_data.get("weapon")
                events = json_data.get("events")
                news = json_data.get("news")
                events_list = []
                news_list = []
                for e in events:
                    events_list.append(e.get("name"))
                    
                title_label.config(text=title)
                content_label.config(text=events_list)
                sleep(3)  # Delay between slides
            except Exception as e:
                messagebox.showerror("Error", f"Error reading {json_file}: {e}")
        if running:  # Restart the loop if still running
            continue


# Function to stop the slideshow
def stop_slideshow():
    global running
    running = False


# GUI setup
root = tk.Tk()
root.title("JSON Text Slideshow")

# Title label
title_label = tk.Label(
    root, text="", font=("Helvetica", 16, "bold"), wraplength=600, justify="center"
)
title_label.pack(pady=10)

# Content label
content_label = tk.Label(
    root, text="", font=("Helvetica", 14), wraplength=600, justify="left"
)
content_label.pack(pady=20)

# Control buttons
button_frame = tk.Frame(root)
button_frame.pack(pady=10)

start_button = tk.Button(
    button_frame,
    text="Start",
    font=("Helvetica", 12),
    command=lambda: threading.Thread(target=start_slideshow).start(),
)
start_button.pack(side="left", padx=5)

stop_button = tk.Button(
    button_frame, text="Stop", font=("Helvetica", 12), command=stop_slideshow
)
stop_button.pack(side="left", padx=5)

exit_button = tk.Button(
    button_frame, text="Exit", font=("Helvetica", 12), command=root.destroy
)
exit_button.pack(side="left", padx=5)

# Start the GUI event loop
root.mainloop()
