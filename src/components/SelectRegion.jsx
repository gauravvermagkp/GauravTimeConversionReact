import {region_mapping} from '../helper_functions.js';

export default function SelectRegion({ region_data }) {

    return (
        <>

            <label className='cardlabel'>Select Region:</label>
            <select onChange={(e) => region_data[1](e.target.value)}>
                <option value="ALL">All</option>
                <option value="APAC">APAC</option>
                <option value="EMEA">EMEA</option>
                <option value="CLAR">CLAR</option>
            </select>
            <label className='cardlabel'>Count: {region_mapping[region_data[0]].length}</label>
            



        </>
    )
}