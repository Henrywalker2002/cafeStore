import "./cartheader.css"

function CartItemHeader(props) {
    return (
        <thead>
            <tr>
                <th colSpan="2" className="text-center">Sản phẩm</th>
                <th className="text-center">Đơn giá</th>
                <th className="text-center">Số lượng</th>
                <th className="text-right">Tổng giá</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default CartItemHeader;