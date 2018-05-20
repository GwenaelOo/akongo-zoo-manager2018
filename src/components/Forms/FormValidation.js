import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Input, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import $ from 'jquery';
// Parsley
import 'parsleyjs/dist/parsley.min.js';

class FormValidation extends Component {

    onSubmit = e => {
        const instance = $(e.target).parsley();
        instance.validate();
        console.log('Form submit... ' + (instance.isValid()?'valid!!':'invalid'))
        e.preventDefault()
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Form Validation
                        <small>Validating forms frontend have never been so powerful and easy.</small>
                    </div>
                </div>
                { /* START row */ }
                <Row>
                    <Col lg={ 6 }>
                        <form onSubmit={this.onSubmit} method="post" action="#" data-parsley-validate noValidate>
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Form Register</div>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-group">
                                        <label className="col-form-label">Email Address *</label>
                                        <Input type="text" name="email" data-parsley-type="email" data-parsley-required />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password *</label>
                                        <Input id="id-password" type="password" name="password" required/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Confirm Password *</label>
                                        <Input type="password" name="confirmPassword" required data-parsley-equalto="#id-password"/>
                                    </div>
                                    <div className="required">* Required fields</div>
                                </CardBody>
                                <CardFooter>
                                    <div className="d-flex align-items-center">
                                        <div className="checkbox c-checkbox">
                                            <label className="m-0">
                                                <Input type="checkbox" name="agreements" data-parsley-error-message="Please read and agree the terms" required/>
                                                <span className="fa fa-check"></span>I agree with the <a href="">terms</a></label>
                                        </div>
                                        <div className="ml-auto">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </Col>
                    <Col lg={ 6 }>
                        <form onSubmit={this.onSubmit} method="post" data-parsley-validate="" noValidate>
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Form Login</div>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-group">
                                        <label className="col-form-label">Email Address *</label>
                                        <Input type="text" name="email" data-parsley-type="email" data-parsley-required/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password *</label>
                                        <Input type="password" name="password" required/>
                                    </div>
                                    <div className="required">* Required fields</div>
                                </CardBody>
                                <CardFooter>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </Col>
                </Row>
                { /* END row */ }
                { /* START row */ }
                <Row>
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit} action="#" data-parsley-validate="" noValidate className="form-horizontal">
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Fields validation</div>
                                </CardHeader>
                                <CardBody>
                                    <legend className="mb-4">Type validation</legend>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Required Text</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="required" required/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>required</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Email</label>
                                            <Col md={ 6 }>
                                                <Input type="email" name="email" data-parsley-type="email"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="email"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Number</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="number" data-parsley-type="number"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="number"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Integer</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="integer" data-parsley-type="integer"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="integer"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Digits</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="digits" data-parsley-type="digits"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="digits"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Alphanum</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="alphanum" data-parsley-type="alphanum"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="alphanum"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Url</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="url" data-parsley-type="url"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-type="url"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Equal to</label>
                                            <div className="col-sm-3">
                                                <Input id="id-source" type="text" placeholder="#id-source"/>
                                            </div>
                                            <div className="col-sm-3">
                                                <Input type="text" data-parsley-equalto="#id-source"/>
                                            </div>
                                            <Col md={ 4 }>
                                                <code>data-parsley-equalto='#id-source'</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <legend className="mb-4">Range validation</legend>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Minlength</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="minlength" data-parsley-minlength="6"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-minlength="6"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Maxlength</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="maxlength" data-parsley-maxlength="10"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-maxlength="10"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Length</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="length" data-parsley-length="[6, 10]"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-length="[6, 10]"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Min</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="min" data-parsley-min="6"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-min="6"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Max</label>
                                            <Col md={ 6 }>
                                                <Input type="text" name="max" data-parsley-max="6"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-parsley-max="6"</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Min words</label>
                                            <Col md={ 6 }>
                                                <Input type="text" data-minwords="6"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-minwords='6'</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Max words</label>
                                            <Col md={ 6 }>
                                                <Input type="text" data-maxwords="6"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-maxwords='6'</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Range of words</label>
                                            <Col md={ 6 }>
                                                <Input type="text" data-rangewords="[6,10]"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>data-rangewords='[6,10]'</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                </CardBody>
                                <CardFooter className="text-center">
                                    <button type="submit" className="btn btn-info">Run validation</button>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </div>
                </Row>
                { /* END row */ }
            </ContentWrapper>
            );
    }

}

export default FormValidation;

