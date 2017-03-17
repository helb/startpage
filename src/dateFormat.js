/**
 * Formats date to "d.m. H:MM" string.
 * @param {Date} date
 * @return {String} formatted date string
 */
export default function dateFormat(date) {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const hours = d.getHours();
    const mins = ("0" + d.getMinutes()).slice(-2);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    return `${day}.${month}. ${hours}:${mins}`;
};
