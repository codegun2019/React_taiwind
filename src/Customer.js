import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const CustomerTable = () => {
  const notify = () => toast("Wow so easy!");
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  useEffect(() => {
    // Fetch data from the API based on the current page and perPage
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    console.log(searchInput)
    try {
      const response = await axios.get(
        `http://localhost:3000/customer/?page=${currentPage}&perPage=${perPage}&search=${searchInput}`
      );
      if (response.data.status.code === 200) {
        setUserData(response.data.data);
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleDelete = async (customer_id) => {
    // แทนค่าอะไรก็ได้
    try {
      const response = await axios.delete(
        `http://localhost:3000/customer/${customer_id}` // แทนค่าอะไรก็ได้
      );
      fetchData();
      console.log("User deleted successfully");
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Error during delete request:",
        error.response.data.message,
        error.response.data.error,
        error.response.data.statusCode
      );
      toast.error(error.response.data.message);
    }
  };

  const UpdateUser = (customerId) => {
    window.location = `/customerupdate/${customerId}`;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData();
  };
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    console.log(e.target.value);
    fetchData();
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border ">
            <form className="w-full max-w-full lg:col-span-5 lg:pt-2 my-1.5" onSubmit={fetchData}>
              <div className="flex gap-x-4 ">
                <label htmlFor="name-address" className="sr-only">
                  name
                </label>
                <input
                  id="name-address"
                  name="name"
                  type="text"
                  required
                  className="min-w-1 w-full flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your name"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  ค้นหา
                </button>
              </div>
            </form>
            <table className="min-w-full divide-y divide-gray-200 border-gray-light-200 border-solid border-2 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    promotion
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    idcard
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-b-4 border-indigo-500"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-b-2 border-indigo-100">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-b-2 border-indigo-100">
                      {user.nopromation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border-b-2 border-indigo-100">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border-b-2 border-indigo-100">
                      {user.customer_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border-b-2 border-indigo-100">
                      {user.idcard}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border-b-2 border-indigo-100">
                      <a
                        className="text-green-500 hover:text-green-700"
                        href="#"
                      >
                        <div>
                          <button
                            type="button"
                            className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => UpdateUser(user.customer_id)}
                          >
                            แก้ไข
                          </button>
                        </div>
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border-b-2 border-indigo-100">
                      <a className="text-red-500 hover:text-red-700">
                        <div>
                          <button
                            type="button"
                            className="flex w-100 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleDelete(user.customer_id)}
                          >
                            ลบ
                          </button>
                        </div>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">{/* Your table rendering code */}</div>
      <div className="flex justify-center mt-4">
        {/* Pagination controls */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={userData.length < perPage}
          className="ml-2 px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomerTable;
