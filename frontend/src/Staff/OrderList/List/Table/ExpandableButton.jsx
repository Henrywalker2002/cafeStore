import React from 'react'

function ExpandableButton({isOpen, toggle}) {
    
  return (
    <div className='button' onClick={toggle}>
        <span class="material-symbols-outlined" style={{
            transform: `rotate(${isOpen ? 0 : -90}deg)`,
            transition: "all 0.25s"
        }}>expand_more</span>
    </div>
  )
}

export default ExpandableButton