import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
    <Navbar></Navbar>
    <div className='flex-grow'>

    <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </div>
  )
}
