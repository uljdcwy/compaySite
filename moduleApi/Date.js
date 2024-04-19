export function getFormatTime(format = 'YYYY-MM-DD hh:mm:ss', date = new Date()) {
    date = (typeof date === 'string' || typeof date === 'number') ? new Date(date) : date;
    let getFullYear = date.getFullYear();
    /**
     * @type {number | string}
     */
    let getMonth = date.getMonth() + 1;
    getMonth = (getMonth < 10) ? ('0' + getMonth) : getMonth;
    /**
     * @type {number | string}
     */
    let getDate = date.getDate();
    getDate = (getDate < 10) ? ('0' + getDate) : getDate;
    /**
     * @type {number | string}
     */
    let getHours = date.getHours();
    getHours = (getHours < 10) ? ('0' + getHours) : getHours;
    /**
     * @type {number | string}
     */
    let getMinutes = date.getMinutes();
    getMinutes = (getMinutes < 10) ? ('0' + getMinutes) : getMinutes;
    /**
     * @type {number | string}
     */
    let getSeconds = date.getSeconds();
    getSeconds = (getSeconds < 10) ? ('0' + getSeconds) : getSeconds;
    /**
     * @type {number | string}
     */
    let getMilliseconds = date.getMilliseconds();
    getMilliseconds = (getMilliseconds < 10) ? ('00' + getMilliseconds) : (getMilliseconds < 100) ? ('0' + getMilliseconds) : getMilliseconds;
    let dateStr = "";
    /**
     * @type {any}
     */
    let regArr = '';
    while (regArr = /(Y{1,4}|M{1,2}|D{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3})([^YMDhmsS]*)/.exec(format)) {
        let regLength = regArr[0];
        let currentFormat = regArr[1];
        let currentPlaceholder = regArr[2];
        switch (currentFormat[0]) {
            case 'Y':
                dateStr += dateFormat(getFullYear, currentFormat, currentPlaceholder || '', 4);
                break;
            case 'M':
                dateStr += dateFormat(getMonth, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'D':
                dateStr += dateFormat(getDate, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'h':
                dateStr += dateFormat(getHours, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'm':
                dateStr += dateFormat(getMinutes, currentFormat, currentPlaceholder || '', 2);
                break;
            case 's':
                dateStr += dateFormat(getSeconds, currentFormat, currentPlaceholder || '', 2);
                break;
            case 'S':
                dateStr += dateFormat(getMilliseconds, currentFormat, currentPlaceholder || '', 3);
                break;
        }
        format = format.slice(regLength.length, format.length);
    };

    /**
     * @param {string | number | any[]} currentDateStr
     * @param {string | any[]} currentFormat
     * @param {string} currentPlaceholder
     * @param {number} maxLen
     */
    function dateFormat(currentDateStr, currentFormat, currentPlaceholder, maxLen) {
        currentDateStr = currentDateStr.toString();
        return currentDateStr.slice((maxLen - currentFormat.length), currentDateStr.length) + currentPlaceholder
    };
    return dateStr;
}