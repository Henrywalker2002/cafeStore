function SummaryTableRow(props) {
    return (
        <tr>
            <td>{props.product}</td>
            <td>{props.total}</td>
        </tr>
    );
}

export default SummaryTableRow;