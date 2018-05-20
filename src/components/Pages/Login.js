import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    render() {
        return (
            <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center rounded" src="img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                        <form className="mb-3" id="loginForm" noValidate>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="exampleInputEmail1" type="email" placeholder="Enter email" autoComplete="off" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-envelope text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="exampleInputPassword1" type="password" placeholder="Password" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-lock text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox float-left mt-0">
                                    <label>
                                        <input type="checkbox" value="" name="remember"/>
                                        <span className="fa fa-check"></span>Remember Me</label>
                                </div>
                                <div className="float-right">
                                    <Link to="recover" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="button">Login</button>
                        </form>
                        <p className="pt-3 text-center">Need to Signup?</p>
                        <Link to="register" className="btn btn-block btn-secondary">Register Now</Link>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2018</span>
                    <span className="mx-2">-</span>
                    <span>Angle</span>
                    <br/>
                    <span>Bootstrap Admin Template</span>
                </div>
            </div>
        );
    }
}

export default Login;
