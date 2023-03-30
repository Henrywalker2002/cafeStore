import React from 'react'
import {FaClipboardList} from 'react-icons/fa'
import './Title.css'

function Title() {
  return (
    <div className="title">
        <FaClipboardList className='order-list-icon'/>
        <h1 className='order-list-title'>Order List</h1>
    </div>
  )
}

export default Title