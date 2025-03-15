import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homelogo from '../assets/images/home.svg';
import logo from '../assets/images/logo.svg';
import manager from '../assets/images/manager.svg';
import PostCard from '../components/PostCard';

function AdminDash() {
  const navigate = useNavigate();

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
      <nav className="bg-orange-700 p-4 rounded-lg flex flex-wrap justify-between items-center">
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

          <button
            onClick={handleLogout}
            className="bg-red-800 font-semibold hover:bg-red-900 p-2 rounded-lg text-sm md:text-2xl"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Post Section */}
      <div className="container mx-auto mt-6 p-4">
        <h2 className="text-2xl md:text-3xl font-bold  mb-4">Admin Dashboard</h2>

        <PostCard></PostCard>
      </div>
    </div>
  );
}

export default AdminDash;
