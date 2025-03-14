import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch post data
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/getPost/${postId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch("/api/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ postId, content: comment }), // No need for username
      });

      if (!response.ok) throw new Error("Failed to add comment");

      const data = await response.json();
      setComments([...comments, data.comment]); // Update UI with new comment
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.description}</p>

      {/* Comment Input */}
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <p key={index} className="mt-2 text-gray-700">
              <strong>{c.user}:</strong> {c.content}
            </p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddComment;
