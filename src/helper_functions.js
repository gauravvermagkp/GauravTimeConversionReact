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
            timeZone:tz_name
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
        const converted_date = new Date(utcMillis).toLocaleString('en-GB', opts)


        const converted_userinput = converted_date
        const converted_live = new Date(localUtcMillis).toLocaleString('en-GB', opts)
        const output = timeDiffLabel(timeZone, preferredBase)
        return [converted_userinput, ...output, converted_live]
    }
    else {
        const converted_live = new Date(localUtcMillis).toLocaleString('en-GB', opts)
        const output = timeDiffLabel(timeZone, preferredBase)
        return ['--', ...output, converted_live]

    }
}

export const zone_name_mapping_original = {
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

