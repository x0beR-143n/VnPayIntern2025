import React, { useState } from 'react'
import './App.css'
import LifeCycle from './LifeCycle'

function App() {
  const [show, setShow] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); 

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    if(!show) {
      setShow(true)
    } else {
       setReloadKey((k) => k + 1);
    }
  }
  return (
    <>
      <div className='container'>
        <button onClick={handleShow}>
        {show ? "Show another cat fact" : "Show a Cat fact"}
        </button>

        <button onClick={handleClose}>Close</button>
      </div>

      <div className='container'>
         {show && <LifeCycle key={reloadKey}/> }
      </div>
     
    </>
  )
}

export default App
