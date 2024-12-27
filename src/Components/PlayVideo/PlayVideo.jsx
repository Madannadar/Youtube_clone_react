import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { useParams, useSearchParams } from 'react-router-dom'
import { API_KEY, value_Converter } from '../../data'
import moment from 'moment'

const PlayVideo = ({}) => {
    const {videoId} = useParams();
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


    const fetchVideoData = async() => {
        // fetching the data of the video playing
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
        await fetch(videoDetails_url).then(res =>res.json()).then(data => setApiData(data.items[0]))
    }

    const fetchOtherData = async() => {
        // fetching channel data
        const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} `;
        await fetch(channelDetails_url).then(res =>res.json()).then(data => setChannelData(data.items[0]))

        // fetching comment data 
        const commentList_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY} `;
        await fetch(commentList_url).then(res =>res.json()).then(data => setCommentData(data.items))
    }

    useEffect(() => {
        fetchVideoData();
    },[videoId])

    useEffect(() => {
        fetchOtherData();
    },[apiData])


  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  // embedded code of youtube video
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        ></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_Converter(apiData.statistics.viewCount):"16k"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""} </p> 
            {/* &bull; is for dot  */}
            <div>
                <span><img src={like}alt="" />{apiData?value_Converter(apiData.statistics.likeCount):"0"}</span>
                <span><img src={dislike}alt="" /></span>
                <span onClick={handleShare}>
                    <img src={share} alt="Share" /> Share
                </span>
                <span><img src={save}alt="" />Save</span>
            </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:""}</p>
                    <span>{channelData?value_Converter(channelData.statistics.subscriberCount):"11"}</span>
                </div>
                <button>Subscriber</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
                <hr />
                <h4>{apiData?value_Converter(apiData.statistics.commentCount):100}</h4>
                {commentData.map((item, index) => {
                    return(
                        <div key={index} className="comments">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>2 day ago</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{value_Converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                    })}
            </div>
    </div>
  )
}

export default PlayVideo