function SummaryTableRow(props) {
    return (
        <tr>
            <td>{props.product}</td>
            <td>{props.total}VND</td>
        </tr>
    );
}

export default SummaryTableRow;