import React from 'react'
import './Search.css'
import {FiSearch} from 'react-icons/fi'

function Search() {
  return (
    <div className="search">
          <input type="text" placeholder='Search' className='search-list-box' />
          <button className='search-btn'><FiSearch /></button>
          <button className='add-btn'>
            + Add Item
          </button>
    </div>
  )
}

export default Search