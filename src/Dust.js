export default class Dust {
    sidoName = "";
    stationName = "";
    pm10Grade = 1;
    pm10Value = 0;
    dataTime = new Date();
    bookmarked = false;

    constructor({sidoName, stationName, pm10Grade, pm10Value, dataTime,}) {
        this.sidoName = sidoName;
        this.stationName = stationName;
        this.pm10Grade = pm10Grade;
        this.pm10Value = pm10Value;
        this.dataTime = dataTime;
    }
}