import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RolePopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleChoice = (role: "customer" | "provider") => {
    setShowPopup(false);
    localStorage.setItem("userRoleChosen", "true"); // optional - remember choice

    if (role === "provider") {
      navigate("/provider-login"); // redirect service providers
    }
  };

  useEffect(() => {
    const hasChosen = localStorage.getItem("userRoleChosen");
    if (hasChosen) setShowPopup(false);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center space-y-4 animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">Who are you?</h2>
        <p className="text-gray-600 text-sm">Please choose your role to continue.</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleChoice("customer")}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            I’m a Customer
          </button>

          <button
            onClick={() => handleChoice("provider")}
            className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            I’m a Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePopup;
