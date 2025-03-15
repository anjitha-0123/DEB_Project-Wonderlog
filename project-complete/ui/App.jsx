import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Addlog from './src/pages/Addlog.jsx'
import Frontpage from './src/pages/Frontpage.jsx'
import Login from './src/pages/Login.jsx'
import Signup from './src/pages/Signup.jsx'
import Homepage from './src/pages/Homepage.jsx'
import AddProfile from './src/pages/Addprofile.jsx'
import GetProfile from './src/components/Profilepage.jsx'
import AdminDash from './src/pages/AdminDash.jsx'
import AddPost from './src/pages/AddInspiration.jsx'
import PostCard from './src/components/PostCard.jsx'
import UpdateProfile from './src/pages/Updateprofile.jsx'
import Userinspirationpage from './src/pages/Userinspirationpage.jsx'

function App() {
  return (
   
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Frontpage/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>

       <Route path='/admindash' element={<AdminDash/>}/>
       <Route path='/addpost' element={<AddPost/>}/>

       <Route path='/home' element={<Homepage/>}/>
       <Route path='/addlog' element={<Addlog/>}/>
       <Route path='/addprofile' element={<AddProfile/>}/>
       <Route path="/getprofile" element={<GetProfile />} />   
      

       <Route path='/viewinspiration' element={<PostCard/>}/>
        
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        <Route path='/userinspiration' element={<Userinspirationpage/>}/>

    </Routes>
    </BrowserRouter>
   
    
  )
}

export default App





