import { region_mapping } from '../helper_functions.js';
import BusinessHours from './BusinessHours.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { updateSort } from '../mySlice.js';
import './SelectRegion.css';

export default function SelectRegion({ props_object }) {

    const sort = useSelector((state) => state.timeConverterSlicerName.sort);
    const dispatch = useDispatch();

    const region = props_object.region;
    const setRegion = props_object.setRegion;


    const ASC_DESC_Class = sort ? 'asc' : 'desc';

    return (
        <>

            <label className='cardlabel'>Select Region:</label>
            <select onChange={(e) => setRegion(e.target.value)}>
                <option value="ALL">All</option>
                <option value="APAC">APAC</option>
                <option value="EMEA">EMEA</option>
                <option value="CLAR">CLAR</option>
            </select>
            {console.log('Selected Region in SelectRegion.jsx:', region)}
            <label className='cardlabel'>Count: {region_mapping[region].length}</label>
            <button className={`sort-btn ${ASC_DESC_Class}`} onClick={() => dispatch(updateSort(!sort))}>{sort ? '▲' : '▼'}</button>
            <BusinessHours />




        </>
    )
}