import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from '../pages/homePage'
import Locations from '../pages/addLocation'
import AddDevice from '../pages/addDevice'
import LocationCard from '../components/location'

export default function AllRoutes() {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/locations/:name' element={<Locations/>}/>
    <Route path='/devices' element={<AddDevice/>}/>
    </Routes>
  )
}
