import './PrimaryEST.css';

export default function PrimaryEST({converted_time})
{
    let AM_PM_CLASS = converted_time?converted_time.includes('am')?'time-am':'time-pm':'';
    return (
        
            <div className="est-box">
                <div className="label">Primary - EST</div>
                <div className={`big ${AM_PM_CLASS}`}>{converted_time ?converted_time :'--'}</div>
                <div className="sub" style={{ marginTop:"6px" }}>America/New_York</div>
            </div>
        

    )
}