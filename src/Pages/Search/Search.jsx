import React ,{useState} from 'react'
import "./search.css"
import Search_Feed from '../../Components/Search_Feed/Search_Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'
const Search = ({sidebar}) => {
  
    const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/> 
      <div className={`container ${sidebar?"":'large-container'}`}>
        <Search_Feed category={category} />
      </div>
    </>
  )
}

export default Search