function DetailTableRow(props) {
    return (
        <tr>
            <td>{props.user}</td>
            <td>{props.value}</td>
        </tr>
    );
}

export default DetailTableRow;