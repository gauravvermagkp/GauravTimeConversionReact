import { convertedTime, timeDiffLabel, sorting, getRegionForCountry, zone_name_mapping_extras_original, region_mapping } from '../helper_functions.js';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import PrimaryEST from './PrimaryEST.jsx'
import ConvertedChips from './ConvertedChips.jsx';
import './UserInputSection.css'
import {updateZoneMapping} from '../mySlice.js';


export default function UserInputSection({ props_object }) {

    const zone_name_mapping = useSelector((state) => state.timeConverterSlicerName.zone_name_mapping);
    const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);
    const sort = useSelector((state) => state.timeConverterSlicerName.sort);  
    const dispatch = useDispatch();

    
    const setdiff_utc = props_object.setdiff_utc
    const setdiff_local = props_object.setdiff_local
    const showDiff = props_object.showDiff
    const region = props_object.region
    const diff_utc = props_object.diff_utc
    const diff_local = props_object.diff_local


    const [convertedTimes, setConvertedTimes] = useState({});
    const [collapseConverted, setcollapseConverted] = useState(true)
    const [inputDate, setinputDate] = useState("")


    useEffect(() => {
        const newConvertedTimes = {};
        let newConvertedTimes_sorted = {};
        const utc_diffs = {};
        const local_diffs = {};
        if (!inputDate) {                    
            return
        };

        Object.entries(zone_name_mapping).forEach(([country, tz_name]) => {
            newConvertedTimes[country] = convertedTime(inputDate, preferredBase, tz_name);
            utc_diffs[country] = timeDiffLabel(tz_name, preferredBase)[0] || "--";
            local_diffs[country] = timeDiffLabel(tz_name, preferredBase)[1] || "--";
        });
        setConvertedTimes(newConvertedTimes);
        setdiff_utc(utc_diffs);
        setdiff_local(local_diffs);

        newConvertedTimes_sorted = sorting(newConvertedTimes, sort)
        let zone_name_mapping_sorted = Object.keys(newConvertedTimes_sorted)
            .reduce((acc, country) => {
                acc[country] = zone_name_mapping[country];
                return acc;
            }, {});
        dispatch(updateZoneMapping(zone_name_mapping_sorted))

    }, [inputDate, preferredBase, sort]);


    return (
        <>
            <div className='card'>
                <h3>User Input Converted</h3>
                <button type="button" class="collapse-btn" onClick={() => setcollapseConverted(!collapseConverted)}>{collapseConverted ? '+' : '-'}</button>
                {!collapseConverted ? <>
                    <label className='cardlabel'>Choose Date & Time ({preferredBase}):</label>
                    <input id="userInput" type="datetime-local" value={inputDate} onChange={(e) => setinputDate(e.target.value)} />

                    <div className="prominent">
                        <PrimaryEST converted_time={convertedTimes['USA']} />
                        <div className="others">
                            {Object.entries(zone_name_mapping).map(([country, tz_name]) => {
                                if (Object.keys(zone_name_mapping_extras_original).includes(country)) return null
                                let country_region = getRegionForCountry(country, region_mapping)
                                if (region === "ALL") {
                                    return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={convertedTimes[country]}
                                        diff_local={diff_local[country]}
                                        diff_utc={diff_utc[country]} showDiff={showDiff} country_region={country_region} />
                                }
                                else if (region_mapping[region].includes(country)) {
                                    return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={convertedTimes[country]}
                                        diff_local={diff_local[country]}
                                        diff_utc={diff_utc[country]} showDiff={showDiff} country_region={country_region} />
                                }
                            }
                            )}
                        </div>
                    </div>
                </> : null}
            </div>
        </>

    )
}
