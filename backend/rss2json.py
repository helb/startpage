#!/usr/bin/env python
import feedparser
from urllib import parse as urlparse
from http.server import SimpleHTTPRequestHandler, HTTPServer
import json


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        params = urlparse.urlparse(self.path)
        query = urlparse.parse_qs(params.query)
        try:
            rss = feedparser.parse(query["url"][0])
            items = []
            for item in rss.entries[:10]:
                print(item)
                if "published" in item:
                    date = item.published
                elif "updated" in item:
                    date = item.updated
                else:
                    date = None
                items.append({
                    "link": item.link,
                    "title": item.title,
                    "pubDate": date
                })
            json_response = json.dumps({
                "title": rss.feed.title,
                "items": items
            })
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json_response, "utf8"))
        except:
            self.send_response(400)
            self.end_headers()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        SimpleHTTPRequestHandler.end_headers(self)


def main():
    server = HTTPServer(("0.0.0.0", 8000), CORSRequestHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
