import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Addlog from './Addlog.jsx'
import Frontpage from './Frontpage.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Homepage from './Homepage.jsx'
import AddProfile from './Addprofile.jsx'
import GetProfile from '../components/Profilepage.jsx'
import AdminDash from './AdminDash.jsx'
import AddPost from './AddInspiration.jsx'
import PostCard from '../components/PostCard.jsx'
import UpdateProfile from './Updateprofile.jsx'
import Userinspirationpage from './Userinspirationpage.jsx'
import PostDetails from './PostDetails.jsx'
import AddComment from '../Addon/Addcomment.jsx'

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

        <Route path="/postdetails/:id" element={<PostDetails />} />
        <Route path='/comment' element={<AddComment/>}/>

    </Routes>
    </BrowserRouter>
   
    
  )
}

export default App





