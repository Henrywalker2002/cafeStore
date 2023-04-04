import './table.css'
import SummaryTableRow from './tablerow'

function SummaryTable(props) {
    return (
        <table className="summary-table">
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                <SummaryTableRow product="Double Shoot Iced Shaken Espresso" total="20$"/>
                <SummaryTableRow product="Double Shoot Iced Shaken Espresso" total="20$"/>
                <SummaryTableRow product="Double Shoot Iced Shaken Espresso" total="20$"/>
                <SummaryTableRow product="SUBTOTAL" total="85$"/>
                <SummaryTableRow product="SHIPPING" total="10$"/>
                <SummaryTableRow product="TOTAL" total="80$"/>
            </tbody>
        </table>
    );
}

export default SummaryTable;