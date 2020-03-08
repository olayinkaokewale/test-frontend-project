import React, { Component } from 'react';
import { Text, Container, Div, Button, Icon, Input } from 'atomize/dist';
import UserAPI from '../networking/users';
import Validator from '../config/validator';
import store from '../config/store';

class UserLogin extends Component {

    constructor(props) {
        super(props);

        const usertoken = store.getState().user.token || null;

        this.state = {
            email:"",
            confirm_password:"",
            password:"",
            name:"",
            loading: false,
            errors:{},
            token: usertoken,
        }
    }

    componentDidMount() {
        if (this.state.token !== null) {
            this.props.history.push("/user/dashboard");
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <Container d="flex" justify="center" align="center" h="100vh">
                <Div  w={{md:"50%", sm:"100%"}}>
                    <Text m=".5rem" textSize="heading">Login to continue</Text>
                    <Div>
                        <Div m=".5rem">
                            <Text textColor="black500" m={{b:".5rem"}}>Email Address</Text>
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
                            <Text textColor="black500" m={{b:".5rem"}}>Password</Text>
                            {/* <Text textSize="caption" textColor="danger700">password must be at least 8 characters long</Text> */}
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
                                    this.loginUser();
                                }}
                                isLoading={this.state.loading}
                                disabled={this.state.loading}
                            >
                                <Text>Login</Text>
                            </Button>
                        </Div>
                        {(this.state.error !== undefined && this.state.error !== null) && (<Div d="flex" m={{t:"1rem"}} align="center" justify="center"><Icon name="CloseSolid" size="16px" color="danger700" m={{r:".5rem"}} /> <Text textSize="caption" textColor="danger700">{this.state.error}</Text></Div>)}
                    </Div>
                </Div>
            </Container>
        )
    }

    validateInput() {
        const {email, password} = this.state;
        const errors = {};
        if (!Validator.isValidEmail(email)) errors.email = "Invalid email address";
        if (!Validator.isValid(password)) errors.password = "Please enter your password";
        if (Object.keys(errors).length > 0) {
            this.setState({
                errors: errors
            });
            return false;
        }
        return true;
    }

    loginUser() {
        if (!this.validateInput()) return null;

        const {email, password} = this.state;

        this.setState({
            loading: true
        });

        UserAPI.loginUser(email, password)
        .then(res => {
            console.log("Login Response =>", res)
            if (res.status == 200) {
                // Save to JWT.
                store.dispatch({type:'ADD', payload: res.data});
                // Redirect to the dashboard
                this.props.history.push("/user/dashboard");
            } else {
                this.setState({
                    error: res.message
                });
            }
        })
        .catch(err => {
            console.log("User login error =>", err);
            this.setState({
                error: "Unable to log you in. Please try again later"
            });
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        });

    }
}

export default UserLogin;