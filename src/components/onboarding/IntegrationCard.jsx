import React from "react";

const IntegrationCard = ({
  name,
  description,
  icon,
  iconBg = "#F3F4FF",
  isConnected,
  onClick,
}) => {
  return (
    <div
      className={`
        flex flex-col justify-between rounded-2xl border bg-white px-5 py-4
        transition cursor-pointer
        ${
          isConnected
            ? "border-purple-500 shadow-[0_0_0_1px_rgba(139,92,246,0.25)]"
            : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
        }
      `}
      onClick={onClick}
    >
      <div>
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-lg"
          style={{ backgroundColor: iconBg }}
        >
          <span className="text-xl">{icon}</span>
        </div>

        {/* Title + description */}
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      {/* Button */}
      <button
        type="button"
        className={`
          mt-4 w-full rounded-lg py-2 text-sm font-semibold transition
          ${
            isConnected
              ? "bg-purple-100 text-purple-700"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }
        `}
      >
        {isConnected ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default IntegrationCard;
