import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import user from '../assets/images/user.svg'
import phone from '../assets/images/phone.svg'
import emails from '../assets/images/email.svg'
import passwords from '../assets/images/password.svg'


function Signup() {
 const [username,setUsername]=useState('')
 const [phonenumber,setPhonenumber]=useState('')
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('')
 const [userRole,setUserRole]=useState('user');
 const [error,setError]=useState('')
 const navigate=useNavigate();

 const handleSignup=async(event)=>{
  event.preventDefault();
  try
  {
    const response = await fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Username: username,
        PhoneNumber: phonenumber,
        Email: email,
        password: password,
        userrole: userRole
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    navigate('/login')
  }
  catch(error){
    setError(error.message || 'Signup Failed : Please try again!');
  }
 }


  return (
    <div className='bg-gray-900'>
         <nav>
        <a><img src={logo} className="w-[150px] h-[150px]"/></a>
    </nav>
    <form className=" md:w-[800px] mt-24 bg-gradient-to-r from-black rounded-lg mx-auto drop-shadow-5xl md:absolute top-10 left-[450px]" onSubmit={handleSignup}>
        <h1 className="text-red-400 md:text-4xl font-bold font-sans leading-loose flex justify-center pt-8 sm:text-xl ">SIGN UP</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
            <label className="text-white md:text-xl font-semibold font-sans md:ml-[250px] pt-12 sm:text-sm ml-12" > Username : </label>
            <div className="flex justify-center pt-2">
            <img src={user} className="md:w-[70px] md: sm:w-[30px] h-12"/>
            <input type="text"
                   id='username'
                   required
                   value={username}
                   onChange={(event)=>setUsername(event.target.value)}
                   className="md:w-[400px] md:h-[50px] bg-gray-300 border-2 border-black-600 rounded-lg sm:w-[200px] h-[40px] "/>
            </div>

            <label className="text-white md:text-xl font-semibold font-sans md:ml-[250px] pt-12 sm:text-sm ml-12"> Phone Number : </label>
            <div className="flex justify-center pt-2 md:ml-5  sm:ml-2">
            <img src={phone} className="md:w-[40px] md: sm:w-[30px] h-10"/>
            <input type="tel"
                   id='phonenumber'
                   required
                   value={phonenumber}
                   onChange={(event)=>setPhonenumber(event.target.value)}
                   className="md:w-[400px] md:h-[50px] border-2 border-black-600 bg-gray-300 rounded-lg ml-4 sm:w-[200px] h-12 sm:w-[200px] h-[40px]"/>
              </div>

            <label className="text-white md:text-xl font-semibold font-sans md:ml-[250px] pt-12 sm:text-sm ml-12"> Email : </label>
            <div className="flex justify-center pt-2 ml-5">
            <img src={emails} className="md:w-[40px] md: sm:w-[20px] h-8"/>
            <input type="email"
                    id='email'
                    required
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    className="md:w-[400px] md:h-[50px] border-2 border-black-600 bg-gray-300 rounded-lg ml-4 sm:w-[200px] h-[40px]"/>
            </div>

            <label className="text-white md:text-xl font-semibold font-sans md:ml-[250px] pt-12 sm:text-sm ml-12"> Password : </label>
            <div className="flex justify-center pt-2 ml-5">
            <img src={passwords} className="md:w-[40px] md:sm:w-[30px] h-8"/>
            <input type="password" 
                  id='password'
                  required
                  value={password}
                  onChange={(event)=>setPassword(event.target.value)}
                  className="md:w-[400px] md:h-[50px] border-2 border-black-600 bg-gray-300 rounded-lg ml-4 sm:w-[200px] h-[40px]"/>
            </div>
                     
            <label className="text-white md:text-xl font-semibold font-sans md:ml-[250px] pt-12 sm:text-sm ml-12"> User Role : </label><br></br>
            <select id='userRole'
                    required 
                    value={userRole}
                    onChange={(event)=>setUserRole(event.target.value)}
                    className="md:w-[400px] md:h-[50px] border-2 border-black-600 bg-gray-300 rounded-lg ml-[230px] sm:w-[200px] h-[40px]">
             <option value="user">User</option>
             <option value="admin">Admin</option>

            </select>

            <div className="md:ml-[350px] md:mt-10 sm:ml-2 mt-2">
              <button className="md:w-40 md:h-12  bg-red-500 md:text-lg font-semibold text-white rounded-lg hover:text-xl ">Sign Up</button>
            </div>
            <div className="md:ml-[300px] md:mt-2 mb-6">
              <p className="text-gray-300">Already have an Account ?
                 <Link to='/login' className="text-red-400 hover:text-lg">Login</Link>
              </p>
            </div>
    
    </form>
    <footer className="bg-gradient-to-r from-gray-800 text-white py-6 mt-[700px]">
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

export default Signup