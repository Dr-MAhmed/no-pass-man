"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiFillDelete } from "react-icons/ai";

const MySwal = withReactContent(Swal);

function LeftComponent() {
  const [savedCreditCardDetails, setSavedCreditCardDetails] = useState([]); // State for saved card details
  const [formData, setFormData] = useState([
    {
      cardNumber: "",
      pin: "",
      cvv: "",
      expiry: "",
      cardType: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cardNumber ||
      !formData.pin ||
      !formData.cvv ||
      !formData.expiry ||
      !formData.cardType
    ) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      const response = await fetch("/api/save-credit-card-details", {
        // Adjusted API route path for app router
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
        setFormData({
          cardNumber: "",
          pin: "",
          cvv: "",
          expiry: "",
          cardType: "",
        }); // Clear form on success
        fetchCreditCardDetails();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to save credit card details.",
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

  const fetchCreditCardDetails = async () => {
    try {
      const response = await fetch("/api/get-credit-card-details");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSavedCreditCardDetails(data.data);
        } else {
          console.error("Failed to fetch credit card details:", data.message);
        }
      } else {
        console.error(
          "Failed to fetch credit card details, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching credit card details:", error);
    }
  };

  const handleDeleteCreditCardDetail = async (id) => {
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
          const response = await fetch(
            `/api/delete-credit-card-details/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (response.ok && data.success) {
            MySwal.fire(
              "Deleted!",
              "Credit card detail has been deleted.",
              "success"
            );
            fetchCreditCardDetails(); // Re-fetch to update the list
          } else {
            MySwal.fire(
              "Error!",
              data.message || "Failed to delete credit card detail.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting credit card detail:", error);
          MySwal.fire(
            "Error!",
            "Failed to delete credit card detail.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchCreditCardDetails(); // Fetch data on component mount
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(formData));
    alert("Card details copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-300 flex flex-col justify-center gap-10">
      <div className="bg-gradient-to-l from-purple-50 to-purple-300 p-8 rounded-lg shadow-md mx-20 h-[49%] mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Credit Card Details
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber || ""}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          />
          <input
            type="password"
            name="pin"
            placeholder="PIN"
            value={formData.pin || ""}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv || ""}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiry || ""}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          />
          <select
            name="cardType"
            value={formData.cardType || ""}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
          >
            <option value="">Select Card Type</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Amex">Amex</option>
          </select>
          <div className="flex items-center justify-center">
            <button className="w-60 px-2 py-2 border border-purple-500 rounded-lg bg-purple-700 text-white animate-pulse">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Styled Saved Credit Card Details */}
      {savedCreditCardDetails.length > 0 && (
        <div className="mt-8 mx-20 bg-purple-400 px-10 py-5 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">
            Saved Credit Card Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-purple-300 bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-500 text-white rounded-t-lg">
                  <th className="px-4 py-3 text-left">Card Number</th>
                  <th className="px-4 py-3 text-left">Expiry</th>
                  <th className="px-4 py-3 text-left">Card Type</th>
                  <th className="px-4 py-3 text-left">PIN</th>
                  <th className="px-4 py-3 text-left">CVV</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedCreditCardDetails.map((detail, index) => (
                  <tr
                    key={detail._id}
                    className={`border-b border-purple-200 ${
                      index === 0 ? "first:rounded-t-lg" : ""
                    } ${
                      index === savedCreditCardDetails.length - 1
                        ? "last:rounded-b-lg"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-purple-800">
                      {detail.cardNumber}
                    </td>
                    <td className="px-4 py-3 text-purple-700">
                      {detail.expiry}
                    </td>
                    <td className="px-4 py-3 text-purple-700">
                      {detail.cardType}
                    </td>
                    <td className="px-4 py-3 text-purple-700">{detail.pin}</td>
                    <td className="px-4 py-3 text-purple-700">{detail.cvv}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteCreditCardDetail(detail._id)}
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

export default LeftComponent;
