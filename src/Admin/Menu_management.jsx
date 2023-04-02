import React from 'react'
import Header from '../Components/Header/Header'
import Title from '../Components/Title/Title'
import {MdRestaurantMenu} from 'react-icons/md'
import Search from '../Components/Search/Search'

function Menu_management() {
  return (
    <div>
        <Header/>
        <Title title = 'Menu' icon={<MdRestaurantMenu className='title-icon'/>}/>
        <Search/>
    </div>
  )
}

export default Menu_management