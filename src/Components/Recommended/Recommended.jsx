import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_Converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const Recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=44&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(Recommended_url).then(res => res.json()).then(data =>setApiData(data.items));
    }

    useEffect(()=>{
        fetchData();
    },[]) // [] the function will be called when it is called for the first time

  return (
    <div className='recommended'>
        {apiData.map((item, index) => {
            return(
            <Link to= {`/video/${item.snippet.categoryId}/${item.id}`}key={index} className="side-video-list">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{value_Converter(item.statistics.viewCount)} Views</p>
                </div>
            </Link>
            )
        })}
            {/* <div className="side-video-list">
                <img src={thumbnail1} alt="" />
                <div className="vid-info">
                    <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quaerat!</h4>
                    <p>Arun kumar Gaming</p>
                    <p>1M Views</p>
                </div>
            </div> */}
        
    </div>
  )
}

export default Recommended