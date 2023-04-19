import './login.css'
import logo from './Logo.png'
import { useState } from "react"
import Header from "../../Components/Header/Header";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    
    // User Login info
    const handleChangeUser = event => {
        setUsername(event.target.value);
    }

    const handleChangePass = event => {
        setPassword(event.target.value);
    }
    
    // Submit
    async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();
        var raw = JSON.stringify({
            "username": username,
            "password": password,
        });

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/login", requestOptions);
        const json = await res.json()
        if (json.result === "success") {
            console.log("success")
        }
        else {
            setErrorMessages(json.message)
        }
    };

    // Generate JSX code for error message
    var renderErrorMessage = <div></div>
    if (errorMessages !== "") {
        renderErrorMessage = <div className='errormessage'>{errorMessages}</div>
    }

    return (
        <div>
            <Header />
            <div className='login'>
                <h2>Login</h2>
                <img src={logo} alt="logo"></img>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" className='username' required placeholder="Username" onChange={handleChangeUser}></input>
                    <input type="text" name="password" className='username' required placeholder="Password" onChange={handleChangePass}></input>
                    <button type="submit" className="username button-container">Log In</button>
                    {renderErrorMessage}
                </form>
                <div>
                    <a href='/client/signup' className='new-member'>New member?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;