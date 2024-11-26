from http.server import SimpleHTTPRequestHandler, HTTPServer
from datetime import datetime
import time
import os


pages = ["presences.html", "schedule.html"]


class CyclingWebPage(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass
    
    def do_GET(self):
        if self.path == "/":  # Root path
            # Determine which page to serve based on the current time
            current_time = int(time.time())
            page_index = (current_time // 5) % len(pages)  # Change every 10 seconds
            page_to_serve = pages[page_index]

            try:
                # Read the selected page's content
                with open(page_to_serve, "r", encoding="utf-8") as file:
                    html_content = file.read()

                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                html_content = html_content.replace(
                    '<p>The current server time will be displayed here dynamically.</p>',
                    f'<p>The current server time is: <span class="time">{current_time}</span></p>'
                )


                # Send the HTTP response
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(html_content.encode("utf-8"))

            except FileNotFoundError:
                # Handle missing file
                self.send_response(404)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(b"<h1>404 Not Found</h1>")

        elif self.path.endswith(".css"):  # Serve CSS files
            css_path = self.path.lstrip("/")
            if os.path.exists(css_path):
                with open(css_path, "r", encoding="utf-8") as file:
                    css_content = file.read()

                self.send_response(200)
                self.send_header("Content-type", "text/css")
                self.end_headers()
                self.wfile.write(css_content.encode("utf-8"))
            else:
                # Handle missing CSS file
                self.send_response(404)
                self.send_header("Content-type", "text/plain")
                self.end_headers()
                self.wfile.write(b"CSS file not found.")
        else:
            # Serve 404 for other paths
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>404 Not Found</h1>")


# Run the server
def run(server_class=HTTPServer, handler_class=CyclingWebPage, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
