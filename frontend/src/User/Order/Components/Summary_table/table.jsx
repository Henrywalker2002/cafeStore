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
        return <SummaryTableRow product={String(element.name)} total={"x" + String(element.number)} key={index}/>
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
                <SummaryTableRow product="SUBTOTAL" total={String(props.subtotal) + "VND"}/>
                <SummaryTableRow product="SHIPPING" total={String(props.shipping) + "VND"}/>
                <SummaryTableRow product="TOTAL" total={String(props.total) + "VND"}/>
            </tbody>
        </table>
    );
}

export default SummaryTable;