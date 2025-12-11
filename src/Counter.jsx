// features/counter/Counter.js
import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addBy } from './counterSlice';
import { updatePrefferedBase } from './preferredBaseSlice';

export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.counter.status);
  const prefBase = useSelector((state) => state.mypreferredBase.value);

  const dispatch = useDispatch();

  const [n, setN] = useState(5);
 


  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h3>Counter</h3>
      <p>Value: <strong>{value}</strong> {status === 'loading' && '(updating...)'}</p>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())} style={{ marginLeft: 8 }}>+</button>
      <button onClick={() => dispatch(addBy(Number(n)))} style={{ marginLeft: 8 }}>
        Add {n}
      </button>
     
   {["UTC", "GMT"].map((l) => (
            <label key={l} className="pref-option">
              <input type="radio" name="prefLocal2" value={l} checked={l === prefBase} 
              onChange={(e) => dispatch(updatePrefferedBase(e.target.value))} />{l}
            </label>
          ))
          }


      <p>Preferred Base: <strong>{prefBase}</strong></p>
     
      <div style={{ marginTop: 8 }}>
        <label>
          Amount:&nbsp;
          <input type="number" value={n} onChange={(e) => setN(e.target.value)} style={{ width: 80 }} />
        </label>
      </div>
    </div>
  );
}
