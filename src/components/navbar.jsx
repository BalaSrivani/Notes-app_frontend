import React, { useState } from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar';

const Navbar = ( {userInfo,onSearch,handleClearSearch} ) => {
  const [searchQuery, setsearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear()
    navigate('/');
  }
  const handleSearch=()=>{
    if(searchQuery){
      onSearch(searchQuery)
    }
  }
  const onClearSearch=()=>{
    setsearchQuery("");
    handleClearSearch();
  }
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white drop-shadow">
        <h2 className="py-2 text-xl font-medium text-black">Notes</h2>
      <SearchBar value={searchQuery} 
          onChange={({target})=>{
              setsearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          widthClass="w-[32rem]"
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar
