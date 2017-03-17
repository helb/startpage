import "./index.scss";
import settings from "../settings.json";
import displayLink from "./displayLink.js";
import displayFeed from "./displayFeed.js";

document.addEventListener("DOMContentLoaded", function () {
    document.title = settings.title;

    const linkSection = document.createElement("section");
    linkSection.classList.add("links");

    const feedSection = document.createElement("section");
    feedSection.classList.add("feeds");

    settings.rss.forEach(function (feedUrl) {
        feedSection.appendChild(displayFeed(feedUrl, settings.feedItems, settings.rss2jsonKey));
    });

    settings.links.forEach(function (link) {
        linkSection.appendChild(displayLink(link));
    });

    document.body.appendChild(linkSection);
    document.body.appendChild(feedSection);
});
