import './ConvertedChips.css'

export default function ConvertedChips({ country, tz_name, converted_time, diff_local, diff_utc, showDiff, country_region }) {

    return (
        <>        
         <div className={`zone-row  ${country_region?country_region.toLowerCase():''} `}>
            <div className="zone-name">{`${country} (${tz_name})`}</div>
            <div className="zone-value">{converted_time}</div>
            {showDiff ?  <div className="zone-diff-wrap">
                <div className="zone-diff zone-diff-ist">{diff_local}</div>
                <div className="zone-diff zone-diff-utc">{diff_utc}</div>
            </div> : ''}
           
        </div>
        </>
       
    )
}