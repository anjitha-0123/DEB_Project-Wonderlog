import React, { useEffect, useState } from "react";
import InspirationCard from "../components/InspirationCard.jsx";

const InspirationList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await fetch("/api/getinspirations");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching inspirations:", error);
      }
    };

    fetchInspirations();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Inspirations</h2>
      {posts.length > 0 ? (
        posts.map((post) => <InspirationCard key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">No inspirations found.</p>
      )}
    </div>
  );
};

export default InspirationList;

