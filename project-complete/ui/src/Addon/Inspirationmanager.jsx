// import React, { useState } from "react";

// const InspirationManager = () => {
//   const [inspirations, setInspirations] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editIndex, setEditIndex] = useState(null);
//   const [message, setMessage] = useState("");

//   // 🔹 Handle Image Upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   // 🔹 Add or Update Inspiration
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title || !description) {
//       setMessage("❌ Title and description are required!");
//       return;
//     }

//     // Convert image to Base64
//     let imageBase64 = null;
//     if (image) {
//       const reader = new FileReader();
//       reader.readAsDataURL(image);
//       reader.onloadend = () => {
//         imageBase64 = reader.result;
//         saveInspiration(imageBase64);
//       };
//     } else {
//       saveInspiration(null);
//     }
//   };

//   // 🔹 Save or Update Inspiration in State
//   const saveInspiration = (imageBase64) => {
//     if (editIndex !== null) {
//       const updatedInspirations = inspirations.map((insp, index) =>
//         index === editIndex ? { title, description, image: imageBase64 } : insp
//       );
//       setInspirations(updatedInspirations);
//       setEditIndex(null);
//       setMessage("✅ Inspiration updated!");
//     } else {
//       const newInspiration = { title, description, image: imageBase64 };
//       setInspirations([...inspirations, newInspiration]);
//       setMessage("✅ Inspiration added!");
//     }

//     setTitle("");
//     setDescription("");
//     setImage(null);
//   };

//   // 🔹 Handle Edit
//   const handleEdit = (index) => {
//     setTitle(inspirations[index].title);
//     setDescription(inspirations[index].description);
//     setImage(null);
//     setEditIndex(index);
//   };

//   // 🔹 Handle Delete
//   const handleDelete = (index) => {
//     const updatedInspirations = inspirations.filter((_, i) => i !== index);
//     setInspirations(updatedInspirations);
//     setMessage("❌ Inspiration deleted!");
//   };

//   // 🔹 Handle Search
//   const filteredInspirations = inspirations.filter((insp) =>
//     insp.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-700 rounded-lg shadow-lg text-white">
//       <h2 className="text-2xl font-bold text-center mb-4">Manage Inspirations</h2>

//       {message && <p className="text-center text-red-500">{message}</p>}

//       {/* 🔍 Search */}
//       <input
//         type="text"
//         placeholder="Search Inspirations..."
//         className="w-full p-2 rounded bg-gray-600 text-white mb-4"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* ➕ Add/Edit Inspiration Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full p-2 rounded bg-gray-600 text-white"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           className="w-full p-2 rounded bg-gray-600 text-white"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input type="file" accept="image/*" onChange={handleImageChange} className="text-white" />

//         <button type="submit" className="w-full bg-orange-600 p-2 rounded">
//           {editIndex !== null ? "Update Inspiration" : "Add Inspiration"}
//         </button>
//       </form>

//       {/* 📜 Display Inspirations */}
//       <div className="mt-6">
//         {filteredInspirations.length > 0 ? (
//           filteredInspirations.map((insp, index) => (
//             <div key={index} className="p-4 bg-gray-800 rounded-lg mb-4 shadow">
//               {insp.image && <img src={insp.image} alt={insp.title} className="w-full h-40 object-cover rounded" />}
//               <h3 className="text-xl font-bold">{insp.title}</h3>
//               <p>{insp.description}</p>
//               <div className="flex space-x-2 mt-2">
//                 <button onClick={() => handleEdit(index)} className="bg-blue-500 p-2 rounded text-white">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(index)} className="bg-red-500 p-2 rounded text-white">
//                   Delete
//               </div>
//             </div>
//         ) : (
//           <p className="text-center">No inspirations found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InspirationManager;
