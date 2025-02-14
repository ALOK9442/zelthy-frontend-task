import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function HeaderProfile({
  imgLink,
  name,
  email,
  onLogout,
  onProfile,
  onSettings,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onClick={() => {
        setShowMenu((prev) => !prev);
      }}
      style={{
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <img src={imgLink} alt="Profile" className="sm:w-10 sm:h-10 w-6 h-6 rounded-full" />
      <h4 className="sm:text-lg text-xs font-semibold">{name}</h4>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`transition-transform duration-300 ${
          showMenu ? "rotate-180" : "rotate-0"
        }`}
      />

      {showMenu && (
        <DropDownMenu
          email={email}
          onProfile={onProfile}
          onSettings={onSettings}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}

function DropDownMenu({ email, onProfile, onSettings, onLogout }) {
  return (
    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg w-fit">
      <ul>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">{email}</li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={onProfile}
        >
          Profile
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={onSettings}
        >
          Settings
        </li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}
