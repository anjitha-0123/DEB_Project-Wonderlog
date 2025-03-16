import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Addlog = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetdate, setTargetdate] = useState("");
    const [LogImage, setLogimage] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userid");

        try {
            const base64Image = LogImage 
                         ? await new Promise((res) => {
                           const r = new FileReader();
                           r.onload = () => res(r.result);
                           r.readAsDataURL(LogImage);}) : "";

            const logData = {
                category,
                title,
                description,
                targetdate,
                image: base64Image,
                userId
            };

            const res = await fetch("/api/addLog", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logData),
            });

            if (res.ok) {
                alert("Log Added Successfully!");
                setCategory("");
                setTitle("");
                setDescription("");
                setTargetdate("");
                setLogimage(null);
                document.getElementById("logimageinput").value = "";
            } else {
                const errorData = await res.json();
                alert("Error: " + (errorData.message || "Something went wrong"));
            }    
        } catch (error) {
            console.error(error);
            alert("Something went wrong: " + error.message);
        }
    };

    return (
        <div className="md:bg-gray-800 w-full min-h-screen sm: bg-white sm:  ">
            <Navbar />

            <form 
                className="md: border-2 border-white max-w-2xl ml-[500px] w-[1000px] h-[600px]  rounded-lg  p-6  bg-gray-900 text-white shadow-lg sm: ml-12 mt-12 w-[400px] h-[800px]"
                onSubmit={handleAdd}
            >
                <h2 className="text-2xl font-bold text-center mb-4">Add Log</h2>

                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-1">Category:</label>
                    <select 
                        className="w-full p-2 rounded-lg bg-gray-300 text-gray-900"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled hidden>Select a category</option>
                        <option value="Travel">Travel</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Learning">Learning</option>
                        <option value="Work">Work</option>
                        <option value="Relationship">Relationship</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-1">Title:</label>
                    <input 
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-300 text-gray-900"
                    />
                </div>

               
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-1">Description:</label>
                    <textarea 
                        rows="5"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-300 text-gray-900"
                    />
                </div>

               
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-1">Target Date:</label>
                    <input 
                        type="date"
                        required
                        value={targetdate}
                        onChange={(e) => setTargetdate(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-300 text-gray-900"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-1">Image:</label>
                    <input 
                        id="logimageinput"
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border-2 border-gray-400 rounded-lg bg-gray-300 text-gray-900"
                        onChange={(e) => setLogimage(e.target.files[0])}
                    />
                </div>

              
                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
                        Add
                    </button>
                    <button 
                        type="button" 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg" 
                        onClick={() => {
                            setCategory("");
                            setTitle("");
                            setDescription("");
                            setTargetdate("");
                            setLogimage(null);
                            document.getElementById("logimageinput").value = "";
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addlog;
