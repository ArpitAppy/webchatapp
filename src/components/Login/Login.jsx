import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo-black.png';
import { APIS } from '../../utils/apis/endpoint';
import { setItemInLS } from '../../utils/helpers/localStorage';
import './Login.scss';

const LoginForm = () => {

    const history = useHistory();
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [loginDetails, setLoginDetails] = useReducer(reducer, {
        emailAddress: "",
        password: "",
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setLoginDetails({ [name] : value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(APIS._login, loginDetails)
        .then(res => {
            if (res && res.data && res.data.success){
                setItemInLS("token", res.data.data.token);
                history.replace('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }    

    return (
        <>
            <form className="form-main">
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="email"
                            name="emailAddress"
                            id="emailAddress"
                            placeholder="Email Address"
                            required
                            fullWidth
                            onChange={onChange}
                            label="Email"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="password"
                            name="password"
                            id="loginPassword"
                            placeholder="password"
                            label="Password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col flex flex-align-center flex-justify-center">
                        <Button onClick={onSubmit} variant="contained" color="primary">
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
};

const SignUpForm = () => {

    const history = useHistory();
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [userDetails, setUserDetails] = useReducer(reducer, {
        fullName: "",
        emailAddress: "",
        password: "",
        mobileNumber: ""
    });

    // const { fullName, emailAddress, password, mobileNumber } = userDetails;

    const onChange = (e) => {
        const {name, value} = e.target;
        setUserDetails({ [name] : value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(APIS._registration, userDetails)
        .then(res => {
            if (res && res.data && res.data.success){
                setItemInLS("token", res.data.data.token);
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <form className="form-main">
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            required
                            fullWidth
                            onChange={onChange}
                            label="Full Name"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="email"
                            name="emailAddress"
                            id="emailAddress"
                            placeholder="Email Address"
                            required
                            fullWidth
                            onChange={onChange}
                            label="Email"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="password"
                            name="password"
                            id="loginPassword"
                            placeholder="password"
                            label="Password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col">
                        <TextField
                            className="login-text-field"
                            type="number"
                            name="mobileNumber"
                            id="mobileNumber"
                            placeholder="Mobile Number"
                            required
                            fullWidth
                            onChange={onChange}
                            label="Mobile Number"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col flex flex-align-center flex-justify-center">
                        <Button onClick={onSubmit} variant="contained" color="primary">
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

const Login = (props) => {

    const [isLogin, setLogin] = useState(true);

    const toggle = () => {
        setLogin(!isLogin)
    }

    return (
        <>
            <div className="login">
                <div className="login--container flex flex-justify-center flex-align-center">
                    <div className="login--content flex flex-column flex-justify-center flex-align-center">
                        <img src={logo} width="120px" alt="online chat application logo" />
                        <p>Welcome to TagMango Online Chat App</p>
                        {
                            isLogin ? 
                            <>
                                <LoginForm />
                                <div>
                                    New to TagMango? <span className="cursor link-text" onClick={toggle}>SignUp</span> Here
                                </div>
                            </>
                            : 
                            <>
                                <SignUpForm />
                                <div>
                                    Already have an Account? <span className="cursor link-text" onClick={toggle}>Login</span> Here
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;