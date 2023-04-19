import './signup.css'
import title from './signup_logo.png'
import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header";
import Table from 'react-bootstrap/Table';

function Signup(props) {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const [renderErrorMessage, setRenderErrorMessage] = useState(<div></div>);
    
    // User Login info
    const handleChangeUser = event => {
        setUsername(event.target.value);
    }

    const handleChangeFull = event => {
        setFullname(event.target.value);
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const handleChangePhone = event => {
        setPhone(event.target.value);
    }

    const handleChangeBirthday = event => {
        setBirthday(event.target.value);
    }

    const handleChangeAddress = event => {
        setAddress(event.target.value);
    }

    const handleChangePass = event => {
        setPassword(event.target.value);
    }

    const handleChangeConfirm = event => {
        if (password !== event.target.value) {
            setErrorMessages("Confirm password doesn't match. Please try again!!!")
        }
        else {
            setErrorMessages("")
        }
    }

    //var renderErrorMessage = <div></div>

    async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();
        var raw = JSON.stringify({
            "username": username,
            "password": password,
            "email" : email,
            "phone" : phone,
            "birthday" : birthday,
            "name" : fullname,
            "address" : address
        });

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        console.log(raw)
        const res = await fetch("http://103.77.173.109:9000/index.php/user", requestOptions);
        const json = await res.json()
        if (json.result === "success") {
            setErrorMessages("")
            console.log("success")
        }
        else {
            setErrorMessages(json.message)
        }
    };

    useEffect(() => {
        if (errorMessages !== "") {
            setRenderErrorMessage(<div className='errormessage'>{errorMessages}</div>)
        }
        else {
            setRenderErrorMessage(<div></div>)
        }
    } , [errorMessages, setRenderErrorMessage])

    return (
        <div>
            <Header />
            <div className='signup' >
                <img src={title} alt="Sign Up"></img>
                <form onSubmit={handleSubmit}>
                    <Table className="signup-table" style={{textAlign: "left"}}>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Username</label><br/>
                                    <input type="text" id="username" name="username" required onChange={handleChangeUser}/>
                                </td>
                                <td>
                                    <label>Fullname</label><br/>
                                    <input type="text" id="fullname" name="fullname" required onChange={handleChangeFull}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email</label><br/>
                                    <input type="text" id="email" name="email" required placeholder="abc@gmail.com" onChange={handleChangeEmail}/>
                                </td>
                                <td>
                                    <label>Phone number</label><br/>
                                    <input type="text" id="phone" name="phone" required placeholder="0123456789" onChange={handleChangePhone}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Birthday</label><br/>
                                    <input type="text" id="birthdat" name="birthday" required placeholder="2000/01/01" onChange={handleChangeBirthday}/>
                                </td>
                                <td>
                                    <label>Address</label><br/>
                                    <input type="text" id="address" name="address" required onChange={handleChangeAddress}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Password</label><br/>
                                    <input type="password" id="password" name="password" required onChange={handleChangePass}/>
                                </td>
                                <td>
                                    <label>Confirm password</label><br/>
                                    <input type="password" id="confirm" name="confirm" required onChange={handleChangeConfirm}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <input type="submit" value="Sign Up" className='signup-button'/>
                    {renderErrorMessage}
                </form>
                <div>
                    <a href='/client/login' className='already-member'>Already have account?</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;