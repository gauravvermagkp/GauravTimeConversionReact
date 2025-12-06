import './Header.css'

export default function Header({ preferredBase, setpreferredBase,showDiff, setshowDiff }) {


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
              onChange={(e) => setpreferredBase(e.target.value)} />{l}
            </label>
          ))
          }

        </div>
      </div>

    </>
  )
}