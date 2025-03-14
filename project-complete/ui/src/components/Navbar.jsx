// import React, { useState, useEffect } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo.svg";
// import homelogo from "../assets/images/home.svg";
// import logs from "../assets/images/logs.svg";
// import manager from "../assets/images/manager.svg";
// import defaultProfile from "../assets/images/person1.png"; 

// function Navbar() {
//   const [profileImage, setProfileImage] = useState(defaultProfile);
//   const navigate=useNavigate();

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       try {
//         const res = await fetch("/api/getProfile", {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await res.json();

//         if (res.ok && data.data?.image) {
//           setProfileImage(`data:image/png;base64,${data.data.image}`);
//         }
//       } catch (err) {
//         console.error("Error fetching profile image:", err);
//       }
//     };

//     fetchProfileImage();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/logout', {
//         method: 'GET',
//         credentials: 'include', 
//       });

//       if (response.ok) {
//         navigate('/login'); 
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//  return (
//   <nav className="bg-orange-700 md:w-full rounded-lg md:ml-2  md:h-[150px] flex justify-between sm: h-30 w-[1480px] ">
//      <div><a><img src={logo} className="md:w-[150px] md:h-[150px] sm: w-20 h-30" /></a></div>
//       <div className="flex md:ml-[800px] my-auto sm: ml-1">

//            <Link to="/home" className="flex hover:bg-orange-800 rounded-lg">
//                 <img src={homelogo} 
//                 className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//                 <p className="md:mt-1 md:text-2xl font-semibold">HOME</p>
//           </Link>

//           <Link to="/addlog" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
//                <img src={logs} 
//                className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px] sm: ml-2" />
//                <p className="md:mt-1 md:text-2xl font-semibold">ADD LOGS</p>
//           </Link>

//           <Link to="/userinspiration" className="flex md:ml-8 hover:bg-orange-800 rounded-lg sm: ml-2">
//                 <img src={manager} 
//                 className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//                 <p className="md:mt-1 md:text-2xl font-semibold">INSPIRATIONS</p>
//           </Link>
//        </div>
        
//       <div className="md:mr-6 mt-3">
//         <Link to="/getprofile">
//              <img src={profileImage}
//              className=" border border-black md:w-[80px] md:h-[80px] rounded-full sm:w-[25px] sm: h-12 w-12 mr-6 "
//              alt="Profile" />
//         </Link>

//         <Link to="/getprofile">
//               <p className="md:ml-2 md:text-xl md:font-semibold text-white sm:text-sm">Profile</p>
//         </Link>
        
        
//         <button 
//              onClick={handleLogout} 
//              className="md:ml-2 md:text-xl md:font-semibold text-white sm:text-sm">
//               Logout
//         </button>
        
//       </div>
//   </nav>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import homelogo from "../assets/images/home.svg";
import logs from "../assets/images/logs.svg";
import manager from "../assets/images/manager.svg";
import defaultProfile from "../assets/images/person1.png";

function Navbar() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.data?.image) {
          setProfileImage(`data:image/png;base64,${data.data.image}`);
        }
      } catch (err) {
        console.error("Error fetching profile image:", err);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-orange-700 p-4 rounded-lg flex flex-wrap justify-between items-center w-full">
      {/* Logo */}
      <div>
        <img src={logo} className="w-24 md:w-36" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <Link to="/home" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
          <img src={homelogo} className="w-6 md:w-10" alt="Home" />
          <p className="ml-2 text-sm md:text-lg font-semibold">HOME</p>
        </Link>

        <Link to="/addlog" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
          <img src={logs} className="w-6 md:w-10" alt="Add Logs" />
          <p className="ml-2 text-sm md:text-lg font-semibold">ADD LOGS</p>
        </Link>

        <Link to="/userinspiration" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
          <img src={manager} className="w-6 md:w-10" alt="Inspirations" />
          <p className="ml-2 text-sm md:text-lg font-semibold">INSPIRATIONS</p>
        </Link>
      </div>

      {/* Profile & Logout */}
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/getprofile" className="flex items-center">
          <img
            src={profileImage}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black"
            alt="Profile"
          />
          <p className="ml-2 text-sm md:text-lg font-semibold text-white">Profile</p>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm md:text-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
