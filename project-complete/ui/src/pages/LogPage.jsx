import React from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile"; // Custom hook for user profile
import defaultImage from "../assets/images/default-log.png"; // Default fallback image

// Loader function for fetching log data
export const logLoader = async ({ params }) => {
  const logIdParam = params.logId;
  try {
    const res = await fetch(`/api/getLog?logId=${encodeURIComponent(logIdParam)}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to fetch log data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Log loading error:", error.message);
    return {
      title: "Not Found",
      description: "No description available",
      targetdate: "N/A",
      logImage: null,
    };
  }
};

const LogPage = () => {
  const { logId } = useParams();
  const log = useLoaderData();
  const navigate = useNavigate();
  const { profile, loading } = useProfile();

  // Log image logic: use API URL or fallback image
  const displayedImage = log.logImage ? log.logImage : defaultImage;

  if (loading) {
    return <div className="text-center p-10">Loading log details...</div>;
  }

  return (
    <div className="bg-gray-900 text-white mb-10 pb-10">
      <div className="max-w-4xl mx-auto p-5">
        <section>
          <Link className="flex items-center my-5 gap-1 font-medium text-blue-400" to="/logs">
            Back to Logs
          </Link>
        </section>

        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <img
            src={displayedImage}
            alt="Log Thumbnail"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-400">{log.title}</h1>
            <p>{log.description}</p>
            <span className="text-lg text-yellow-400 font-semibold">
              Target Date: {log.targetdate}
            </span>
          </div>
        </div>
      </div>

      {profile?.userRole === "admin" && (
        <div className="flex flex-row justify-end gap-4 mr-[205px]">
          <Link
            to={`/edit-log/${logId}`}
            className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center"
          >
            Edit Log
          </Link>
        </div>
      )}
    </div>
  );
};

export default LogPage;
