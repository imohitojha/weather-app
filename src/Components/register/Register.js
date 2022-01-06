import React, { useState } from 'react';
import './Register.css';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

//Function for Alert
function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props}
    />;
}

// Definition of the Register Component
export default function Register() {

    // History Object
    let history = useHistory();

    // Usestates for input fields
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Usestates for filling Snackbar parameters
    const [msg, setMsg] = useState('');
    const [severity, setseverity] = useState('');
    const [open, setOpen] = useState(false);

    // Usestates for displaying email help and password help
    const [emailhelp, setEmailhelp] = useState("none");
    const [passwordhelp, setPasswordhelp] = useState("none");

    // Usestates for Email conditons text colour display
    const [email_condition_1, setEmail_condition_1] = useState("red");
    const [email_condition_2, setEmail_condition_2] = useState("red");
    const [email_condition_3, setEmail_condition_3] = useState("red");
    const [email_condition_4, setEmail_condition_4] = useState("red");

    // Usestates for Password conditons text colour display
    const [password_condition_1, setPassword_condition_1] = useState("red");
    const [password_condition_2, setPassword_condition_2] = useState("red");
    const [password_condition_3, setPassword_condition_3] = useState("red");

    //function for checking every field validation after clicking SignUp Button
    function checking(e) {

        // To Stop reloading of page due to button trigger
        e.preventDefault();

        // Condition for Empty Fields
        if (firstname.trim() === '' && lastname.trim() === '' && city.trim() === '' && age === 0 && email.trim() === '' && password.trim() === '') {
            setMsg("Empty Fields detected");
            setseverity("error");
            setOpen(true);
        }
        // Condition for invalid First Name not in format (Abc)
        else if (/^[A-Z][a-z]/.test(firstname) !== true) {
            setMsg(`First Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed)`);
            setseverity("error");
            setOpen(true);
        }

        // Condition for invalid Last Name not in format (Abc)
        else if (/^[A-Z][a-z]/.test(lastname) !== true) {
            setMsg(`Last Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed)`);
            setseverity("error");
            setOpen(true);
        }

        // Condition for valid City Name not in format (Abc)
        else if (/^[A-Z][a-z]/.test(city) !== true) {
            setMsg(`City Name should have only first letter Capital and remaining letters in lowercase (Only Alphabets allowed)`);
            setseverity("error");
            setOpen(true);
        }

        // Condition for invalid Age (Less than or equal than 13)
        else if (age <= 13) {
            setMsg("Age should be greater than 13");
            setseverity("error");
            setOpen(true);
        }

        // Condition for invalid Email format
        else if (email_condition_1 === "red" || email_condition_2 === "red" || email_condition_3 === "red" || email_condition_4 === "red") {
            setMsg("Invalid Email Format");
            setseverity("error");
            setOpen(true);
            setEmailhelp("block");
            setPasswordhelp("none");
        }

        // Condition for invalid Password format
        else if (password_condition_1 === "red" || password_condition_2 === "red" || password_condition_3 === "red") {
            setMsg("Invalid Password Format");
            setseverity("error");
            setOpen(true);
            setEmailhelp("none");
            setPasswordhelp("block");
        }
        // Condition for Empty Fields
        else if (firstname.trim() === '' || lastname.trim() === '' || city.trim() === '' || age === 0 || email.trim() === '' || password.trim() === '') {
            setMsg("Empty Fields detected");
            setseverity("error");
            setOpen(true);
        }
        // Successful validation
        else
            signUp();
    }

    // Function for Email Validation Checking
    function emailcheck(value) {

        setEmail(value);

        if ((/^[a-z0-9]/.test(value)))
            setEmail_condition_1("green");
        else
            setEmail_condition_1("red");

        if (/[a-z0-9.]+@[a-z]/.test(value) && !value.includes('.@'))
            setEmail_condition_2("green");
        else
            setEmail_condition_2("red");

        if (value.length > 7)
            setEmail_condition_3("green");
        else
            setEmail_condition_3("red");

        if (value.substr(value.indexOf('@')).includes('.') && !value.includes('.@') && !value.includes('@.') && !value.startsWith('.') && !value.endsWith('.') && !value.includes('..') && value.includes('.'))
            setEmail_condition_4("green");
        else
            setEmail_condition_4("red");
    }

    // Function for Password Validation Checking
    function passwordcheck(value) {
        setPassword(value);
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))
            setPassword_condition_1("green");
        else
            setPassword_condition_1("red");

        if ((/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) && !value.includes(' '))
            setPassword_condition_2("green");
        else
            setPassword_condition_2("red");

        if (value.length > 7 && value.length < 14)
            setPassword_condition_3("green");
        else
            setPassword_condition_3("red");
    }

    // Function for performing Signup
    async function signUp() {
        await fetch('http://localhost:9000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, city, age, email, password })
        }).then(res => res.json())
            .then(async data => {

                // Registration Successful
                if (data.status === 200) {

                    // After that redirected to Login Page
                    history.push('/login');
                } 

                // Registration Failed
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
        <div className="main-register">
        <div className="d-md-flex align-items-center card pt-2 mx-auto p-3 register-container">

            {/* Register Logo */}
            <img className="mx-auto d-block" src="/images/register.svg" style={{ width: "40%", height: "40%" }} alt="register logo" />

            {/* Heading */}
            <h2 data-cy="reg-heading" className="text-center text-body pt-1" data-testid="register-heading"><b>Register</b></h2>

            {/* Register Form */}
            <form>
                <div className="input-group mb-2 gap-2">

                    {/* Input for First Name */}
                    <input data-cy="register-first-name" type="text" onFocus={(e) => { setEmailhelp("none"); setPasswordhelp("none"); }} onChange={(e) => setFirstname(e.target.value)} className="form-control rounded-pill" placeholder="First Name" />

                    {/* Input for Last Name */}
                    <input data-cy="register-last-name" type="text" onFocus={(e) => { setEmailhelp("none"); setPasswordhelp("none"); }} onChange={(e) => setLastname(e.target.value)} className="form-control rounded-pill " placeholder="Last Name" />
                </div>

                {/* Input for City */}
                <div className="input-group mb-2">
                    <input data-cy="register-city-name" type="text" onFocus={(e) => { setEmailhelp("none"); setPasswordhelp("none"); }} onChange={(e) => setCity(e.target.value)} className="form-control rounded-pill " placeholder="City" />
                </div>

                {/* Input for Age */}
                <div className="input-group mb-2">
                    <input data-cy="register-age" type="number" onFocus={(e) => { setEmailhelp("none"); setPasswordhelp("none"); }} onChange={(e) => setAge(e.target.value)} className="form-control rounded-pill " placeholder="Age" />
                </div>

                {/* Input for Email */}
                <div className="input-group mb-2">
                    <input data-cy="register-email" type="email" onFocus={(e) => { setEmailhelp("block"); setPasswordhelp("none"); }} onChange={(e) => emailcheck(e.target.value)} className="form-control rounded-pill" placeholder="Email" />
                </div>

                {/* Email  Conditions Block */}
                <div className="card mb-3 font-monospace" style={{ "display": emailhelp }}>
                    <ul className="mb-0 conditons-register">
                        <li style={{ "color": email_condition_1 }}> Email should start with at least lowercase alphabet and 1 digit</li>
                        <li style={{ "color": email_condition_2 }}> Email should contain @ in between only and should not start or end with @ </li>
                        <li style={{ "color": email_condition_3 }}> Email should have at least length 8 </li>
                        <li style={{ "color": email_condition_4 }}> Email should not start or end with period(.) but should contain at least one. </li>
                    </ul>
                </div>

                {/* Input for Password */}
                <div className="input-group mb-2">
                    <input data-cy="register-password" type="password" onFocus={(e) => { setEmailhelp("none"); setPasswordhelp("block"); }} onChange={(e) => passwordcheck(e.target.value)} className="form-control rounded-pill" placeholder="Password" />
                </div>

                {/* Password Conditions Block */}
                <div className="card mb-3 font-monospace" style={{ "display": passwordhelp }}>
                    <ul className="mb-0 conditons-register">
                        <li style={{ "color": password_condition_1 }}> Password should contain at least 1 uppercase, lowercase alphabet and 1 digit </li>
                        <li style={{ "color": password_condition_2 }}> Password should contain at least 1 special character except whitespace(' ') </li>
                        <li style={{ "color": password_condition_3 }}> Password should have between length 8 to 13 </li>
                    </ul>
                </div>

            </form> 
            
            {/* SignUp Button */}
            <button data-cy="signup-btn" data-testid="Regbtn" className="btn btn-success rounded-pill mx-auto w-50 mb-1" onClick={checking} style={{ borderRadius: '20px' }}>Sign Up</button>
            </div>
            {/* SnackBar */}
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={handleClose}> 
                <Alert onClose={handleClose} severity={severity}> {msg} </Alert> 
            </Snackbar>
        </div>
    )
}