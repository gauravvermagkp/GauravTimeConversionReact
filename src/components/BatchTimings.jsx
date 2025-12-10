import { batchTimigs, convertedTime2 } from "../helper_functions"
import './BatchTiming.css';
import { useSelector } from 'react-redux';

export default function BatchTimings({ region }) {
    const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);

    return (
        <>
            {
                Object.entries(batchTimigs).map(([batchname, start_end_time]) => {
                    console.log('Region in BatchTimings.jsx:', region);
                    if (region == 'ALL' | batchname.toUpperCase().includes(region)) {
                        const newt = convertedTime2(start_end_time, preferredBase)
                        return <div className={`batch-row batch-${batchname.toLowerCase()}`}>
                            <label>{`${batchname} : Start:${newt[0]},End:${newt[1]}`} </label>
                        </div>
                    }

                })}


        </>
    )
}
