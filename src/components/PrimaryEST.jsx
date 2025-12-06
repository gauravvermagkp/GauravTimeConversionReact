export default function PrimaryEST({converted_time})
{
    return (
        
            <div className="est-box">
                <div className="label">Primary - EST</div>
                <div id="liveEST" className="big">{converted_time ?converted_time :'--'}</div>
                <div className="sub" style={{ marginTop:"6px" }}>America/New_York</div>
            </div>
        

    )
}