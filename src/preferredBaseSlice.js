import { createSlice } from '@reduxjs/toolkit';
import {zone_name_mapping_initial} from './helper_functions.js'

const preferredBaseSlice = createSlice({
    name: 'mypreferredBase',
    initialState: { value: "IST" , zone_name_mapping:zone_name_mapping_initial, sort: true},
    reducers: {
        updatePrefferedBase:(state, action) => { 
            state.value = action.payload;            
        },
        updateZoneMapping:(state, action) => {          
            state.zone_name_mapping = action.payload;            
        },
        updateSort:(state, action) => {       
            state.sort = !state.sort;            
        },
    }
});
export const { updatePrefferedBase,updateZoneMapping,updateSort } = preferredBaseSlice.actions;
export default preferredBaseSlice.reducer;