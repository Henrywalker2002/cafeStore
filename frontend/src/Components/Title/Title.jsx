import React from 'react'
import './Title.css'

function Title({title, icon}) {
  return (
    <div className="title">
        {icon}
        <h1 className='content-title'>{title}</h1>
    </div>
  )
}

export default Title