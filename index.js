
var systemLongitude;
var defaultLang = 'en';

window.onload = function() {
    onTakeSystemTime();
    onTakeTimeZone();
    translate && translate(defaultLang);
}

function setLongitude(longitude) {
    let sign = false;
    if (longitude < 0) {
        sign = true;
        longitude *= -1;
    }
    let deg = Math.floor(longitude);
    let minWithSec = (longitude - deg) * 60;
    let min = Math.floor(minWithSec);
    let sec = (minWithSec - min) * 60;

    let elDeg = document.getElementById('longitude-degree-edit');
    elDeg.value = deg;
    let elMin = document.getElementById('longitude-minute-edit');
    elMin.value = min;
    let elSec = document.getElementById('longitude-second-edit');
    elSec.value = sec;
    let elSel = document.getElementById('longitude-select');
    elSel.selectedIndex = sign ? 1 : 0;

}

function onTakeSystemTime() {
    let now = new Date();

    let setField = function(id, value) {
        let el = document.getElementById(id);
        el.value = value;
    }

    setField('hour-edit', now.getHours());
    setField('minute-edit', now.getMinutes());
    setField('second-edit', now.getSeconds());
    setField('day-edit', now.getDate());
    setField('month-edit', now.getMonth() + 1);
    setField('year-edit', now.getFullYear());
}

function readInputs() {
    let getField = function(id) {
        return document.getElementById(id).value;
    }

    let day = parseInt(getField('day-edit'));
    if ( isNaN(day) || day < 1 || day > 31 ) {
        return;
    }

    let month = parseInt(getField('month-edit'));
    if ( isNaN(month) || month < 1 || month > 12 ) {
        return;
    }

    let year = parseInt(getField('year-edit'));
    if ( isNaN(year) || year < 2000 ) {
        return;
    }

    let hour = parseInt(getField('hour-edit'));
    if ( isNaN(hour) || hour < 0 || hour >= 24 ) {
        return;
    }

    let minute = parseInt(getField('minute-edit'));
    if ( isNaN(minute) || minute < 0 || minute >= 60 ) {
        return;
    }

    let second = parseInt(getField('second-edit'));
    if ( isNaN(second) || second < 0 || second >= 60 ) {
        return;
    }

    let daysInMonth = new Date(year, month + 1, 0);
    if ( day > daysInMonth ) {
        return;
    }

    let timezone = parseInt(getField('timezone-edit'));
    if ( isNaN(timezone) ) {
        return;
    }

    let longitudeDeg = parseInt(getField('longitude-degree-edit'));
    if ( isNaN(longitudeDeg) || longitudeDeg < 0 ) {
        return;
    }

    let longitudeMin = parseInt(getField('longitude-minute-edit'));
    if ( isNaN(longitudeMin) || longitudeMin < 0 || longitudeMin >= 60 ) {
        return;
    }

    let longitudeSec = parseFloat(getField('longitude-second-edit'));
    if ( isNaN(longitudeSec) || longitudeSec < 0 || longitudeSec >= 60 ) {
        return;
    }

    let longitudeSelectEl = document.getElementById('longitude-select');
    let longitudeSign = longitudeSelectEl.selectedIndex == 1;

    let longitude = longitudeDeg + longitudeMin/60.0 + longitudeSec/3600;
    if ( longitudeSign ) {
        longitude *= -1;
    }

    return {
        hour: hour,
        minute: minute,
        second: second,
        day: day,
        month: month,
        year: year,
        timezone: timezone,
        longitude: longitude,
    };
}

function updateLST() {
    let timeToStr = function(time) {
        let iToStrZ = function(value) {
            return value < 10 ? '0' + value : value;
        }
        return iToStrZ(time.hour) + ':' +
               iToStrZ(time.minute) + ':' +
               iToStrZ(time.second);
    };
    let apparentEl = document.getElementById('local-apparent-sidereal-time-label');
    let meanEl     = document.getElementById('local-mean-sidereal-time-label') ;
    let inData = readInputs();
    if ( !inData ) {
        let txt = getLangText(defaultLang, 'lstError');
        apparentEl.textContent = txt;
        meanEl.textContent = txt;
    }
    else {
        let result = calculateLST(inData);
        apparentEl.textContent = timeToStr(result.apparentSiderealTime);
        meanEl.textContent = timeToStr(result.meanSiderealTime);
    }
}

function onTakeLongitude() {
    if ( !systemLongitude ) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                systemLongitude = position.coords.longitude;
                setLongitude(systemLongitude);
            },
            () => setLongitude()
        );
    }
    else {
        setLongitude(systemLongitude);
    }

}

function onTakeTimeZone() {
    let el = document.getElementById('timezone-edit');
    el.value = (new Date().getTimezoneOffset()/60);
}
