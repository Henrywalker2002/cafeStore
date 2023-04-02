import React from 'react'
import StateNav from '../Components/List/StateNav'
import Table from '../Components/List/Table/Table'
import Header from '../Components/Header/Header'
import Title from '../Components/Title/Title'
import {FaClipboardList} from 'react-icons/fa'

function OrderList() {
  return (
    <div>
        <Header/>
        <Title title = 'Order List' icon={<FaClipboardList className='title-icon'/>}/>
        <StateNav/>
        <Table/>
    </div>
  )
}

export default OrderList