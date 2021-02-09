const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MS_PER_MIN = 1000 * 60;

module.exports = {
    /**
     * compute difference in 2 dates in days regardless of time
     * @param {Date} date1 
     * @param {Date} date2 
     */
    DateDiffInDays: function(date1, date2) {
        // Discard the time and time-zone information.
        const utc1 = module.exports.GetUTCDate(date1);
        const utc2 = module.exports.GetUTCDate(date2);

        return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
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
     * 
     * @param {Date} date1 
     * @param {Date} date2 
     */
    EqualDate: function(date1, date2){
        let utc1 = this.GetUTCDate(date1);
        let utc2 = this.GetUTCDate(date2);

        return utc1 == utc2;
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
    }
}