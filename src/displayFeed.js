import dateFormat from "./dateFormat.js";
import decodeEntities from "./decodeEntities.js";

/**
 * Fetches RSS feed and parses it to HTML link with title and timestamp.
 * @param {String} feedUrl - RSS feed URL
 * @param {String} backendUrl - rss2json backend URL
 * @return {Element}
 */
export default function displayFeed(feedUrl, backendUrl) {
    const div = document.createElement("div");
    fetch(`${backendUrl}?url=${encodeURI(feedUrl)}`)
    .then((response) => {
        response.json().then((data) => {
            const heading = document.createElement("h2");
            heading.innerHTML = data.title;
            div.appendChild(heading);
            data.items.forEach(function (item) {
                const link = document.createElement("a");
                link.href = decodeEntities(item.link);
                link.title = item.title;
                if (item.pubDate) {
                    const timestamp = dateFormat(new Date(item.pubDate));
                    link.innerHTML = `<span class=timestamp>
                                          ${timestamp}
                                      </span>
                                      <span class=title>
                                          ${item.title}
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
