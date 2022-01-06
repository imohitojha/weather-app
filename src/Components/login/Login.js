import React from 'react'
import {useState} from "react";
import authentication from "../../service/auth";
import {useHistory} from "react-router-dom";
import "./Login.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Function for setting Alert look
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Definition of the Login Component
export default function Login(props) {

    // History Object
    let history = useHistory();

    // Usestates for input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Usestates for filling Snackbar parameters
    const [msg, setMsg] = useState('');
    const [severity, setseverity] = useState('');
    const [open, setOpen] = useState(false);
    
    // Usestates for Email conditons
    const [email_condition_1, setEmail_condition_1] = useState(false);
    const [email_condition_2, setEmail_condition_2] = useState(false);
    const [email_condition_3, setEmail_condition_3] = useState(false);
    const [email_condition_4, setEmail_condition_4] = useState(false);

    // Usestates for Password conditons
    const [password_condition_1, setPassword_condition_1] = useState(false);
    const [password_condition_2, setPassword_condition_2] = useState(false);
    const [password_condition_3, setPassword_condition_3] = useState(false);

    //function for checking every field validation after clicking Login Button
    function checking(e) {

        // To Stop reloading of page due to button trigger
        e.preventDefault();

        // Condition for Empty Fields
        if (email.trim() === '' && password.trim() === '') {
            setMsg("Empty Fields detected");
            setseverity("error");
            setOpen(true);
        }
        // Condition for invalid Email Credentials
        else if (email_condition_1 === false || email_condition_2 === false || email_condition_3 === false || email_condition_4 === false) {
            setMsg("Invalid Email Entered");
            setseverity("error");
            setOpen(true);
        }

        // Condition for invalid Password Credentials
        else if (password_condition_1 === false || password_condition_2 === false || password_condition_3 === false) {
            setMsg("Invalid Password Entered");
            setseverity("error");
            setOpen(true);
        }

        // Condition for Empty Fields
        else if (email.trim() === '' || password.trim() === '') {
            setMsg("Empty Fields detected");
            setseverity("error");
            setOpen(true);
        }

        // Successful validation
        else
            Login();
    }

    // Function for Email Validation Checking
    function emailcheck(value) {

        setEmail(value);
        
        if ((/^[a-z0-9]/.test(value)))
            setEmail_condition_1(true);
        else
            setEmail_condition_1(false);

        if (/^[a-z0-9.]+@[a-z]/.test(value) && !value.includes('.@'))
            setEmail_condition_2(true);
        else
            setEmail_condition_2(false);

        if (value.length > 7)
            setEmail_condition_3(true);
        else
            setEmail_condition_3(false);

        if (value.substr(value.indexOf('@')).includes('.') && !value.includes('.@') && !value.includes('@.') && !value.startsWith('.') && !value.endsWith('.') && !value.includes('..') && value.includes('.'))
            setEmail_condition_4(true);
        else
            setEmail_condition_4(false);
    }

    // Function for Password Validation Checking
    function passwordcheck(value) {
        setPassword(value);
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))
            setPassword_condition_1(true);
        else
            setPassword_condition_1(false);

        if ((/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) && !value.includes(' '))
            setPassword_condition_2(true);
        else
            setPassword_condition_2(false);

        if (value.length > 7 && value.length < 14)
            setPassword_condition_3(true);
        else
            setPassword_condition_3(false);
    }

    // Function for performing Login
    async function Login() {

        // Checking for Authorization
        await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(async data => {

                // Authorization Successful 
                if (data.status === 200) {

                    // Set email, name and token in localStorage for further use
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', data.userData.firstname);
                    localStorage.setItem('token', data.access_token);
                    await authentication.Login();

                    // Autheticating user
                    if (authentication.isLoggedInfun()) {
                        // If Autheticating setting property "loginHandler" true and changes the Header and Redirect to Search page
                        props.loginHandler(true);
                        history.push('/search');
                    }
                }

                // Login Failed
                else {
                    setMsg(data.message);
                    setseverity("error");
                    setOpen(true);
                }
            });
    }

    // Function for closing of the SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
<div className="main-login">
        <div className="card pt-2 mx-auto" id="logindiv" style={{ marginTop: "130px", borderRadius: "15px" }}>

            {/* Login Logo */}
            <img className="mx-auto d-block" src="/images/login.svg" style={{ width: "40%", height: "40%" }} alt="register logo"></img>

            {/* Heading */}
            <h2 data-cy="logintitle" data-testid="login-heading" className="text-center text-body pt-1 pb-1"><b>Login</b></h2>
            
            {/* Login Form */}
            <form>

                {/* Input for Email */}
                <div className="input-group input-group-lg  mx-auto mb-3">
                    <input data-cy="loginemail" type="text" onChange={(e) => emailcheck(e.target.value)} className="form-control rounded-pill login-in" placeholder="Email"/>
                </div>

                {/* Input for Password*/}
                <div className="input-group input-group-lg mx-auto mb-3" >
                    <input data-cy="loginpass" type="password" onChange={(e) => passwordcheck(e.target.value)} className="form-control rounded-pill login-in" placeholder="Password"/>
                </div>
                </form>

                {/* Login Button */}
                <button data-cy="login-login-btn" data-testid="btnLogin1" className="d-block input-group-lg mx-auto btn btn-success rounded-pill w-50 mb-3 login-in" onClick={checking}>Login</button>

                {/* Register Button */}
                <button data-cy="login-register-btn" data-testid="btnLogin2" className="d-block input-group-lg btn btn-success mx-auto w-50 rounded-pill mb-3  login-in" onClick={() => { history.push('/register') }}>Register</button>
            </div>
                
            {/* SnackBar */}
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}