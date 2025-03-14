// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

// const UpdateProfile = () => {
//   const [name, setName] = useState(""); // Username (not editable)
//   const [bio, setBio] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(""); // Image preview
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("/api/getProfile", {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setName(data.username); // Keep username (assuming it's required)
//           setBio(data.bio || ""); // Ensure bio is not undefined
//           setPreviewImage(data.image || "images/editprofile.svg"); // Use default image if none exists
//         } else {
//           console.error("Error fetching profile:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleBioAndImageUpdate = async (e) => {
//     e.preventDefault();

//     if (!bio && !profileImage) {
//         alert("No changes detected.");
//         return;
//     }

//     try {
//         const formData = new FormData();
//         formData.append("username", name); // Ensure it matches backend field name
//         formData.append("bio", bio); // Change "Bio" to "bio"
//         if (profileImage) {
//             formData.append("ProfileImage", profileImage);
//         }

//         const res = await fetch("/api/updateBioAndImage", {
//             method: "PATCH",
//             credentials: "include",
//             body: formData,
//         });

//         const data = await res.json();

//         if (res.ok) {
//             alert("Bio and Image Updated Successfully!");
//             window.location.reload();
//         } else {
//             alert("Error: " + (data.message || "Something went wrong"));
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Something went wrong: " + error.message);
//     }
// };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

//   return (
//     <div className="bg-gray-800 w-full min-h-screen">
//       <Navbar />

//       <form className="md:mt-24 sm:mt-12" onSubmit={handleBioAndImageUpdate}>
//         <h1 className="text-white md:text-2xl font-semibold text-center">
//           Update Profile
//         </h1>

//         {/* Profile Image Section */}
//         <div className="bg-gray-400 md:w-[400px] md:h-[200px] mt-4 mx-auto rounded-md flex flex-col items-center justify-center">
//           <img
//             src={previewImage}
//             className="md:w-24 md:h-24 sm:w-12 sm:h-12 rounded-full border"
//             alt="Profile Preview"
//           />
//           <label
//             htmlFor="profileimageinput"
//             className="md:text-xl font-semibold cursor-pointer mt-2 text-blue-600 hover:underline"
//           >
//             Change Profile Photo
//           </label>
//           <input
//             type="file"
//             id="profileimageinput"
//             className="hidden"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>

//         {/* Bio Input */}
//         <div className="grid md:w-[450px] mx-auto mt-8">
//           <label className="text-orange-600 font-semibold text-xl mt-4">
//             Bio:
//           </label>
//           <textarea
//             rows="4"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="w-full h-24 p-2 rounded-md border"
//           ></textarea>

//           {/* Update Button */}
//           <button
//             type="submit"
//             className="bg-white text-orange-900 w-24 h-12 mx-auto mt-6 rounded-lg text-lg font-semibold hover:bg-gray-300"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;


import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const UpdateProfile = () => {
  const [name, setName] = useState(""); // Username (not editable)
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // Image preview
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setName(data.username);
          setBio(data.bio || ""); 
          setPreviewImage(data.image || "images/editprofile.svg"); 
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBioAndImageUpdate = async (e) => {
    e.preventDefault();

    if (!bio && !profileImage) {
        alert("No changes detected.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("username", name);
        formData.append("bio", bio);
        if (profileImage) {
            formData.append("ProfileImage", profileImage);
        }

        const res = await fetch("/api/updateBioAndImage", {
            method: "PATCH",
            credentials: "include",
            body: formData,
        });

        const data = await res.json();

        if (res.ok) {
            alert("Bio and Image Updated Successfully!");
            window.location.reload();
        } else {
            alert("Error: " + (data.message || "Something went wrong"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong: " + error.message);
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="bg-gray-800 w-full min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center mt-12 px-4">
        <form
          className="bg-gray-700 p-6 rounded-lg shadow-lg text-center w-full max-w-md"
          onSubmit={handleBioAndImageUpdate}
        >
          <h1 className="text-white text-xl md:text-2xl font-semibold">
            Update Profile
          </h1>

          {/* Profile Image Section */}
          <div className="bg-gray-400 w-full max-w-xs mx-auto rounded-md flex flex-col items-center justify-center p-4 mt-4">
            <img
              src={previewImage}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border"
              alt="Profile Preview"
            />
            <label
              htmlFor="profileimageinput"
              className="text-blue-600 hover:underline font-semibold cursor-pointer mt-2"
            >
              Change Profile Photo
            </label>
            <input
              type="file"
              id="profileimageinput"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Bio Input */}
          <div className="mt-6 text-left">
            <label className="text-orange-600 font-semibold text-lg">
              Bio:
            </label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 rounded-md border bg-gray-800 text-white"
            ></textarea>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="bg-white text-orange-900 w-full py-2 rounded-lg text-lg font-semibold hover:bg-gray-300 mt-6"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
