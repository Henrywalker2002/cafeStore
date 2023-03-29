import React from 'react'
import SubRow from './SubRow'
import ExpandableButton from './ExpandableButton'
import useOpenController from './useOpenController'
import './Table.css'
import './TableRow.css'
import {RiDeleteBin6Line} from 'react-icons/ri'

function TableRow({orderInfo}) {
    const {isOpen, toggle} = useOpenController(false);
  return (
    <tbody className='order-list-body'>
        <tr className='order-list-tr'>
            <td className='order-list-td'>{orderInfo.order_number}</td>
            <td className='order-list-td'>{orderInfo.date}</td>
            <td className='order-list-td'>{orderInfo.status}</td>
            <td className='order-list-td'>{orderInfo.total}</td>
            <td className='order-list-td'><button className='action-btn'>{orderInfo.action}</button></td>
            <td className='order-list-td'><RiDeleteBin6Line className='delete-btn'/></td>
            <td className='button-td'>
                <ExpandableButton isOpen={isOpen} toggle={toggle}/>
            </td>
        </tr>
        {isOpen && <SubRow order_number={orderInfo.order_number} />}
    </tbody>
  )
}

export default TableRow