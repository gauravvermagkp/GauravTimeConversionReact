import { batchTimigs, convertedTime2 } from "../helper_functions"
import './BatchTiming.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateInputDate, updatecollapseConverted } from '../mySlice.js';
import { useState, useEffect } from "react";

export default function BatchTimings({ region }) {
    const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);
    const dispatch = useDispatch();
    const [bid, setbid] = useState(null)
    const [clickedclassName, setclickedclassName] = useState('');

    const [currenttime, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date()); // triggers re-render
        }, 1000);
        // cleanup when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        dispatch(updateInputDate(document.getElementById(bid) ? document.getElementById(bid).value : ''))
    }, [preferredBase]);

    return (
        <>
           
            {
                
                Object.entries(batchTimigs).map(([batchname, start_end_time]) => {

                    let batchname_lower = batchname.toLowerCase()

                    if (region == 'ALL' | batchname.toUpperCase().includes(region)) {
                        const newt = convertedTime2(start_end_time, preferredBase)
                        let is_running = newt[2] ? `${batchname_lower}-running` : ''

                        return <div className={`batch-row batch-${batchname_lower} ${is_running}`}>
                            <label>{`${batchname} :`}</label>

                            <button className={`btn-soft ${clickedclassName.includes(`${batchname_lower}b1`) ? clickedclassName : ''}`}
                                id={`${batchname_lower}b1`} value={newt[0]} onClick={(e) => {
                                    setbid(`${batchname_lower}b1`)
                                    setclickedclassName(`${e.target.id}-clicked`)
                                    dispatch(updateInputDate(e.target.value))
                                    dispatch(updatecollapseConverted(false))
                                    document.getElementById("convertedchips").scrollIntoView({ behavior: "smooth" });
                                }}>{newt[0]}</button>
                            <label> -- </label>
                            <button className={`btn-soft ${clickedclassName.includes(`${batchname_lower}b2`) ? clickedclassName : ''}`}
                                id={`${batchname_lower}b2`} value={newt[1]} onClick={(e) => {
                                    setbid(`${batchname_lower}b2`)
                                    setclickedclassName(`${e.target.id}-clicked`)
                                    dispatch(updateInputDate(e.target.value))
                                    dispatch(updatecollapseConverted(false))
                                    document.getElementById("convertedchips").scrollIntoView({ behavior: "smooth" });
                                }}>{newt[1]}</button>
                        </div>
                    }

                })}


        </>
    )
}
