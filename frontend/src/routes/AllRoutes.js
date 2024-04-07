import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from '../pages/homePage'
import Locations from '../pages/LocationDetails'
import AddDevice from '../pages/addDevice'
import AddLocation from '../pages/addLocation'


export default function AllRoutes() {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/locations/:name' element={<Locations/>}/>
    <Route path='/addlocation' element={<AddLocation/>}/>
    <Route path='/devices' element={<AddDevice/>}/>
    </Routes>
  )
}
