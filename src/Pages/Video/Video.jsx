import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {
  const isSearchPage = location.pathname.startsWith("/search");
  console.log("isSearchPage",isSearchPage);
  
  const {videoId, categoryId} = useParams();  
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}/>
      {/* {!isSearchPage && <div className="recommended-section">
        <Recommended categoryId={categoryId}/>
      </div>} */}
    </div>
  )
}

export default Video