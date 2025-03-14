// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faStar, faComment } from "@fortawesome/free-solid-svg-icons";
// import Navbar from "../Components/Navbar";
// import { useNavigate } from "react-router-dom";

// const ViewLogs = () => {
//   const navigate = useNavigate();
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [likes, setLikes] = useState({});
//   const [expanded, setExpanded] = useState({});
//   const [commentVisibility, setCommentVisibility] = useState({});
//   const [comments, setComments] = useState({});
//   const [storedComments, setStoredComments] = useState({});

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const response = await fetch("http://localhost:6007/getallLog", {
//           method: "GET",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!response.ok) throw new Error("Failed to fetch logs");
//         const data = await response.json();
//         setLogs(data);
//         setLoading(false);
//         setLikes(
//           data.reduce((acc, log) => ({ ...acc, [log._id]: log.likes || 0 }), {})
//         );
//         setExpanded(
//           data.reduce((acc, log) => ({ ...acc, [log._id]: false }), {})
//         );
//         setStoredComments(
//           JSON.parse(localStorage.getItem("comments")) || {}
//         );
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//       }
//     };
//     fetchLogs();
//   }, []);

//   const toggleLike = (id) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [id]: prevLikes[id] + 1,
//     }));
//   };

//   const toggleExpand = (id) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [id]: !prevExpanded[id],
//     }));
//   };

//   const toggleCommentField = (id) => {
//     setCommentVisibility((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleCommentChange = (id, event) => {
//     setComments((prev) => ({
//       ...prev,
//       [id]: event.target.value,
//     }));
//   };

//   const handleCommentSubmit = (id) => {
//     if (!comments[id]) return;
//     const updatedComments = {
//       ...storedComments,
//       [id]: [...(storedComments[id] || []), comments[id]],
//     };
//     localStorage.setItem("comments", JSON.stringify(updatedComments));
//     setStoredComments(updatedComments);
//     setComments((prev) => ({
//       ...prev,
//       [id]: "",
//     }));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 py-10">
//         <h2 className="text-4xl font-bold text-center mb-10 font-serif">
//           All Travel Logs
//         </h2>
//         {loading ? (
//           <p className="text-center text-lg font-medium">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-lg font-medium">No logs found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
//             {logs.map((log) => (
//               <div
//                 key={log._id}
//                 className="relative max-w-md bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
//               >
//                 {log.image && (
//                   <img
//                     src={`data:image/png;base64,${log.image}`}
//                     alt={log.placename}
//                     className="w-full h-56 object-cover"
//                   />
//                 )}
//                 <button
//                   className="absolute top-4 right-4 text-white hover:text-red-500 text-xl"
//                   onClick={() => toggleLike(log._id)}
//                 >
//                   <FontAwesomeIcon
//                     icon={faHeart}
//                     className={likes[log._id] > 0 ? "text-red-500" : ""}
//                   />
//                 </button>
//                 <div className="p-6 font-sans">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     {log.placename}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1">
//                     <strong>Category:</strong> {log.category}
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     <strong>Travel Date:</strong> {new Date(log.dateoftravel).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-600 text-base mt-3 leading-relaxed">
//                     {expanded[log._id]
//                       ? log.description
//                       : `${log.description.substring(0, 100)}...`}
//                   </p>
//                   <button
//                     className="text-black font-bold underline mt-2"
//                     onClick={() => toggleExpand(log._id)}
//                   >
//                     {expanded[log._id] ? "View Less" : "View More"}
//                   </button>
//                   <div className="flex items-center mt-3 text-yellow-500 text-lg">
//                     <FontAwesomeIcon icon={faStar} className="mr-2" />
//                     <span>{log.rating} / 5</span>
//                   </div>
//                   <button
//                     className="mt-4 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
//                     onClick={() => navigate(`/editlog/${log.placename}`)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="mt-4 flex items-center text-gray-700 hover:text-gray-600 transition"
//                     onClick={() => toggleCommentField(log._id)}
//                   >
//                     <FontAwesomeIcon icon={faComment} className="mr-2" /> Comment
//                   </button>
//                   {commentVisibility[log._id] && (
//                     <div className="mt-2">
//                       <div className="flex items-center p-2">
//                         <input
//                           type="text"
//                           className="flex-1 p-1 outline-none"
//                           placeholder="Write a comment..."
//                           value={comments[log._id] || ""}
//                           onChange={(event) => handleCommentChange(log._id, event)}
//                         />
//                         <button
//                           className="ml-2 bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
//                           onClick={() => handleCommentSubmit(log._id)}
//                         >
//                           Post
//                         </button>
//                       </div>
//                       {storedComments[log._id]?.map((comment, index) => (
//                         <p key={index} className="text-gray-600 text-sm mt-1 ml-2">{comment}</p>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ViewLogs;














