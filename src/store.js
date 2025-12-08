import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';
import mypreferredBaseReducer from './preferredBaseSlice';    

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    mypreferredBase : mypreferredBaseReducer   
  }
});

export default store;
