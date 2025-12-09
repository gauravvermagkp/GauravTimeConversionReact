import './Header.css'
import { useSelector,useDispatch } from 'react-redux';
import { updatePrefferedBase } from  '../mySlice';

export default function Header({showDiff, setshowDiff }) {

const preferredBase = useSelector((state) => state.timeConverterSlicerName.currentBase);
const dispatch = useDispatch();
console.log('Preferred Base in Header.jsx:', preferredBase);
  return (
    <>
      <div className="page-header">
        <h1>Time Zone Converter</h1>
        <label className="toggle-diff-label">
          <input type="checkbox" id="toggleDiffs" defaultChecked onChange={(e)=>setshowDiff(!showDiff)}/>Show time differences</label>
        <div className="pref-time"><span className="pref-label">Preferred local time:</span>

          {["IST", "EST"].map((l) => (
            <label key={l} className="pref-option">
              <input type="radio" name="prefLocal" value={l} checked={l === preferredBase} 
              onChange={(e) => dispatch(updatePrefferedBase(e.target.value))} />{l}
            </label>
          ))
          }

        </div>
      </div>

    </>
  )
}