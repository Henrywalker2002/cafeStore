import './table.css'
import SummaryTableRow from './tablerow'
import { useEffect, useState } from "react"

function SummaryTable(props) {
    const [listdrink, setListdrink] = useState([{"name":null,"number":0}]);

    useEffect(() => {
        if (props.drink === undefined) {
            setListdrink([{"name":null,"number":0}])
        }
        else {
            setListdrink(props.drink)
        }
    }, [props.drink])
    
    var trls = Array.from(listdrink).map((element, index) => {
        return <SummaryTableRow product={String(element.name) + " x " + String(element.number)} total={0} key={index}/>
    })

    return (
        <table className="summary-table">
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {trls}
                <SummaryTableRow product="SUBTOTAL" total={props.subtotal}/>
                <SummaryTableRow product="SHIPPING" total={props.shipping}/>
                <SummaryTableRow product="TOTAL" total={props.total}/>
            </tbody>
        </table>
    );
}

export default SummaryTable;