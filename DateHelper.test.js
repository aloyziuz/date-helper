const expect = require("chai").expect;
const dateh = require("./DateHelper");

describe("Date helper tests", function(){
    it("should add days correctly", function(){
        let initialdate = new Date(2020, 0, 2, 0, 0, 0);
        let inputdate = new Date(initialdate.getTime());

        let outputdate = dateh.AddDays(inputdate, 1);
        //check that the input date is not modified by the function. it should return a new Date object
        expect(inputdate.getTime()).to.equal(initialdate.getTime());
        expect(outputdate).to.not.equal(inputdate);
        expect(outputdate.getDate()).to.equal(3);
        expect(outputdate.getMonth()).to.equal(0);
        expect(outputdate.getFullYear()).to.equal(2020);
        expect(outputdate.getHours()).to.equal(0);
        expect(outputdate.getMinutes()).to.equal(0);
        expect(outputdate.getSeconds()).to.equal(0);

        outputdate = dateh.AddDays(inputdate, -1);
        expect(inputdate.getTime()).to.equal(initialdate.getTime());
        expect(outputdate).to.not.equal(inputdate);
        expect(outputdate.getDate()).to.equal(1);
        expect(outputdate.getMonth()).to.equal(0);
        expect(outputdate.getFullYear()).to.equal(2020);
        expect(outputdate.getHours()).to.equal(0);
        expect(outputdate.getMinutes()).to.equal(0);
        expect(outputdate.getSeconds()).to.equal(0);

        outputdate = dateh.AddDays(inputdate, -2);
        expect(inputdate.getTime()).to.equal(initialdate.getTime());
        expect(outputdate).to.not.equal(inputdate);
        expect(outputdate.getDate()).to.equal(31);
        expect(outputdate.getMonth()).to.equal(11);
        expect(outputdate.getFullYear()).to.equal(2019);
        expect(outputdate.getHours()).to.equal(0);
        expect(outputdate.getMinutes()).to.equal(0);
        expect(outputdate.getSeconds()).to.equal(0);

        outputdate = dateh.AddDays(inputdate, 31);
        expect(inputdate.getTime()).to.equal(initialdate.getTime());
        expect(outputdate).to.not.equal(inputdate);
        expect(outputdate.getDate()).to.equal(2);
        expect(outputdate.getMonth()).to.equal(1);
        expect(outputdate.getFullYear()).to.equal(2020);
        expect(outputdate.getHours()).to.equal(0);
        expect(outputdate.getMinutes()).to.equal(0);
        expect(outputdate.getSeconds()).to.equal(0);

        outputdate = dateh.AddDays(inputdate, 0.5);
        expect(inputdate.getTime()).to.equal(initialdate.getTime());
        expect(outputdate).to.not.equal(inputdate);
        expect(outputdate.getDate()).to.equal(2);
        expect(outputdate.getMonth()).to.equal(0);
        expect(outputdate.getFullYear()).to.equal(2020);
        expect(outputdate.getHours()).to.equal(12);
        expect(outputdate.getMinutes()).to.equal(0);
        expect(outputdate.getSeconds()).to.equal(0);
    });

    it("should correctly identify dates within 24 hours", function(){
        let date1 = new Date(2020, 1, 1, 0, 0, 0);
        let date2 = new Date(2020, 1, 2, 0, 0, 0);
        expect(dateh.Within24Hrs(date1, date2)).to.be.false;

        date1 = new Date(2020, 1, 1, 20, 0, 0);
        date2 = new Date(2020, 1, 2, 18, 0, 0);
        expect(dateh.Within24Hrs(date1, date2)).to.be.true;
    });

    it("should correctly identify equal dates", function(){
        //test same date in utc
        let date1 = new Date(2020, 1, 1, 1, 0, 0);
        let date2 = new Date(2020, 1, 1, 0, 0, 0);
        expect(dateh.EqualDate(date1, date2, 0)).to.be.true;

        date1 = new Date(2020, 1, 1, 6, 0, 0);
        date2 = new Date(2020, 1, 1, 8, 0, 0);
        expect(dateh.EqualDate(date1, date2, 0)).to.be.false;

        //test same date in UTC+7 (assuming current computer is set to UTC+7)
        date1 = new Date(2020, 1, 1, 1, 0, 0);
        date2 = new Date(2020, 1, 1, 0, 0, 0);
        expect(dateh.EqualDate(date1, date2, -420)).to.be.true;

        date1 = new Date(2020, 1, 1, 6, 0, 0);
        date2 = new Date(2020, 1, 2, 8, 0, 0);
        expect(dateh.EqualDate(date1, date2, -420)).to.be.false;

        //test same date in UTC-2
        date1 = new Date(2020, 1, 1, 8, 59, 0);
        date2 = new Date(2020, 1, 1, 8, 0, 0);
        expect(dateh.EqualDate(date1, date2, 120)).to.be.true;

        date1 = new Date(2020, 1, 1, 4, 59, 0);
        date2 = new Date(2020, 1, 1, 5, 0, 0);
        expect(dateh.EqualDate(date1, date2, 120)).to.be.false;
    });

    it("should compute difference in days correctly", function(){
        let date1 = new Date(2020, 1, 1, 0, 0, 0);
        let date2 = new Date(2020, 1, 1, 12, 0, 0);
        let diff = dateh.DateDiffInDays(date1, date2);
        expect(diff).to.equal(0);

        date1 = new Date(2020, 1, 2, 0, 0, 0);
        date2 = dateh.AddDays(date1, 4);
        diff = dateh.DateDiffInDays(date1, date2);
        expect(diff).to.equal(4);

        date1 = new Date(2020, 0, 1, 0, 0, 0);
        date2 = new Date(2019, 11, 1, 0, 0, 0);
        diff = dateh.DateDiffInDays(date1, date2);
        expect(diff).to.equal(31);
        expect(diff).to.equal(dateh.DateDiffInDays(date2, date1));
    });
});