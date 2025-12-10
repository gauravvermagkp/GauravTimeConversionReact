function getOffsetMinutes(instant, timeZone) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = fmt.formatToParts(instant);
    const map = {};
    parts.forEach(p => {
        if (p.type !== 'literal') map[p.type] = p.value;
    });

    const asUTC = Date.UTC(
        Number(map.year),
        Number(map.month) - 1,
        Number(map.day),
        Number(map.hour),
        Number(map.minute),
        Number(map.second)
    );

    // offset = local_time_as_UTC - actual_UTC
    return Math.round((asUTC - instant.getTime()) / 60000);
}

function timediffformat(diffMinutes, base) {
    const absMin = Math.abs(diffMinutes);
    const hrs = Math.floor(absMin / 60);
    const mins = absMin % 60;
    const hPart = hrs > 0 ? `${hrs}h` : "";
    const mPart = mins > 0 ? `${mins}m` : "";
    const sep = hPart && mPart ? " " : "";
    if (diffMinutes == 0) return `(${base})`
    const direction = diffMinutes > 0 ? `${base} + ` : `${base} - `;
    return `(${direction} ${hPart}${sep}${mPart})`.trim();

}

export function timeDiffLabel(tz, preferredBase) {
    const now = new Date();
    const offsetgmt = getOffsetMinutes(now, "UTC");
    const offsetlocal = getOffsetMinutes(now, preferredBase);
    const offsetOther = getOffsetMinutes(now, tz);

    const diffMinutesgmt = offsetOther - offsetgmt;   // other - UTC

    const diffMinuteslocal = offsetOther - offsetlocal;   // other - local

    const time_diff_utc = timediffformat(diffMinutesgmt, "UTC");
    const time_diff_local = timediffformat(diffMinuteslocal, preferredBase)
    let output = []
    output[0] = time_diff_utc
    output[1] = time_diff_local
    return output


}

export function liveTime(zone_name_mapping) {
    const newliveTimes = {}

    Object.entries(zone_name_mapping).forEach(([country, tz_name]) => {
        const opts = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: tz_name
        };
        newliveTimes[country] = new Date().toLocaleString('en-GB', opts);

    })

    return newliveTimes
}


export function convertedTime(inputDate, preferredBase, timeZone) {

    if (inputDate) {
        let utcMillis = ''
        const opts = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone
        };
        const parts = inputDate.split('T');
        if (parts.length !== 2) return null;
        const [y, m, d] = parts[0].split('-').map(Number);
        const [hh, mm] = parts[1].split(':').map(Number);
        if ([y, m, d, hh, mm].some(v => Number.isNaN(v))) return null;
        const localUtcMillis = Date.UTC(y, m - 1, d, hh, mm, 0);
        if (preferredBase === "IST") {
            const istOffsetMs = 5.5 * 3600 * 1000; // IST = UTC+5:30
            utcMillis = localUtcMillis - istOffsetMs;

        }
        else if (preferredBase === "EST") {
            const estOffsetMs = 5 * 3600 * 1000; // EST = UTC-5:00 (approx, without DST)
            utcMillis = localUtcMillis + estOffsetMs;

        }
        return new Date(utcMillis).toLocaleString('en-GB', opts)
    }
    else {
        return '--'
    }
}

const zone_name_mapping_original = {
    India: 'Asia/Kolkata',
    Australia: 'Australia/Sydney',
    Belgium: 'Europe/Berlin',
    'South Africa': 'Africa/Johannesburg',
    Brazil: 'Brazil/East',
    Canada: 'America/Toronto',
    France: 'Europe/Berlin',
    Germany: 'Europe/Berlin',
    Japan: 'Japan',
    Mexico: 'America/Mexico_City',
    Netherland: 'Europe/Berlin',
    Poland: 'Europe/Warsaw',
    Spain: 'Europe/Berlin',
    Switzerland: 'Europe/Berlin',
    Thailand: 'Asia/Bangkok'
};

export const zone_name_mapping_extras_original = {
    'USA': 'America/New_York'
};

