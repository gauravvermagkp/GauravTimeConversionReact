import { batchTimigs, convertedTime2} from "../helper_functions"
import './BatchTiming.css';
import { useSelector, useDispatch } from 'react-redux';
import {updateInputDate} from '../mySlice.js';
import { useState, useEffect } from "react";

export default function BatchTimings({ region }) {
    const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);
    const dispatch = useDispatch();
    const [bid, setbid] = useState(null)
 
    useEffect(() => {
       dispatch(updateInputDate(document.getElementById(bid)?document.getElementById(bid).value:''))
    }, [preferredBase]);

    return (
        <>
            {
                Object.entries(batchTimigs).map(([batchname, start_end_time]) => {
                    console.log('Region in BatchTimings.jsx:', region);
                    if (region == 'ALL' | batchname.toUpperCase().includes(region)) {
                        const newt = convertedTime2(start_end_time, preferredBase)                  
                        return <div className={`batch-row batch-${batchname.toLowerCase()}`}>
                            <label>{`${batchname} : `}</label>
                            <button className="btn-soft" id={`${batchname}b1`} value={newt[0]} onClick={(e)=>{
                                setbid(`${batchname}b1`)
                                dispatch(updateInputDate(e.target.value))
                                }}>{newt[0]}</button>
                            <label> -- </label>                            
                            <button className="btn-soft" id={`${batchname}b2`} value={newt[1]} onClick={(e)=>{
                                setbid(`${batchname}b2`)
                                dispatch(updateInputDate(e.target.value))
                                }}>{newt[1]}</button>
                        </div>
                    }

                })}


        </>
    )
}
