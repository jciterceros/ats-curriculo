import React from "react";
import PropTypes from "prop-types";

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function SuccessMessage({ message }) {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <p>{message}</p>
    </div>
  );
}