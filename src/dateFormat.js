/**
 * Formats date to "d.m. H:MM" string.
 * @param {Date} date
 * @return {String} formatted date string
 */
export default function dateFormat(date) {
    const hours = date.getHours();
    const mins = ("0" + date.getMinutes()).slice(-2);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month}. ${hours}:${mins}`;
};
