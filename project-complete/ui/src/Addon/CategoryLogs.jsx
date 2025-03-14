import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CategoryLogs = () => {
    const { category } = useParams(); // Get category from URL
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(category || "All");

    // Fetch logs from backend
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/getLog", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to fetch logs");

                setLogs(data);
                setFilteredLogs(data); // Initially show all logs
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    // Filter logs based on category selection
    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredLogs(logs);
        } else {
            const filtered = logs.filter((log) => log.category === selectedCategory);
            setFilteredLogs(filtered);
        }
    }, [selectedCategory, logs]);

    // Log categories
    const categories = ["All", "Travel", "Work", "Personal Development", "Fitness", "Learning", "Relationship"];

    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <Navbar />

            {/* Title & Back Button */}
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <h1 className="text-white text-3xl font-bold">Logs - {selectedCategory}</h1>
                <Link to="/" className="bg-white text-black font-semibold text-lg rounded-lg px-4 py-2">
                    Back
                </Link>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-300"
                        }`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Display Logs */}
            {loading ? (
                <p className="text-white mt-4 text-center">Loading logs...</p>
            ) : error ? (
                <p className="text-red-500 mt-4 text-center">{error}</p>
            ) : filteredLogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {filteredLogs.map((log) => (
                        <div key={log._id} className="border p-4 rounded-lg bg-gray-800 text-white">
                            {log.image && (
                                <img
                                    src={log.image} // Base64 image
                                    alt={log.title}
                                    className="w-full h-48 object-cover rounded"
                                />
                            )}
                            <h3 className="text-lg font-bold mt-2">{log.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">Target Date: {log.targetdate}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-white mt-4 text-center">No logs found in this category.</p>
            )}
        </div>
    );
};

export default CategoryLogs;
