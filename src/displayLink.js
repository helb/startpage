/**
 * Creates HTML link with icon and title.
 * @param {Object} link - Object with 'title', 'icon', and 'url' strings. 
 * @return {Element}
 */
export default function displayLink(link) {
    const a = document.createElement("a");
    a.href = link.url;
    a.title = link.title;
    const icon = document.createElement("img");
    icon.src = link.icon;
    icon.alt = link.title;
    const label = document.createElement("span");
    label.innerHTML = link.title;
    a.appendChild(icon);
    a.appendChild(label);
    return a;
};
