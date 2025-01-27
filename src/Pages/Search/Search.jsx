import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Search_Feed from "../../Components/Search_Feed/Search_Feed";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Search.css";

const Search = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  const { query } = useParams(); // Get search query from the URL
  
  console.log("Query from URL in Search:", query);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <h1>Search Results for "{query}"</h1>
        <Search_Feed category={category} searchQuery={query} />
      </div>
    </>
  );
};

export default Search;
