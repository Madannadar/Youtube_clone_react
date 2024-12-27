import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Search from './Pages/Search/Search'

const App = () => {

  const [sidebar, setSidebar] = useState(true);

  return (
  <div>
    <Navbar setSidebar={setSidebar}/>
    <Routes>
      <Route path='/' element={<Home sidebar={sidebar} />} />
      <Route path='/video/:categoryId/:videoId' element={<Video/>} />
      <Route path='/search/video/:categoryId/:videoId' element={<Video/>} />
      <Route path='/search' element={<Search  sidebar={sidebar} />} /> 
    </Routes>
  </div>
  )
}

export default App