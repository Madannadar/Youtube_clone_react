import React from "react";
import { useParams } from "react-router-dom";
import Search_Feed from "../../Components/Search_Feed/Search_Feed";

const Search = () => {
  const { query } = useParams(); // Get search query from the URL
  console.log("Query from URL in Search:", query);
    
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <Search_Feed searchQuery={query} />
    </div>
  );
};

export default Search;
