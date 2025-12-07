import './ConvertedChips.css'
import {classifyBusinessHours} from '../helper_functions.js';

export default function ConvertedChips({ country, tz_name, converted_time, diff_local, diff_utc, showDiff, country_region }) {

    let AM_PM_CLASS = converted_time?converted_time.includes('am')?'time-am':'time-pm':'';
    const biz_hrs_category = classifyBusinessHours(converted_time, tz_name);
   

    return (              
        <>          
         <div className={`zone-row ${biz_hrs_category} ${country_region?country_region.toLowerCase():''} `}>
            <div className="zone-name">{`${country} (${tz_name})`}</div>
            <div className={`zone-value ${AM_PM_CLASS}`}>{converted_time}</div>
            {showDiff ?  <div className="zone-diff-wrap">
                <div className="zone-diff zone-diff-ist">{diff_local}</div>
                <div className="zone-diff zone-diff-utc">{diff_utc}</div>
            </div> : ''}
           
        </div>
        </>
       
    )
}