export const zone_name_mapping_initial = { ...zone_name_mapping_original, ...zone_name_mapping_extras_original };


export let region_mapping = {
    APAC: ['Australia', 'Thailand', 'Japan'],
    CLAR: ['Brazil', 'Mexico', 'Canada'],
    EMEA: ['Poland', 'Belgium', 'France', 'Germany', 'Netherland', 'Spain', 'Switzerland', 'South Africa']
}

region_mapping.ALL = Object.values(region_mapping).flat();

export function getRegionForCountry(country, mapping) {
    // 1. Check all regions except ALL
    for (const [region, countries] of Object.entries(mapping)) {
        if (region === "ALL") continue; // skip ALL

        if (countries.includes(country)) {
            return region; // exclusive region found
        }
    }
    return "ALL";
}

export function sorting(timeObj, sort) {
    return Object.entries(timeObj)  //ASC
        .sort((a, b) => sort ? new Date(a[1]) - new Date(b[1]) : new Date(b[1]) - new Date(a[1]))
        .reduce((acc, [country, time]) => {
            acc[country] = time;
            return acc;
        }, {});
}


// =================================================================


// classify business-hours bucket for a given instant and timezone
export function classifyBusinessHours(time_str, timeZone) {
    if (!time_str || time_str === '--') return 'business-off';

    const time = time_str.split(", ")[1];
    let [h, m, s] = time.split(" ")[0].split(":").map(Number);
    const ampm = time.split(" ")[1].toLowerCase();

    if (ampm === "pm" && h !== 12) h += 12;
    if (ampm === "am" && h === 12) h = 0;
    if (isNaN(h)) return 'business-off';
    // core: 09:00–18:00, off: others (we treat everything else as extended/off)
    if (h >= 9 && h < 18) return 'business-core';
    return 'business-extended';
}

// ==============================
//UTC
export const batchTimigs = {
    'EMEA': ['03:00', '08:30',0],
    'CLAR': ['09:00', '15:00',0],
    'APAC': ['16:00', '22:00',1],
   

};


export function convertedTime2(timeStr, preferredBase) {

    const today = new Date();
    const [month, day, year] = [
        today.getMonth(),
        today.getDate(),
        today.getFullYear()
    ];

    // 2. Combine date + time into one string
    const start_time = `${year}-${month}-${day}T${timeStr[0]}`;
    const end_time = `${year}-${month}-${day}T${timeStr[1]}`;

    const opts = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true       
    };
    let parts = start_time.split('T');
    if (parts.length !== 2) return null;
    let [y, m, d] = parts[0].split('-').map(Number);
    let [hh, mm] = parts[1].split(':').map(Number);
    if ([y, m, d, hh, mm].some(v => Number.isNaN(v))) return null;
    let localUtcMillis = Date.UTC(y, m, d, hh, mm, 0);
    if (preferredBase === "IST") {
        opts.timeZone = 'Asia/Kolkata'
    }
    else if (preferredBase === "EST") {
         opts.timeZone = 'America/New_York'

    }
    const start_time_converted = new Date(localUtcMillis).toLocaleString('en-GB', opts)

    parts = end_time.split('T');
    if (parts.length !== 2) return null;
    [y, m, d] = parts[0].split('-').map(Number);
    [hh, mm] = parts[1].split(':').map(Number);
    if ([y, m, d, hh, mm].some(v => Number.isNaN(v))) return null;
    // if(timeStr[2]===1){
    //     d+=1;
    // }
    localUtcMillis = Date.UTC(y, m , d, hh, mm, 0);
    if (preferredBase === "IST") {
       opts.timeZone = 'Asia/Kolkata'
    }
    else if (preferredBase === "EST") {
       opts.timeZone = 'America/New_York'

    }
    const end_time_converted = new Date(localUtcMillis).toLocaleString('en-GB', opts) 
    return [start_time_converted, end_time_converted]


}
// Input Date in UserInputSection.jsx: 2025-12-09T21:52
