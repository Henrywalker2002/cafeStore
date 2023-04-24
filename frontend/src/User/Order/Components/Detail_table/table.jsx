import './table.css'
import DetailTableRow from './tablerow';

function DetailTable(props) {
    var contact = String(props.email) + " / " + String(props.phone)
    return (
        <table className="detail-table">
            <tbody>
                <DetailTableRow user="USERNAME" value={props.username}/>
                <DetailTableRow user="EMAIL / NUMBER PHONE" value={contact}/>
                <DetailTableRow user="ORDER DATE" value={props.date}/>
                <DetailTableRow user="DELIVERY ADDRESS" value={props.address}/>
                <DetailTableRow user="STATUS" value={props.status}/>
                {props.star ? <DetailTableRow user="STAR" value={props.star}/> : null}
                {props.feedback ? <DetailTableRow user="FEEDBACK" value={props.feedback}/> : null}
            </tbody>
        </table>    
    );
}

export default DetailTable;