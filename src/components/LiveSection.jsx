import { liveTime, sorting, timeDiffLabel, getRegionForCountry, zone_name_mapping_extras_original, region_mapping } from '../helper_functions.js';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import PrimaryEST from './PrimaryEST.jsx'
import ConvertedChips from './ConvertedChips.jsx';
import {updateZoneMapping} from '../mySlice.js';

export default function LiveSection({ props_object }) {
    const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);
    const zone_name_mapping = useSelector((state) => state.timeConverterSlicerName.zone_name_mapping);
    const sort = useSelector((state) => state.timeConverterSlicerName.sort);
    const dispatch = useDispatch();



    
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
        const sorted_region_mapping = sorting(liveTimes, sort)
        let zz= Object.keys(sorted_region_mapping)
            .reduce((acc, country) => {
                acc[country] = zone_name_mapping[country];
                return acc;
            }, {})
        dispatch(updateZoneMapping(zz))

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
                        <div className="others">
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