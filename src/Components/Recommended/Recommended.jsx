import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_Converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const validCategoryId = categoryId || "0"; // Default to "0" if categoryId is undefined
    try {
      const Recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=44&regionCode=US&videoCategoryId=${validCategoryId}&key=${API_KEY}`;
      const response = await fetch(Recommended_url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setApiData(data.items || []);
    } catch (error) {
      console.error("Failed to fetch recommended videos:", error);
      setApiData([]); // Fallback to an empty array
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    } else {
        console.error("No categoryId provided, using default.");
        setApiData([]); // Fallback to an empty array
    }
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.length > 0 ? (
        apiData.map((item, index) => (
          <Link
            to={`/video/${item.snippet?.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img
              src={item.snippet?.thumbnails?.medium?.url || 'default-thumbnail.jpg'}
              alt=""
            />
            <div className="vid-info">
              <h4>{item.snippet?.title || "Unknown Title"}</h4>
              <p>{item.snippet?.channelTitle || "Unknown Channel"}</p>
              <p>{value_Converter(item.statistics?.viewCount || 0)} Views</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading recommended videos...</p>
      )}
    </div>
  );
};

export default Recommended;
