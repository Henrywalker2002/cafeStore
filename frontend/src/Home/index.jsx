import './index.css'
import Header from "../Components/Header/Header";
import Footer from './Footer/footer';
import { Dialog } from '@mui/material';
import coffee from './coffee.png'

function Home(props) {

    return (
        <div className='homepage'>
            <Header />
            <div className='head-content'>
                <div className='left-content-header'>
                    <h1>Enjoy your coffee before your activity.</h1>
                    <p>Boost your productivity and build your mood with a glass of coffee in the morning.</p>
                    <a href='/client/login'>Log in</a>
                </div>
                <div className='right-content-header'>
                    <img src={coffee} alt="coffee"></img>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;