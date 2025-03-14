// import React, { useState } from 'react';
// import { Link ,useNavigate} from 'react-router-dom'
// import homelogo from '../assets/images/home.svg'
// import logo from '../assets/images/logo.svg'
// import manager from '../assets/images/manager.svg'

//  const AddPost=()=>{
//   const navigate = useNavigate(); 

//   const [title,setTitle]=useState("");
//   const [description,setDescription]=useState("")
//   const [InspImage,setInspimage]=useState(null);

//   const handlePost = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !InspImage) {
//         alert("Please provide title, description, and an image.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("InspImage", InspImage); 

//     try {
//         const res = await fetch("/api/addinspiration", {
//             method: "POST",
//             credentials: "include",
//             body: formData, 
//         });

//         const result = await res.json();
//         console.log("Upload Response:", result);

//         if (res.ok) {
//             alert("Post Added Successfully");
//             setTitle("");
//             setDescription("");
//             setInspimage(null);
//             document.getElementById("Inspimageinput").value = "";
//         } else {
//             alert("Error: " + (result.message || "Something went wrong"));
//         }
//     } catch (error) {
//         console.error("Error uploading inspiration:", error);
//         alert("Something went wrong: " + error.message);
//     }
// };
// const handleLogout = async () => {
//   try {
//     const response = await fetch('/logout', {
//       method: 'GET',
//       credentials: 'include', 
//     });

//     if (response.ok) {
//       navigate('/login'); 
//     } else {
//       console.error('Logout failed');
//     }
//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// };

// return(
//   <div>
//        <nav className="bg-orange-700  rounded-lg md:ml-2 mt-1 md:h-[150px] flex justify-between">
//       <div>
//         <a>
//           <img src={logo} className="md:w-[300px] md:h-[150px] sm:w-[95px] sm:h-[95px]" />
//         </a>
//       </div>
//       <div className="flex md:ml-[1200px] my-auto w-full sm:ml-2">
//         <Link to="/admindash" className="flex hover:bg-orange-800 rounded-lg">
//           <img src={homelogo} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//           <p className="md:mt-1 md:text-2xl font-semibold">Home</p>
//         </Link>
      
//         <Link to="/addpost" className="flex md:ml-8 hover:bg-orange-800 rounded-lg">
//           <img src={manager} className="md:w-[40px] md:h-[40px] sm:w-[20px] h-[20px]" />
//           <p className="md:mt-1 md:text-2xl font-semibold">Add Inspirations</p>
//         </Link>

  
//         <button onClick={handleLogout}  className="md:mt-1 md:text-2xl ml-4 font-semibold">
//           LogOut
//         </button>
//       </div>
     
//     </nav>
 
//   <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-700 rounded-lg shadow-lg text-white">
//   <h2 className="text-2xl font-bold text-center mb-4">Manage Inspirations</h2>
  

//      <form  onSubmit={handlePost} >
   
//         <input
//           type="text"
//           id='title'
//           placeholder="Title"
//           className="w-full p-2 rounded bg-gray-600 text-white"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           id='description'
//           className="w-full  mt-2 p-4 rounded bg-gray-600 text-white"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input id="Inspimageinput" type="file" accept="image/*" onChange={(e)=>setInspimage(e.target.files[0])} className="text-white border-2 border-white w-full rounded" />

//         <button type="submit" className="w-full bg-orange-600 mt-4 p-2 rounded"> Add Inspiration
//         </button>

     
      
//      </form>

//   </div>


// </div>
//      );
//  };

// export default AddPost





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homelogo from '../assets/images/home.svg';
import logo from '../assets/images/logo.svg';
import manager from '../assets/images/manager.svg';

const AddPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [InspImage, setInspimage] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();

    if (!title || !description || !InspImage) {
      alert("Please provide title, description, and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("InspImage", InspImage);

    try {
      const res = await fetch("/api/addinspiration", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Post Added Successfully");
        setTitle("");
        setDescription("");
        setInspimage(null);
        document.getElementById("Inspimageinput").value = "";
      } else {
        alert("Error: " + (result.message || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error uploading inspiration:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-orange-700 rounded-lg p-4 flex flex-wrap justify-between items-center md:flex-nowrap">
        <div>
          <img src={logo} className="w-28 md:w-48" alt="Logo" />
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <Link to="/admindash" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
            <img src={homelogo} className="w-6 md:w-10" alt="Home" />
            <p className="ml-2 text-sm md:text-3xl font-semibold">HOME</p>
          </Link>

          <Link to="/addpost" className="flex items-center hover:bg-orange-800 p-2 rounded-lg">
            <img src={manager} className="w-6 md:w-10" alt="Add Inspirations" />
            <p className="ml-2 text-sm md:text-3xl font-semibold">ADD INSPIRATION</p>
          </Link>

          <button onClick={handleLogout} className="bg-red-800 font-semibold hover:bg-red-900 p-2 rounded-lg text-sm md:text-2xl">
            Log Out
          </button>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Manage Inspirations</h2>

        <form onSubmit={handlePost} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 rounded bg-gray-700 text-white h-[400px] focus:outline-none focus:ring-2 focus:ring-orange-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            id="Inspimageinput"
            type="file"
            accept="image/*"
            className="w-full border-2 border-gray-600 p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setInspimage(e.target.files[0])}
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 p-3 rounded text-lg font-semibold"
          >
            Add Inspiration
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
