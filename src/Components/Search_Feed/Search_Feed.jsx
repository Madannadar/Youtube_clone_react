import React, { useEffect, useState } from 'react'
import './Search_Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_Converter } from '../../data'
import moment from 'moment'

const Search_Feed = ({category}) => {

    const [data,setData] = useState([]);

    const fetchData = async () => {
        const videList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videList_url).then(response=>response.json()).then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData();
    },[category])

  return (
    <div className="feed">
        {data.map((item, index) => {
            return(
            <Link to={`Video/${item.snippet.categoryId}/${item.id}`} className='card'>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_Converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p> 
            {/* moment is the package  we insatlled that converts date from now we have mensioned*/}
        </Link>
            )
        })}
        
    </div>
    
  )
}

export default Search_Feed