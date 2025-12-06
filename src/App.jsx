import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

import ConvertedChips from './components/ConvertedChips'
import UserInput from './components/UserInput'
import SelectRegion from './components/SelectRegion'
import { convertedTime, zone_name_mapping_original, region_mapping, liveTime, timeDiffLabel, 
  getRegionForCountry,zone_name_mapping_extras_original } from './helper_functions.js'
import PrimaryEST from './components/PrimaryEST.jsx'




function App() {

  function sorting(timeObj, sort) {
    return Object.entries(timeObj)  //ASC
      .sort((a, b) => sort ? new Date(a[1]) - new Date(b[1]) : new Date(b[1]) - new Date(a[1]))
      .reduce((acc, [country, time]) => {
        acc[country] = time;
        return acc;
      }, {});
  }

  const [preferredBase, setpreferredBase] = useState("IST")
  const [convertedTimes, setConvertedTimes] = useState({});
  const [liveTimes, setliveTimes] = useState(liveTime({...zone_name_mapping_original, ...zone_name_mapping_extras_original}));
  const [inputDate, setinputDate] = useState("")
  const [region, setRegion] = useState('ALL')
  const [diff_utc, setdiff_utc] = useState({})
  const [diff_local, setdiff_local] = useState({})
  const [showDiff, setshowDiff] = useState(true)
  const [sort, setsort] = useState(true)
  const [zone_name_mapping, setzone_name_mapping] = useState(zone_name_mapping_original)
  const [collapseLive, setcollapseLive] = useState(false)
  const [collapseConverted, setcollapseConverted] = useState(false)

  useEffect(() => {
    if (!inputDate) return;
    const newConvertedTimes = {};
    let newConvertedTimes_sorted = {};
    const utc_diffs = {};
    const local_diffs = {};
    Object.entries({...zone_name_mapping_original, ...zone_name_mapping_extras_original}).forEach(([country, tz_name]) => {
      const result = convertedTime(inputDate, preferredBase, tz_name);
      const convertedUserInput = result[0]
      let diff_utc = result[1]
      let diff_local = result[2]
      newConvertedTimes[country] = convertedUserInput || "--";
      utc_diffs[country] = diff_utc || "--";
      local_diffs[country] = diff_local || "--";
    });
    newConvertedTimes_sorted = sorting(newConvertedTimes, sort)

    let zone_name_mapping_sorted = Object.keys(newConvertedTimes_sorted)
      .reduce((acc, country) => {
        acc[country] = zone_name_mapping[country];
        return acc;
      }, {});
    setzone_name_mapping(zone_name_mapping_sorted)
    setConvertedTimes(newConvertedTimes);
    setdiff_utc(utc_diffs);
    setdiff_local(local_diffs);
  }, [inputDate, preferredBase, sort]);



  useEffect(() => {
    let liveTimes_sorted = {}
    // Set up the interval
    const intervalId = setInterval(() => {
      let newliveTimes = liveTime({...zone_name_mapping_original, ...zone_name_mapping_extras_original});
      setliveTimes(newliveTimes);
    }, 1000);

    liveTimes_sorted = sorting(liveTimes, sort)

    let zone_name_mapping_sorted = Object.keys(liveTimes_sorted)
      .reduce((acc, country) => {
        acc[country] = zone_name_mapping[country];
        return acc;
      }, {});
    setzone_name_mapping(zone_name_mapping_sorted)

    const utc_diffs = {}
    const local_diffs = {}
    Object.entries(zone_name_mapping).forEach(([country, tz_name]) => {
      utc_diffs[country] = timeDiffLabel(tz_name, preferredBase)[0]
      local_diffs[country] = timeDiffLabel(tz_name, preferredBase)[1]
    }
    );
    setdiff_utc(utc_diffs);
    setdiff_local(local_diffs);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [sort, preferredBase]); // The empty dependency array ensures this effect runs only once on mount


  return (
    <>
      <Header preferredBase={preferredBase} setpreferredBase={setpreferredBase} showDiff={showDiff} setshowDiff={setshowDiff} />
      <div className='card'>
        <SelectRegion region_data ={[region,setRegion]} />
        <button className="sort-btn sort-arrow" onClick={() => setsort(!sort)}>{sort ? '▲' : '▼'}</button>
      </div>
      <div className='card'>
        <button type="button" class="collapse-btn" onClick={() => setcollapseLive(!collapseLive)}>{collapseLive ? '+' : '-'}</button>
        {!collapseLive ?
          <div className="prominent">
            <PrimaryEST converted_time={liveTimes['USA']} />
            <div className="others zone-table">
              {Object.entries(zone_name_mapping).map(([country, tz_name]) => {
                if(Object.keys(zone_name_mapping_extras_original).includes(country)) return null         
                let country_region = getRegionForCountry(country, region_mapping)
                if (region === "ALL") {
                  return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={liveTimes[country]} diff_local={diff_local[country]}
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
          </div> : null
        }
      </div>

      <div className='card'>
        <button type="button" class="collapse-btn" onClick={() => setcollapseConverted(!collapseConverted)}>{collapseConverted ? '+' : '-'}</button>
        {!collapseConverted ? <>
          <UserInput preferredBase={preferredBase} setinputDate={setinputDate} />
          <div className="prominent">
            <PrimaryEST converted_time={convertedTimes['USA']} />
            <div className="others zone-table">
              {Object.entries(zone_name_mapping).map(([country, tz_name]) => {
                if(Object.keys(zone_name_mapping_extras_original).includes(country)) return null 
                let country_region = getRegionForCountry(country, region_mapping)
                if (region === "ALL") {
                  return <ConvertedChips key={country} country={country} tz_name={tz_name} converted_time={convertedTimes[country]} diff_local={diff_local[country]}
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

export default App
