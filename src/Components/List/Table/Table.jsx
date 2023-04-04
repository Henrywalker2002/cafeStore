import React from 'react'
import { orderList } from '../../../Staff/orderlistData'
import TableRow from './TableRow'
import './Table.css'

function Table() {
  return (
    <table className='order-list'>
        <thead className='order-list-thead'>
          <tr>
            <th className='order-list-th'>ORDER NUMBER</th>
            <th className='order-list-th'>DATE</th>
            <th className='order-list-th'>STATUS</th>
            <th className='order-list-th'>TOTAL</th>
            <th className='order-list-th'>ACTION</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {orderList.map((orderInfo) =>(
          <TableRow orderInfo = {orderInfo}/>
        ))}
    </table>
  )
}

export default Table