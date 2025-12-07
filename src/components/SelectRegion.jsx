import { region_mapping } from '../helper_functions.js';
import BusinessHours from './BusinessHours.jsx';
import './SelectRegion.css';

export default function SelectRegion({ props_object }) {

    const region = props_object.region;
    const setRegion = props_object.setRegion;
    const sort = props_object.sort;
    const setsort = props_object.setsort;
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
            <button className={`sort-btn ${ASC_DESC_Class}`} onClick={() => setsort(!sort)}>{sort ? '▲' : '▼'}</button>
            <BusinessHours />




        </>
    )
}