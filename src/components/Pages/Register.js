import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {

    render() {
        return (
            <div className="block-center mt-4 wd-xl">
                {/* START card */}
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center" src="img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">SIGNUP TO GET INSTANT ACCESS.</p>
                        <form className="mb-3" id="registerForm" noValidate>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputEmail1">Email address</label>
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="signupInputEmail1" type="email" placeholder="Enter email" autoComplete="off" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-envelope text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputPassword1">Password</label>
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="signupInputPassword1" type="password" placeholder="Password" autoComplete="off" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-lock text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputRePassword1">Retype Password</label>
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="signupInputRePassword1" type="password" placeholder="Retype Password" autoComplete="off" required data-parsley-equalto="#signupInputPassword1"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text fa fa-lock text-muted bg-transparent border-left-0"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox c-checkbox mt-0">
                                <label>
                                    <input type="checkbox" value="" required name="agreed"/>
                                    <span className="fa fa-check"></span>I agree with the
                                    <a className="ml-1" href="">terms</a>
                                </label>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="button">Create account</button>
                        </form>
                        <p className="pt-3 text-center">Have an account?</p>
                        <Link to="login" className="btn btn-block btn-secondary">Signup</Link>
                    </div>
                </div>
                {/* END card */}
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

export default Register;
