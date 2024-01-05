// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCreate from './Users';
import CustomerTable from './Customer';
import CustomerUpdate from './Customerupdate';
import UsersUpdate from './Usersupdate';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserCreate />} />
        <Route path="/usersupdate/:id" element={<UsersUpdate />} />
        <Route path="/customer" element={<CustomerTable />} />
        <Route path="/customerupdate/:id" element={<CustomerUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
