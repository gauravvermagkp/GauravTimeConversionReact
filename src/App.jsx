import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

import SelectRegion from './components/SelectRegion'
import { zone_name_mapping_initial } from './helper_functions.js'
import LiveSection from './components/LiveSection.jsx'
import UserInputSection from './components/UserInputSection.jsx'
// import Counter from './Counter.jsx'

function App() {

  // const [zone_name_mapping, setzone_name_mapping] = useState(zone_name_mapping_initial)
  const [region, setRegion] = useState('ALL')
  const [diff_utc, setdiff_utc] = useState({})
  const [diff_local, setdiff_local] = useState({})
  const [showDiff, setshowDiff] = useState(true)



  const props_object = {
    // zone_name_mapping: zone_name_mapping,
    // setzone_name_mapping: setzone_name_mapping,   
    diff_local: diff_local,
    setdiff_local: setdiff_local,
    diff_utc: diff_utc,
    setdiff_utc: setdiff_utc,
    showDiff: showDiff, 
    region: region,
    setRegion: setRegion

  }

  return (
    <>
     {/* <Counter /> */}
      <Header showDiff={showDiff} setshowDiff={setshowDiff} />
      <SelectRegion props_object={props_object} />
      <LiveSection props_object={props_object} />
      <UserInputSection props_object={props_object} />

 
    </>



  )
}

export default App
