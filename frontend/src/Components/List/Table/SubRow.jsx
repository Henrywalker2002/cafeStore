import { orderDetailList } from '../../../Staff/orderDetailList';
import './Table.css'
import './SubRow.css'

function SubRow({order_number}) {
  const orderDetail = orderDetailList.find(function(order){
    return order.order_number === order_number;
  })
  const List = orderDetail.list;
  return (
    <tr className='order-detail-tr'>
      <td className='order-detail-td'>{List[0].name}</td>
      <td className='order-detail-td'>{List[0].quantity}</td>
      <td className='order-detail-td'>{List[0].subtotal}</td>
    </tr>
  )
}

export default SubRow