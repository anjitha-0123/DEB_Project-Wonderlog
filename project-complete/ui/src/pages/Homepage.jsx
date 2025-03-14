import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import add from '../assets/images/add.svg';
import LogCard from '../components/LogCard.jsx';

const Homepage = () => {
    const [logs, setLogs] = useState([]);
 
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch("/api/getAllLogs");
                if (!res.ok) {
                    throw new Error("Failed to fetch logs");
                }
                const data = await res.json();
                setLogs(data); 
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className='md:bg-gray-700 min-h-screen '>
            <Navbar />
            
            <div className="md:ml-24 md:text-3xl font-semibold mt-6 sm:text-sm ml-4 mr-4 w-[500px] h-[400px]">
                {logs.length > 0 ? (
                    logs.map((log) => <LogCard key={log._id} log={log} />)
                ) : (
                    <p className="text-white text-center">No logs found</p>
                )}
            </div>

            <div className="fixed bottom-6 right-6 sm:right-10 z-50">
                <Link to="/addlog">
                    <button className="flex items-center justify-center bg-white border-4 border-gray-800 rounded-full w-16 h-16 sm:w-20 sm:h-20 shadow-lg hover:bg-gray-200 transition">
                        <img src={add} className="w-10 sm:w-12" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Homepage;

