import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'


import SelectRegion from './components/SelectRegion'
import {zone_name_mapping_initial} from './helper_functions.js'
import LiveSection from './components/LiveSection.jsx'
import UserInputSection from './components/UserInputSection.jsx'




function App() {
  const [preferredBase, setpreferredBase] = useState("IST")  
  const [zone_name_mapping, setzone_name_mapping] = useState(zone_name_mapping_initial)
  const [region, setRegion] = useState('ALL')
  const [diff_utc, setdiff_utc] = useState({})
  const [diff_local, setdiff_local] = useState({})
  const [showDiff, setshowDiff] = useState(true)
  const [sort, setsort] = useState(true) 

  const props_object = {    
    setzone_name_mapping : setzone_name_mapping,
    setdiff_utc : setdiff_utc,
    setdiff_local : setdiff_local,
    zone_name_mapping : zone_name_mapping,
    preferredBase : preferredBase,
    sort : sort,
    region : region,
    diff_local : diff_local,
    diff_utc : diff_utc,
    showDiff : showDiff
  }

  return (
    <>
      <Header preferredBase={preferredBase} setpreferredBase={setpreferredBase} showDiff={showDiff} setshowDiff={setshowDiff} />

      <div className='card'>
        <SelectRegion region_data={[region, setRegion]} />
        <button className="sort-btn sort-arrow" onClick={() => setsort(!sort)}>{sort ? '▲' : '▼'}</button>
      </div>
      <LiveSection props_object={props_object} />
      <UserInputSection props_object={props_object}/>
</>
      

     
  )
}

export default App
