import "./footer.css"
import { useEffect, useState } from "react"

function Footer(props) {
    const [infor, setInfor] = useState({});
    
    useEffect(() => {
        async function getData() { 
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch("http://103.77.173.109:9000/index.php/infor", requestOptions);
            const response = await res.json()
            setInfor(response.message)
        }

        getData()
    } , [])

    return (
        <footer className="footer">
            <p>{infor.banner}</p>
            <div className="left-content-footer">
                <label>Các chi nhánh:</label>
                <ul>
                    <li><label>Address :</label>{infor.address}</li>
                    <li><label>Time open :</label>{infor.timeOpen} - {infor.timeClose}</li>
                </ul>
            </div>
            <div className="right-content-footer">
                <label>Contact us:</label>
                <ul>
                    <li><label>Phone :</label>{infor.phone}</li>
                    <li><label>Email :</label>{infor.email}</li>
                    <li><a href="https://facebook.com">Facebook</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;