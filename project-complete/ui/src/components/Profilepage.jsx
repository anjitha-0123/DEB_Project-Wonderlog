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
