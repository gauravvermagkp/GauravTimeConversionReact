import { createSlice } from '@reduxjs/toolkit';
import { zone_name_mapping_initial } from './helper_functions.js'

const mySlicer = createSlice({
    name: 'timeConverterSlicerName',
    initialState: {
        currentBase: "IST",
        zone_name_mapping: zone_name_mapping_initial,
        sort: true,
        inputDate: undefined,
        collapseConverted: true,
        clickedRegion: undefined,
        clickedclassName: '',
    },
    reducers: {
        updatePrefferedBase: (state, action) => {
            state.currentBase = action.payload;
            state.clickedRegion = undefined;
        },
        updateZoneMapping: (state, action) => {
            state.zone_name_mapping = action.payload;
        },
        updateSort: (state, action) => {
            state.sort = !state.sort;
            state.clickedRegion = undefined;
        },
        updateInputDate: (state, action) => {
            state.inputDate = action.payload;
        },
        updatecollapseConverted: (state, action) => {
            if (action.payload !== undefined) {
                state.collapseConverted = action.payload
            }
            else {
                state.collapseConverted = !state.collapseConverted
            }

        },
        updateClickedRegion: (state, action) => {
            state.clickedRegion = action.payload;

        },
        updateClickedclassName: (state, action) => {
            state.clickedclassName = action.payload;

        },
    }
});
export const {
    updatePrefferedBase,
    updateZoneMapping,
    updateSort,
    updateInputDate,
    updatecollapseConverted,
    updateClickedRegion,
    updateClickedclassName
} = mySlicer.actions;
export default mySlicer.reducer;