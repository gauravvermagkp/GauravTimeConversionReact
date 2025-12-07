import { liveTime, sorting, timeDiffLabel, getRegionForCountry, zone_name_mapping_extras_original, region_mapping } from '../helper_functions.js';
import { useState, useEffect } from 'react';
import PrimaryEST from './PrimaryEST.jsx'
import ConvertedChips from './ConvertedChips.jsx';

export default function LiveSection({ props_object }) {
    const zone_name_mapping = props_object.zone_name_mapping
    const sort = props_object.sort
    const preferredBase = props_object.preferredBase
    const setzone_name_mapping = props_object.setzone_name_mapping
    const setdiff_utc = props_object.setdiff_utc
    const setdiff_local = props_object.setdiff_local
    const showDiff = props_object.showDiff
    const region = props_object.region
    const diff_utc = props_object.diff_utc
    const diff_local = props_object.diff_local

    const [liveTimes, setliveTimes] = useState(liveTime(zone_name_mapping));
    const [collapseLive, setcollapseLive] = useState(true);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setliveTimes(liveTime(zone_name_mapping));
        }, 1000);
        setzone_name_mapping(Object.keys(sorting(liveTimes, sort))
            .reduce((acc, country) => {
                acc[country] = zone_name_mapping[country];
                return acc;
            }, {}))

        const utc_diffs = {}
        const local_diffs = {}
        Object.entries(zone_name_mapping).forEach(([country, tz_name]) => {
            utc_diffs[country] = timeDiffLabel(tz_name, preferredBase)[0]
            local_diffs[country] = timeDiffLabel(tz_name, preferredBase)[1]
        }
        );
        setdiff_utc(utc_diffs);
        setdiff_local(local_diffs);
        return () => clearInterval(intervalId);
    }, [sort, preferredBase]);

    return (
        <>
            <div className='card'>
                <h3>Live Times</h3>
                <button type="button" class="collapse-btn" onClick={() => setcollapseLive(!collapseLive)}>{collapseLive ? '+' : '-'}</button>
                {!collapseLive ?
                    <div className="prominent">
                        <PrimaryEST converted_time={liveTimes['USA']} />
                        <div className="others zone-table">
                            {Object.entries(zone_name_mapping).map(([country, tz_name]) => {
                                if (Object.keys(zone_name_mapping_extras_original).includes(country)) return null
                                let country_region = getRegionForCountry(country, region_mapping)
                                if (region === "ALL") {
                                    return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={liveTimes[country]}
                                        diff_local={diff_local[country]}
                                        diff_utc={diff_utc[country]} showDiff={showDiff} country_region={country_region} />
                                }
                                else if (region_mapping[region].includes(country)) {
                                    return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={liveTimes[country]}
                                        diff_local={diff_local[country]}
                                        diff_utc={diff_utc[country]} showDiff={showDiff} country_region={country_region} />
                                }
                            }
                            )}
                        </div>
                    </div> : null}
            </div>
        </>
    )
}