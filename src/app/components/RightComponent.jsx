"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon

const MySwal = withReactContent(Swal);

function RightComponent() {
  const [savedWebsiteDetails, setSavedWebsiteDetails] = useState([]); // State to store saved website details
  const [formData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });

    // handle change function to handle the inpu behaviour
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.url || !formData.username || !formData.password) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      const response = await fetch("/api/save-website-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
        setFormData({ url: "", username: "", password: "" }); // Clear form on success
        fetchWebsiteDetails();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to save website details.",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to connect to the server.",
        
      });
    }
  };

  const fetchWebsiteDetails = async () => {
    try {
      const response = await fetch("/api/get-website-details");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSavedWebsiteDetails(data.data);
        } else {
          console.error("Failed to fetch website details:", data.message);
        }
      } else {
        console.error(
          "Failed to fetch website details, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching website details:", error);
    }
  };
// handle delete for deleting the entire card 
  const handleDeleteWebsiteDetail = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/delete-website-details/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          if (response.ok && data.success) {
            MySwal.fire(
              "Deleted!",
              "Website detail has been deleted.",
              "success"
            );
            fetchWebsiteDetails(); // Re-fetch to update the list
          } else {
            MySwal.fire(
              "Error!",
              data.message || "Failed to delete website detail.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting website detail:", error);
          MySwal.fire("Error!", "Failed to delete website detail.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchWebsiteDetails(); // Fetch data on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-l from-purple-50 to-purple-300 flex flex-col justify-center gap-20">
      <div className="bg-gradient-to-r from-purple-50 to-purple-300 p-8 rounded-lg h-[40vh] shadow-md mx-20 mt-0">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Website Details
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            placeholder="Website URL"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            required
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-60 px-2 py-2 bg-purple-700 border border-purple-500 rounded-lg text-white animate-pulse"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Styled Saved Website Details */}
      {savedWebsiteDetails.length > 0 && (
        <div className="mt-8 mx-20 px-10 py-5 bg-purple-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">
            Saved Website Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-purple-300 bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-500 text-white rounded-t-lg">
                  <th className="px-4 py-3 text-left">URL</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Password</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedWebsiteDetails.map((detail, index) => (
                  <tr
                    key={detail._id}
                    className={`border-b border-purple-200 ${
                      index === 0 ? "first:rounded-t-lg" : ""
                    } ${
                      index === savedWebsiteDetails.length - 1
                        ? "last:rounded-b-lg"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-purple-800">{detail.url}</td>
                    <td className="px-4 py-3 text-purple-700">
                      {detail.username}
                    </td>
                    <td className="px-4 py-3 text-purple-700">
                      {detail.password}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteWebsiteDetail(detail._id)}
                        className="text-purple-500 hover:text-purple-700 focus:outline-none"
                        aria-label="Delete"
                      >
                        <AiFillDelete className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightComponent;
