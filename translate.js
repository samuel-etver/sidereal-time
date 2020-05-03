const langRes = {
    dayLabel: {
        en: 'Day:',
        ru: 'День:'
    },
    monthLabel: {
        en: 'Month:',
        ru: 'Месяц:'
    },
    yearLabel: {
        en: 'Year:',
        ru: 'Год:'
    },
    hourLabel: {
        en: 'Hour:',
        ru: 'Час:'
    },
    minuteLabel: {
        en: 'Minute:',
        ru: 'Минуты:'
    },
    secondLabel: {
        en: 'Second',
        ru: 'Секунды:'        
    },
    longitudeLabel: {
        en: 'Longitude:',
        ru: 'Долгота:'
    },
    timeZoneLabel: {
        en: 'Time zone:',
        ru: 'Часовой пояс:'
    },
    mainTitle: {
        en: 'Local sidereal Time (LST)',
        ru: 'Сидерическое время (LST)'
    },
    lstError: {
        en: 'ERROR!',
        ru: 'ОШИБКА!'
    },
    takeSystemTimeButton: {
        en: 'Take System Time (UTC)',
        ru: 'Системное время (UTC)'
    },
    takeTimeZoneButton: {
        en: 'Take Time Zone',
        ru: 'Взять с системы'
    },
    takeLongitudeButton: {
        en: 'Take Longitude',
        ru: 'Взять с системы'
    },
    calculateButton: {
        en: 'Calculate',
        ru: 'Вычислить'
    },
    longitudeOptionW: {
        en: 'W',
        ru: 'З'
    },
    longitudeOptionE: {
        en: 'E',
        ru: 'В'
    }
}

function translate(lang) {
    let set = function(id, resName) {
        let txt = getLangText(lang, resName);
        document.getElementById(id).textContent = txt ? txt : '';
    };

    set('day-label', 'dayLabel');
    set('month-label', 'monthLabel');
    set('year-label', 'yearLabel');
    set('hour-label', 'hourLabel');
    set('minute-label', 'minuteLabel');
    set('second-label', 'secondLabel');    
    set('longitude-label', 'longitudeLabel');
    set('timezone-label', 'timeZoneLabel');
    set('main-title', 'mainTitle');
    set('system-time-button', 'takeSystemTimeButton'),
    set('timezone-button', 'takeTimeZoneButton');
    set('longitude-button', 'takeLongitudeButton');
    set('calculate-button', 'calculateButton');
    set('longitude-option-W', 'longitudeOptionW');
    set('longitude-option-E', 'longitudeOptionE');
}

function getLangText(lang, resName) {
    let res = langRes[resName];
    if (res) {
        return res[lang];
    }        
}
