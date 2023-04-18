import "./order.css";
import Header from "../Components/Header/Header";
import Title from '../Components/Title/Title'
import SummaryTable from './Components/Summary_table/table'
import DetailTable from './Components/Detail_table/table'
import MyFeedback from "./Components/Feedback/feedback";
import { useEffect, useState } from "react"

function Order(props) {
    const [listElement, setListElement] = useState([{}]);
    const [element, setElement] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const queryParams = new URLSearchParams(window.location.search)
    
    var id = queryParams.get("id")
    var username = queryParams.get("username")
    var staffUsername = queryParams.get("staffUsername")

    useEffect(() => {
        async function getData() {
            var url = "http://103.77.173.109:9000/index.php/order?"
            if (id) {url += "id=" + String(id) + "&"}
            if (username) {url += "username=" + String(username) + "&"}
            if (staffUsername) {url += "staffUsername=" + String(staffUsername) + "&"}
            url.slice(0, url.length - 1)
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json()
            
            if (response.message.length > 1) {
                setListElement(response.message)
                setElement(listElement[0]) 
            }
            else {
                setElement(response.message)
            }        
        }
        getData()
    } , [listElement, element, id ,staffUsername, username])

    useEffect(() => {
        async function getUser() {
            var url = "http://103.77.173.109:9000/index.php/account?username=" + String(element.username)
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json()

            setUserInfo(response.message)        
        }
        getUser()
    } , [listElement, element, id ,staffUsername, username])

    var orderTitle = "My order: " + String(element.id)

    return (
        <div className="order">
            <Header />
            <Title title={orderTitle}/>
            <div className="order-content">
                <div className="order-detail">
                    <h2>Order Details</h2>
                    <DetailTable username={element.username} email={userInfo.email} phone={userInfo.phone} date={element.timeStart} address={element.address} status={element.statement}/>
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <SummaryTable drink={element.drink} subtotal={element.fee} shipping={element.transportFee} total={element.totalFee}/>
                </div>
                <MyFeedback feedback={element.feedback} star={element.star}/>
            </div>
        </div>
    );
}

export default Order;