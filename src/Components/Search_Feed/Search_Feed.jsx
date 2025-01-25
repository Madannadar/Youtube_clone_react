import React, { useEffect, useState } from "react";
import "./Search_Feed.css";
import { Link, useNavigate } from "react-router-dom";
import { API_KEY, value_Converter } from "../../data";
import moment from "moment";

const Search_Feed = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const fetchSearchResults = async () => {
    try {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&key=${API_KEY}`;
      const response = await fetch(searchUrl);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    console.log("Search Query in Search_Feed:", searchQuery);
    if (searchQuery) {
      fetchSearchResults();
    } else {
      navigate("/"); // Redirect to home if searchQuery is empty
    }
  }, [searchQuery, navigate]);

  return (
    <div className="feed">
      {data.map((item) => {
        const videoId = item.id.videoId; // Video ID for the search result
        if (!videoId) return null;
        // else{
        //     console.log("Video ID:", item.id.videoId);
        // }
        return (
          <Link
            key={`${videoId}-${item.snippet.title}`} // Unique key for each result
            to={`Video/${item.snippet.channelId}/${videoId}`}
            className="card"
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Search_Feed;
