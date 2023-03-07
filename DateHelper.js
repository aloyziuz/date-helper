const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MS_PER_MIN = 1000 * 60;

module.exports = {
    /**
     * compute difference in 2 dates in days regardless of time
     * @param {Date} date1 
     * @param {Date} date2 
     */
    DateDiffInDays: function(date1, date2) {
        const offset1 = date1.getTimezoneOffset();
        const offset2 = date2.getTimezoneOffset();
        const offsetDiff = offset1 - offset2;
        const d2 = this.RemoveTime(this.AddMinutes(date2, offsetDiff));

        return Math.abs(Math.floor((d2 - date1) / _MS_PER_DAY));
    }, 
    
    /**
     * 
     * @param {Date} date 
     * @param {Number} dayno 
     */
	AddDays: function(date, dayno){
		return new Date(date.getTime() + (dayno * _MS_PER_DAY));
    }, 

    /**
     * 
     * @param {Date} date 
     * @param {Number} dayno 
     */
	AddMinutes: function(date, minutes){
		return new Date(date.getTime() + (minutes * _MS_PER_MIN));
    }, 
    
    /**
     * will return true if the 2 dates are within 24 hours away from each other
     * @param {Date} date1 
     * @param {Date} date2 
     */
    Within24Hrs: function(date1, date2) {
        let msdiff = Math.abs(date1.getTime() - date2.getTime());
        return msdiff < _MS_PER_DAY;
    },

    /**
     * it will determine if 2 timestamps are within the same datr at the specified timezone offset or not 
     * e.g. 22-2-2022 0:0:0 (UTC) and 21-2-2022 23:0:0 (UTC) and we want to check 
     * whether these 2 timestamps are on the same day or not at timezone (UTC+7 - offset 420mins)
     * at UTC+7, the 2 lies on the same date and function will return true
     * at UTC+0, the 2 lies on different dates and function will return false
     * @param {Date} date1 
     * @param {Date} date2 
     * @param {Number}   desiredOffset offset from UTC time in minutes. 
     */
    EqualDate: function(date1, date2, desiredOffset){
        const offset1 = date1.getTimezoneOffset();
        const offset2 = date2.getTimezoneOffset();
        const d1 = this.AddMinutes(date1, desiredOffset + offset1);
        const d2 = this.AddMinutes(date2, desiredOffset + offset2);

        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && 
            d1.getDate() === d2.getDate();
    }, 

    /**
     * will convert a date to utc. only take the date part, time parts are set to 0
     * @param {Date} date 
     */
    GetUTCDate: function(date){
        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0);
    }, 

    /**
     * converts a date into utc. output is in milliseconds. 
     * @param {Date} date 
     */
    ConvertToUTC: function(date){
        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), 
        date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    }, 

    /**
     * 
     * @param {Date} date 
     */
    RemoveTime: function(date){
        const res = new Date(date.getTime());
        res.setHours(0, 0, 0, 0);
        return res;
    }, 

    /**
     * formats a date into dd-mm-yyyy format
     * @param {Date} date 
     * @param {string} separator 
     */
    FormatDDMMYYYY: function(date, separator = '-'){
        const datePart = date.getDate();
        const monthPart = date.getMonth() + 1;
        const yearPart = date.getFullYear();
        return `${datePart}${separator}${monthPart}${separator}${yearPart}`;
    }
}