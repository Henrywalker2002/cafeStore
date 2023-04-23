import './index.css'
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from './Footer/footer';
import { Dialog } from '@mui/material';

function Home(props) {
    

    return (
        <div className='homepage'>
            <Header />
            <div className='head-content'>
                <h1>Enjoy your coffee before your activity.</h1>
                <p>Boost your productivity and build your mood with a glass of coffee in the morning.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Home;