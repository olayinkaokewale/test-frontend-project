import React, { Component } from 'react';
import { Text, Container, Div, Input, Button, Icon, Label } from 'atomize/dist';
import UserAPI from '../networking/users';
import Validator from '../config/validator';

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            name:"",
            loading: false,
            showPassword: false,
            errors: {}
        }
    }

    componentDidMount() {

    }

    render() {
        const {errors = {}} = this.state;
        return (
            <Container d="flex" justify="center" align="center" h="100vh">
                <Div  w={{md:"50%", sm:"100%"}}>
                    <Text textSize="heading" m=".5rem">User Registration</Text>
                    <Div>
                        <Div m=".5rem">
                            <Text textColor="black500" m={{b:".5rem"}}>Your Name</Text>
                            <Input 
                                placeholder="Input your name"
                                rounded="0"
                                onChange={e => {
                                    this.setState({name: e.target.value, errors: {...this.state.errors, name:null}})
                                }}
                            />
                            {(errors.name !== undefined && errors.name !== null) && (<Div d="flex" align="center"><Icon name="CloseSolid" size="16px" color="danger700" m={{r:".5rem"}} /> <Text textSize="caption" textColor="danger700">{errors.name}</Text></Div>)}
                        </Div>

                        <Div m=".5rem">
                            <Text textColor="black500" m={{b:".5rem"}}>Your Email Address</Text>
                            <Input 
                                placeholder="e.g. abc@dce.com"
                                rounded="0"
                                onChange={e => {
                                    this.setState({email: e.target.value, errors: {...this.state.errors, email:null}})
                                }}
                            />
                            {(errors.email !== undefined && errors.email !== null) && (<Div d="flex" align="center"><Icon name="CloseSolid" size="16px" color="danger700" m={{r:".5rem"}} /> <Text textSize="caption" textColor="danger700">{errors.email}</Text></Div>)}
                        </Div>
                            
                        <Div m=".5rem">
                            <Div m={{b:".5rem"}}>
                                <Text textColor="black500">Your secret password</Text>
                                <Text textSize="caption" textColor="black400">password must be at least 8 characters long</Text>
                            </Div>
                            <Input
                                placeholder="Input Password"
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={e => {
                                    this.setState({password: e.target.value, errors: {...this.state.errors, password:null}})
                                }}
                                rounded="0"
                                suffix={
                                    <Button
                                        pos="absolute"
                                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                        bg="transparent"
                                        w="3rem"
                                        top="0"
                                        right="0"
                                    >
                                        <Icon
                                        name={this.state.showPassword ? "EyeSolid" : "Eye"}
                                        color={this.state.showPassword ? "danger800" : "success800"}
                                        size="16px"
                                        />
                                    </Button>
                                }
                            />
                            {(errors.password !== undefined && errors.password !== null) && (<Div d="flex" align="center"><Icon name="CloseSolid" size="16px" color="danger700" m={{r:".5rem"}} /> <Text textSize="caption" textColor="danger700">{errors.password}</Text></Div>)}
                        </Div>
                        <Div d="flex">
                            <Button rounded="0" m={{t:"1rem",x:".5rem"}} w="100%" suffix={
                                <Icon
                                    name="LongRight"
                                    size="16px"
                                    color="white"
                                    m={{ l: "1rem" }}
                                />
                                }
                                shadow="2"
                                hoverShadow="3"
                                bg="info700"
                                onClick={() => {
                                    this.registerUser();
                                }}
                                isLoading={this.state.loading}
                                disabled={this.state.loading}
                            >
                                <Text>Register</Text>
                            </Button>
                        </Div>
                        {(this.state.error !== undefined && this.state.error !== null) && (<Div d="flex" m={{t:"1rem"}} align="center" justify="center"><Icon name="CloseSolid" size="16px" color="danger700" m={{r:".5rem"}} /> <Text textSize="caption" textColor="danger700">{this.state.error}</Text></Div>)}
                    </Div>
                </Div>
            </Container>
        )
    }

    validateInput() {
        const {email, password, name} = this.state;
        const errors = {};
        if (!Validator.isValidEmail(email)) errors.email = "Invalid email address";
        if (!Validator.isValid(name, 2)) errors.name = "Input a valid name";
        if (!Validator.isValid(password, 8)) errors.password = "8 character long password is required";
        if (Object.keys(errors).length > 0) {
            this.setState({
                errors: errors
            });
            return false;
        }
        return true;
    }

    registerUser() {

        if (!this.validateInput()) return null;

        const {email, password, name} = this.state;

        this.setState({
            loading: true
        });

        UserAPI.registerUser(name, email, password)
        .then(res => {
            if (res.status == 200) {
                // TODO: Redirect to the login page
                this.props.history.push("/user/login")
            } else {
                this.setState({
                    error: res.message
                });
            }
        })
        .catch(err => {
            console.log("User registration error =>", err);
            this.setState({
                error: "Unable to register you. Please try again later"
            });
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        });

    }
}

export default UserRegister;