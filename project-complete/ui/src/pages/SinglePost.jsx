import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SinglePost = () => {
    const { id } = useParams(); // Get post ID from URL
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/getSingleInspiration/${id}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                if (!data) throw new Error("Post not found");

                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Loading post...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
            <button onClick={() => navigate(-1)} className="mb-5 px-4 py-2 bg-blue-500 text-white rounded">
                Back
            </button>

            <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <p className="text-gray-700 mt-4">{post.description}</p>

                {post.image && (
                    <img
                        src={`data:image/png;base64,${post.image}`}
                        alt={post.title}
                        className="w-full h-64 object-cover mt-6 rounded-lg"
                    />
                )}
            </div>
        </div>
    );
};

export default SinglePost;
