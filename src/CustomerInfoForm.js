// components/CustomerInfoForm.js
import React from "react";

const CustomerInfoForm = ({ customerData, validationErrors }) => {
  const customerProperties = Object.keys(customerData);

  // Properties ที่ไม่ต้องการแสดงในแบบฟอร์ม
  const excludedProperties = ['createdate', 'isBankVerified', 'wrong_bank', 'customer_id'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 sm:grid-cols-2">
      {customerProperties.map((property) => {
        // ไม่แสดง input สำหรับ properties ที่ไม่ต้องการแสดง
        if (excludedProperties.includes(property)) {
          return null;
        }

        return (
          <div key={property}>
            <label htmlFor={property} className="block text-sm font-semibold leading-6 text-gray-900">
              {property.replace(/_/g, ' ')}
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name={property}
                id={property}
                autoComplete="off"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  validationErrors && validationErrors[property] ? 'border-red-500' : ''
                }`}
                value={customerData[property] || ''}
              />
              {validationErrors && validationErrors[property] && (
                <p className="mt-1 text-sm text-red-500">{validationErrors[property]}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerInfoForm;
