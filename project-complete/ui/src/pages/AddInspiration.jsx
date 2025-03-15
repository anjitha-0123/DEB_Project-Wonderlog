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
