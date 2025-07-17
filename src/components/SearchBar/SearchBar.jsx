import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, widthClass }) => {
  return (
    <div className={`flex items-center px-4 rounded-md bg-slate-100 ${widthClass || 'w-80'}`}>
      <input 
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Tags..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      {value && (
        <IoMdClose
          className='mr-3 text-xl cursor-pointer text-slate-500 hover:text-black'
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className='cursor-pointer text-slate-400 hover:text-black'
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar
