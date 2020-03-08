import React, { Component } from 'react';
import store from '../config/store';
import UserAPI from '../networking/users';
import { Container, Div, Button, Icon, Text } from 'atomize/dist';

class UserDashboard extends Component {

    constructor(props) {
        super(props);
        const usertoken = store.getState().user.token || null;
        this.state = {
            token: usertoken,
            loading: true,
            userData: null
        }
    }

    componentDidMount() {
        this.authenticate();
    }

    render() {
        return (
            <Container>
                {(this.state.loading) && (
                    <Text>Loading...</Text>
                )}
                {(this.state.userData !== null) && (
                    <Div d={{md:"flex",sm:"block"}} m="2rem" align="center">
                        <Text textSize="heading" m={{r:"1rem"}}>Welcome, {this.state.userData.name}</Text>
                        <Button
                            suffix={
                            <Icon
                                name="LongRight"
                                size="16px"
                                color="white"
                                m={{ l: "1rem" }}
                            />
                            }
                            shadow="3"
                            hoverShadow="4"
                            bg="danger600"
                            onClick={() => {
                                this.logout();
                            }}
                            m={{ r: "1rem" }}
                        >
                            Logout
                        </Button>
                    </Div>
                )}
            </Container>
        );
    }

    authenticate() {
        this.setState({loading: true});
        if (this.state.token == null || this.state.token == undefined) this.logout();

        UserAPI.authUser(this.state.token)
        .then(res => {
            if (res.status == 200) {
                this.setState({
                    userData: res.data
                })
            } else {
                this.logout();
            }
        })
        .catch(err => {
            console.log("Authentication error =>", err);
            this.logout();
        })
        .finally(() => {
            this.setState({loading: false});
        })
    }

    logout() {
        // Destroy the token.
        store.dispatch({type:'TRUNCATE', payload: {}});
        // Redirect
        this.props.history.push("/user/login");
    }
}

export default UserDashboard;