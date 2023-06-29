import { useState , useEffect} from 'react'
import './App.css'
import axios from 'axios'
import { MovesTable } from './components/MovesTable.jsx'
import { AccTable } from './components/AccTable.jsx'
import {Routes , Route} from 'react-router-dom'



function App() {

  return (

    <Routes>
      <Route path="/cuentas" element={<AccTable />}/>
      <Route path="/moves" element={<MovesTable />} />
    </Routes>
  
  
      )
}

export default App
