import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notifications_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";

const Navbar = ({ setSidebar }) => {
  const [query, setQuery] = useState(""); // Store search input
  const navigate = useNavigate(); // For navigation

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
        console.log("query",encodeURIComponent(query));
        navigate(`/search/${query}`); // Navigate to the search page
    }
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu_icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        {/* Wrap the logo with a Link for navigation */}
        <Link to="/">
          <img className="logo" src={logo} alt="YouTube Logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <form className="search-box flex-div" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <img src={search_icon} alt="Search" />
          </button>
        </form>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notifications_icon} alt="" />
        <img src={profile_icon} className="user_icon" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
