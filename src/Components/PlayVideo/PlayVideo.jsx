import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { useParams } from "react-router-dom";
import { API_KEY, value_Converter } from "../../data";
import moment from "moment";

const PlayVideo = () => {
  const { videoId } = useParams();

  const handleShare = () => {
    const currentUrl = window.location.href; // Get the current URL
    navigator.clipboard
      .writeText(currentUrl) // Copy the URL to the clipboard
      .then(() => {
        alert("Link copied to clipboard!"); // Show feedback
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Handle errors
      });
  };

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const data = await response.json();
      setApiData(data.items ? data.items[0] : null);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData || !apiData.snippet) return; // Avoid running if apiData is not ready
    try {
      const channelDetailsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelDetailsUrl);
      const channelData = await channelResponse.json();
      setChannelData(channelData.items ? channelData.items[0] : null);

      const commentListUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(commentListUrl);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items || []);
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData?.snippet?.title || "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData?.statistics?.viewCount
            ? value_Converter(apiData.statistics.viewCount)
            : "0"}{" "}
          views &bull;{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData?.statistics?.likeCount
              ? value_Converter(apiData.statistics.likeCount)
              : "0"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span onClick={handleShare}>
            <img src={share} alt="Share" /> Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || ""}
          alt=""
        />
        <div>
          <p>{channelData?.snippet?.title || "Channel Name"}</p>
          <span>
            {channelData?.statistics?.subscriberCount
              ? value_Converter(channelData.statistics.subscriberCount)
              : "0"}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData?.snippet?.description
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData?.statistics?.commentCount
            ? value_Converter(apiData.statistics.commentCount)
            : "0"}
        </h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comments">
              <img
                src={
                  item.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span> 2 days ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_Converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
