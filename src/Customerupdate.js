// components/CustomerUpdate.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomerInfoForm from "./CustomerInfoForm";

const CustomerUpdate = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    nopromation: "",
    phone: "",
    customer_name: "",
    idcard: "",
    // Add more fields as needed
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/customer/${id}`);
      if (response.data.status.code === 200) {
        setUser(response.data.data);
      } else {
        console.error("Error fetching user data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/customer/${id}`, user);
      if (response.data.status.code === 200) {
        console.log("User updated successfully");
        // Optionally, you can redirect the user to the previous page
        // or perform any other actions after a successful update.
      } else if (response.data.status.code === 400) {
        console.error("xxx");
        setValidationErrors(response.data.errors);
      } else {
        console.error("Error updating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error during update request:", error.message);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Update customer </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      {/* Render the CustomerInfoForm component passing the user data and validation errors */}
      <CustomerInfoForm customerData={user} validationErrors={validationErrors} />
      {/* Add your update form here */}
      <form onSubmit={handleSubmit}>
        {/* ... Your update form fields ... */}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerUpdate;
