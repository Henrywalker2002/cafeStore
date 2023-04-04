import "./order.css";
import Header from "../Components/Header/Header";
import Title from '../Components/Title/Title'
import SummaryTable from './Components/Summary_table/table'
import DetailTable from './Components/Detail_table/table'
import MyFeedback from "./Components/Feedback/feedback";

function Order(props) {
    return (
        <div className="order">
            <Header />
            <Title title="My order: 123456789"/>
            <div className="order-content">
                <div className="order-detail">
                    <h2>Order Details</h2>
                    <DetailTable />
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <SummaryTable />
                </div>
                <MyFeedback />
            </div>
        </div>
    );
}

export default Order;