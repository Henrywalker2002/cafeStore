import './index.css'
import Header from "../Components/Header/Header";
import Footer from './Footer/footer';
import { Dialog } from '@mui/material';
import { useEffect, useState } from "react"
import coffee from './coffee.png'
import choseCoffee from './chose_coffee.png'
import truck from './truck.png'
import taste from './taste.png'
import { AiOutlineClockCircle } from "react-icons/ai";

function Home(props) {
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
        <div className='homepage'>
            <Header />
            <div className='head-content'>
                <div className='left-content-header'>
                    <h1>Enjoy your <span className='coffee-span'>coffee</span> before your activity.</h1><br/>
                    <p>Boost your productivity and build your mood with a glass of coffee in the morning.</p><br/>
                    <a href='/client/login'>Order now</a>
                    <AiOutlineClockCircle className='clock-icon' />
                    <span className='time-open'>{infor.timeOpen} - {infor.timeClose}</span>
                </div>
                <div className='right-content-header'>
                    <img src={coffee} alt="coffee"></img>
                </div>
            </div>
            <div className='instruc-delivey'>
                <h2>How to use delivery service</h2>
                <div className='icon-delivery'>
                    <img src={choseCoffee} alt='chose_coffee'></img>
                    <h4>choose your coffee</h4>
                    <p>there are 20+ coffees for you</p>
                </div>
                <div className='icon-delivery'>
                    <img src={truck} alt='delivery'></img>
                    <h4>we delivery it to you</h4>
                    <p>Choose delivery service</p>
                </div>
                <div className='icon-delivery'>
                    <img src={taste} alt='taste coffee'></img>
                    <h4>Enjoy your coffee</h4>
                    <p>Choose delivery service</p>
                </div>
            </div>
            <div className='footer-content'>

            </div>
        </div>
    );
}

export default Home;