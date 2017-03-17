/**
 * Converts entities like &amp; to characters.
 * @param {String} text
 * @return {String}
 */
export default function decodeEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
};
