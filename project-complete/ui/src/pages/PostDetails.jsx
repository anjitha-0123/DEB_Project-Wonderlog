import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/getInspiration/${id}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                console.log("hi");
                
                console.log(response);
                

                if (!response.ok) {
                    throw new Error("Failed to fetch post");
                }

                const data = await response.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Loading post...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                {post.image && (
                    <img
                        src={`data:image/png;base64,${post.image}`}
                        alt={post.title}
                        className="w-full h-64 object-cover mt-4 rounded-lg"
                    />
                )}
                <p className="text-gray-700 mt-4">{post.description}</p>
            </div>
        </div>
    );
};

export default PostDetails;
