import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';
import timeConverterSlicerNameReducer from './mySlice';    

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    timeConverterSlicerName : timeConverterSlicerNameReducer   
  }
});

export default store;
