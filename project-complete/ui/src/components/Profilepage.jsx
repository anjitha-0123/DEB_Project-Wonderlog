// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/images/logo.svg";
// import homelogo from "../assets/images/home.svg";
// import logs from "../assets/images/logs.svg";
// import manager from "../assets/images/manager.svg";
// import defaultProfile from "../assets/images/person1.png"; 

// const GetProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [profileImage, setProfileImage] = useState(defaultProfile); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         console.log(" Fetching current user's profile...");

//         const res = await fetch("/api/getProfile", {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await res.json();
//         console.log("API Response:", data);

//         if (res.ok) {
//           setProfile(data.data);
//           if (data.data?.image) {
//             setProfileImage(`data:image/png;base64,${data.data.image}`);
//           }
//         } else {
//           setError(data.msg || "Profile not found.");
//         }
//       } catch (err) {
//         console.error(" Error fetching profile:", err);
//         setError("Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="bg-gray-800 min-h-screen w-full text-white">
      
      
//     <nav className="bg-orange-700 w-full rounded-lg  md:h-[150px] flex justify-between">
//        <div><a><img src={logo} className="md:w-[150px] md:h-[150px] sm:w-[95px] sm:h-[95px]" /></a></div>
//        <div className="flex md:ml-[100px] my-auto sm:ml-2">
//             <Link to="/home" className="flex hover:bg-orange-800 rounded-lg">
//                   <img src={homelogo} 
//                   className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//                   <p className="md:mt-1 md:text-2xl font-semibold">Home</p>
//             </Link>
//             <Link to="/mylogs" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
//                   <img src={logs} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//                   <p className="md:mt-1 md:text-2xl font-semibold">MY LOGS</p>
//             </Link>
//             <Link to="/inspiration" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
//                   <img src={manager} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//                   <p className="md:mt-1 md:text-2xl font-semibold">Inspirations</p>
//             </Link>

//         </div>
//            <div className="md:mr-6 mt-14 flex ">
//            <Link to="/updateprofile">
//                   <p className="md:ml-2 md:text-xl md:font-semibold text-white sm:text-sm">Edit Profile</p>
//             </Link>
          
//             <Link to="/addprofile">
//                    <p className="md:ml-4 md:text-xl md:font-semibold text-black sm:text-sm">Add Profile</p>
//             </Link>
//             <Link to="/getProfile">
//                   <p className="md:ml-4 md:text-xl md:font-semibold text-white sm:text-sm">View Profile</p>
//             </Link>
//                  <p className="md:ml-4 md:text-xl md:font-semibold text-black sm:text-sm">
//                  <Link to="/login">Logout</Link>
//                 </p>
//         </div>

//         <Link to="/getprofile">
//               <img src={profileImage}
//               className="md:w-[120px] md:h-[120px] rounded-full sm:w-[25px] sm:h-[25px] border border-white"
//               alt="Profile" />
//         </Link>
//     </nav>

    
//       <div className="w-[500px] h-[600px] mx-auto mt-12 p-6 bg-gray-700 rounded-lg shadow-lg">
//         {loading && <p className="text-center text-xl">⏳ Loading profile...</p>}
//         {error && !loading && <p className="text-center text-red-500">{error}</p>}

//         {!loading && !error && profile && (
//           <div className="text-center">
//             <img
//               src={profileImage}
//               className="w-32 h-32 rounded-full mx-auto border"
//               alt="Profile"
//             />
//             <h2 className="text-2xl font-bold mt-4">{profile.username}</h2>
//             <p className="text-gray-300">{profile.email}</p>
//             <p className="mt-4">{profile.bio}</p>
//           </div>
//         )}
//       </div>
      
//     </div>
//   );
// };

// export default GetProfile;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import homelogo from "../assets/images/home.svg";
import logs from "../assets/images/logs.svg";
import manager from "../assets/images/manager.svg";
import defaultProfile from "../assets/images/person1.png";

const GetProfile = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data.data);
          if (data.data?.image) {
            setProfileImage(`data:image/png;base64,${data.data.image}`);
          }
        } else {
          setError(data.msg || "Profile not found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen w-full text-white">
      {/* Navbar */}
      <nav className="bg-orange-700 w-full rounded-lg flex flex-wrap justify-between items-center p-4">
        <div>
          <img src={logo} className="w-24 md:w-36" alt="Logo" />
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <Link to="/home" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
            <img src={homelogo} className="w-6 md:w-10" alt="Home" />
            <p className="ml-2 text-sm md:text-lg font-semibold">Home</p>
          </Link>

          <Link to="/mylogs" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
            <img src={logs} className="w-6 md:w-10" alt="My Logs" />
            <p className="ml-2 text-sm md:text-lg font-semibold">My Logs</p>
          </Link>

          <Link to="/inspiration" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
            <img src={manager} className="w-6 md:w-10" alt="Inspirations" />
            <p className="ml-2 text-sm md:text-lg font-semibold">Inspirations</p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/updateprofile" className="text-sm md:text-lg font-semibold text-white">
            Edit Profile
          </Link>
          <Link to="/addprofile" className="text-sm md:text-lg font-semibold text-black">
            Add Profile
          </Link>
          <Link to="/getProfile" className="text-sm md:text-lg font-semibold text-white">
            View Profile
          </Link>
          <Link to="/login" className="text-sm md:text-lg font-semibold text-black">
            Logout
          </Link>
          <Link to="/getprofile">
            <img
              src={profileImage}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white"
              alt="Profile"
            />
          </Link>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center w-full max-w-md mx-4 md:mx-0">
          {loading && <p className="text-xl">⏳ Loading profile...</p>}
          {error && !loading && <p className="text-red-500">{error}</p>}

          {!loading && !error && profile && (
            <>
              <img
                src={profileImage}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border"
                alt="Profile"
              />
              <h2 className="text-2xl font-bold mt-4">{profile.username}</h2>
              <p className="text-gray-300">{profile.email}</p>
              <p className="mt-4">{profile.bio}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetProfile;
