import React from 'react'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'

function Frontpage() {
  return (
    <div className='bg-gray-900'>
         <nav>
        <div className=" flex justify-end mr-6  "><Link to='/login'><button className="w-28 h-10 bg-red-400  mt-4 rounded-lg text-white text-xl font-sans mr-4 ">Login</button></Link>
        <Link to='/signup'><button className="w-28 h-10 bg-red-400 mt-4 rounded-lg text-white text-xl font-sans ">Register</button></Link></div>
    </nav>

    <div>
        <h1 className="text-white flex justify-center  mt-24 text-5xl font-sans font-extrabold">Log Your Wonders</h1>
        <h3 className="text-red-400 md:text-2xl  flex justify-center mt-6 ">" A magical choice to make and seize your bucket list "</h3>
        <img src={logo} className="w-[400px] h-[390px] mx-auto mt-18"/>
    
    </div>
    <footer className="bg-gradient-to-r from-gray-800 text-white py-6 mt-[132px]">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Wonderlog</h3>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          &copy; 2025 Wonderlog. All Rights Reserved.
        </div>
      </footer>
    </div>
    
  )
}

export default Frontpage