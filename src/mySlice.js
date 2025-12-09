import { createSlice } from '@reduxjs/toolkit';
import {zone_name_mapping_initial} from './helper_functions.js'

const mySlicer = createSlice({
    name: 'timeConverterSlicerName',
    initialState: { currentBase: "IST" , zone_name_mapping:zone_name_mapping_initial, sort: true},
    reducers: {
        updatePrefferedBase:(state, action) => { 
            state.currentBase = action.payload;            
        },
        updateZoneMapping:(state, action) => {          
            state.zone_name_mapping = action.payload;            
        },
        updateSort:(state, action) => {       
            state.sort = !state.sort;            
        },
    }
});
export const { updatePrefferedBase,updateZoneMapping,updateSort } = mySlicer.actions;
export default mySlicer.reducer;