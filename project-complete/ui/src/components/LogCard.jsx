import React, { useState } from "react";

const LogCard = ({ log, fetchLogs }) => {
    const [filter, setFilter] = useState(""); // Search filter state
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // State to track expanded descriptions

    const handleDelete = async (title) => {
        if (!window.confirm("Are you sure you want to delete this log?")) return;

        try {
            const res = await fetch("http://localhost:3000/api/deleteLog", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Title: title }),
            });

            if (!res.ok) throw new Error("Failed to delete log");

            alert("Log deleted successfully");
            if (fetchLogs) fetchLogs(); // Refresh logs after deletion
        } catch (error) {
            console.error("Error deleting log:", error);
            alert("Failed to delete log: " + error.message);
        }
    };

    // Filter logs based on search criteria
    const filteredLogs = log.logs.filter((entry) =>
        entry.title.toLowerCase().includes(filter.toLowerCase()) ||
        entry.category.toLowerCase().includes(filter.toLowerCase())
    );

    // Function to toggle description visibility
    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full p-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search logs by title or category..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className=" p-2 mb-4 border rounded-lg text-black "
            />

            {/* Logs Grid */}
            <div className="sm: grid md: grid grid-cols-3 gap-[550px]">
                {filteredLogs.map((entry) => {
                    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
                    const addedDate = new Date(entry.targetdate).toISOString().split("T")[0]; // Convert target date

                    let dateMessage = "";
                    if (addedDate === today) {
                        dateMessage = ` Target Date:${addedDate}  Today!` ;
                    } else if (addedDate < today) {
                        dateMessage = `Target Date:${addedDate} Completed!`;
                    } else {
                        dateMessage = `Target Date:${addedDate} Upcoming!`;
                    }

                    return (
                        <div key={entry._id} className="border-4 border-black p-4 rounded-lg bg-gray-800 md: w-[500px] h-[460px]">
                            {/* Image */}
                            {entry.image && (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded">
                                    <img
                                        src={entry.image}
                                        alt={entry.title}
                                        className="w-full h-full object-contain rounded"
                                    />
                                </div>
                            )}

                            {/* Log Details */}
                            <h3 className="text-lg font-bold mt-2 text-orange-400">{entry.category}</h3>
                            <h1 className="text-lg font-bold mt-2 text-yellow-400 ">{entry.title}</h1>
                            <p className="text-white mt-2">
                                {expandedDescriptions[entry._id]
                                    ? entry.description
                                    : entry.description.substring(0, 50) + "..."}
                            </p>

                            {/* Show More/Less Button */}
                            <button
                                className="text-purple-600 hover:text-purple-900 py-2"
                                onClick={() => toggleDescription(entry._id)}
                            >
                                {expandedDescriptions[entry._id] ? "Less" : "More"}
                            </button>
                            <div className="flex gap-28">
                            {/* Target Date with Status */}
                            <p className="text-sm text-gray-400 mt-2 bg-red-900 w-40 h-6 rounded-lg w-52 h-14 text-white p-2">
                                {dateMessage}
                            </p>

                            {/* Delete Button */}
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white text-xl h-12 w-24 mt-4 rounded-lg"
                                onClick={() => handleDelete(entry.title)}
                            >
                                Delete
                            </button>
</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogCard;
