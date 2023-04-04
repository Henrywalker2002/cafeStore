import './table.css'
import DetailTableRow from './tablerow';

function DetailTable(props) {
    return (
        <table className="detail-table">
            <tbody>
                <DetailTableRow user="USERNAME" value="JOHN DAVID"/>
                <DetailTableRow user="EMAIL / NUMBER PHONE" value="Vitathemes@gmail.com"/>
                <DetailTableRow user="ORDER DATE" value="October 8,2020"/>
                <DetailTableRow user="DELIVERY ADDRESS" value="Kristian holst 34 old street W1F 7NU london United Kingdom"/>
                <DetailTableRow user="STATUS" value="Processing"/>
            </tbody>
        </table>
    );
}

export default DetailTable;