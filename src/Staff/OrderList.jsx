import React from 'react'
import StateNav from '../Components/List/StateNav'
import Table from '../Components/List/Table/Table'
import Header from '../Components/Header/Header'
import Title from '../Components/Title/Title'

function OrderList() {
  return (
    <div>
        <Header/>
        <Title title="Order List"/>
        <StateNav/>
        <Table/>
    </div>
  )
}

export default OrderList