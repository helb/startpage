import dateFormat from "./dateFormat.js";
import decodeEntities from "./decodeEntities.js";

/**
 * Fetches RSS feed and parses it to HTML link with title and timestamp.
 * @param {String} url - RSS feed URL
 * @param {Integer} items - Number of feed items to display
 * @param {String} apiKey - API key for rss2json.com service
 * @return {Element}
 */
export default function displayFeed(url, items = 10, apiKey) {
    const div = document.createElement("div");
    fetch(`https://rss2json.com/api.json?rss_url=${encodeURI(url)}&count=${items}&api_key=${apiKey}`)
    .then((response) => {
        response.json().then((data) => {
            const heading = document.createElement("h2");
            heading.innerHTML = data.feed.title;
            div.appendChild(heading);
            data.items.forEach(function (item) {
                const link = document.createElement("a");
                link.href = decodeEntities(item.link);
                link.title = item.title;
                if (item.pubDate) {
                    const timestamp = dateFormat(new Date(item.pubDate));
                    link.innerHTML = `<span class=title>
                                          ${item.title}
                                      </span>
                                      <span class=timestamp>
                                          ${timestamp}
                                      </span>`;
                } else {
                    link.innerHTML = `<span class=title>
                                          ${item.title}
                                      </span>`;
                }
                div.appendChild(link);
            });

        });
    });
    return div;
};
