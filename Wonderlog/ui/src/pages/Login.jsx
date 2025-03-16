import React,{useState} from 'react'
import { useNavigate,Link} from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import user from '../assets/images/user.svg'
import passwords from '../assets/images/password.svg'

function Login() {

const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState('')
const navigate=useNavigate();


const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username, password: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Login failed');
    }

    // ✅ Store User ID & Token in localStorage
    localStorage.setItem("userid", data.userid); 
    localStorage.setItem("authTok", data.token);

    console.log("User Role:", data.userrole); 

    // Redirect based on role
    if (data.userrole === 'admin') {
      navigate('/admindash');
    } else {
      navigate('/home');
    }
  } catch (error) {
    setError(error.message || 'Invalid Credentials: Please try again!');
  }
};


  return (
    <div className='bg-gray-900'>
        <nav>
          <img src={logo} className="md:w-[150px] h-[150px] sm:w-[95px] h-[95px]"/>
        </nav>

       <form className=" bg-gradient-to-r from-black rounded-lg mx-auto drop-shadow-5xl w-[300px] md:w-[800px] h-[600px] " onSubmit={handleLogin}>
         <h1 className="text-red-400 md:text-4xl font-bold font-sans leading-loose flex justify-center pt-10 sm:text-sm">LOGIN</h1>
          {error && <p className='text-red-500 mb-4'>{error}</p>}

        <div className="flex justify-center pt-6">
          <img src={user} className="md:w-[70px]  sm:w-[30px] h-12 pl-2" />
          <input type="text" 
               id='username' 
               name='username' 
               value={username} 
               onChange={(event)=>setUsername(event.target.value)} 
               required 
               placeholder="Username" 
               className=" placeholder:italic placeholder:text-slate-400 pl-4 w-[400px] h-[50px] bg-gray-500 border-2 border-black-600 rounded-lg "/>
        </div>
        <div className="flex justify-center pt-6 ml-5">
           <img src={passwords} className="md:w-[40px]  sm:w-[20px] h-8 pl-2 mt-2"/>
           <input type="password" 
               id='password'
               name='password'
               value={password}
               onChange={(event)=>setPassword(event.target.value)}
               required
               placeholder="Password"
               className="placeholder:italic placeholder:text-slate-400 pl-4  w-[400px] h-[50px] border-2 border-black-600 bg-gray-500 rounded-lg md: ml-4 sm: mr-4"/>
         </div>
         <div><button className=" md:w-[400px] h-[50px] bg-red-500  text-white text-xl font-semibold font-sans ml-[235px] mt-14 rounded-lg hover:text-2xl " >Login</button></div>
         <div className="sm:ml-4 mt-2 md:ml-[300px] mt-2 ">
          <p className="text-gray-300">Don't have an Account ? <Link to='/signup' className="text-red-400 hover:text-lg">Register</Link></p>
        </div>
    
      </form>
     <footer className="bg-gradient-to-r from-gray-800 text-white py-6 md:mt-24">
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

export default Login