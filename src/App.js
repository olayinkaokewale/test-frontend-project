import React from 'react';
import { Div, Text, Col, Row, Container } from 'atomize/dist';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CountryDetails from './components/country-details';
import CountrySearch from './components/country-search';
import CountryList from './components/country-list';
import SlotMachine from './components/slot-machine';
import UserRegister from './components/user-register';
import UserLogin from './components/user-login';
import UserDashboard from './components/user-dashboard';

function App() {
	return (
		<Router>
			<Div d={{md:"flex", xs:"block"}}>
				<Sidebar>
					<Div >
						<Text p="1rem">Test Project Logo</Text>
					</Div>
					<Div h="1px" w="100%" bg="gray500" />
					<Row d={{md:"block", xs:"flex"}}>
						<Col size={{md:"12", xs:"4"}}><Link to="/country/details"><Text p="1rem">Get Country Details</Text></Link></Col>
						<Col size={{md:"12", xs:"4"}}><Link to="/country/search"><Text p="1rem">Search Country</Text></Link></Col>
						<Col size={{md:"12", xs:"4"}}><Link to="/country/list"><Text p="1rem">Get All Countries</Text></Link></Col>
						<Col size={{md:"12", xs:"4"}}><Link to="/slot-machine"><Text p="1rem">Slot Machine</Text></Link></Col>
						<Col size={{md:"12", xs:"4"}}><Link to="/user/register"><Text p="1rem">User Registration</Text></Link></Col>
						<Col size={{md:"12", xs:"4"}}><Link to="/user/login"><Text p="1rem">User Login</Text></Link></Col>
					</Row>
				</Sidebar>
				<MainContent>
					<Switch>
						<Route exact={true} path="/" render={() => {
							return (
								<Text>Welcome</Text>
							)
						}} />
						<Route exact={true} path="/country/details/" render={() => (
							 <Container>
							 	<Text textSize="heading">Country Details</Text>
							 	<Text>Go to <Link to="/country/list">country list</Link> to select a country</Text>
							 </Container>
						)} />
						<Route path="/country/details/:name" component={CountryDetails} />
						<Route path="/country/search" component={CountrySearch} />
						<Route path="/country/list" component={CountryList} />
						<Route path="/slot-machine" component={SlotMachine} />
						<Route path="/user/register" component={UserRegister} />
						<Route path="/user/login" component={UserLogin} />
						<Route path="/user/dashboard" component={UserDashboard} />
					</Switch>
				</MainContent>
			</Div>
		</Router>
	);
}

const Sidebar = ({children}) => {
	return (
		<Div bg="gray200" w={{md:"20%", xs:"100%"}} h={{md:"100vh", xs: "30vh"}} position="fixed" top="0%" left="0%" overflow="scroll">
			{children}
		</Div>
	)
}

const MainContent = ({children}) => {
	return (
		<Div h={{md:"100vh", xs: "70vh"}} w={{md:"80%", xs:"100%"}} position="fixed" top={{md:"0%", xs:"30%"}} left={{md:"20%", xs:"0%"}} overflow="scroll">
			{children}
		</Div>
	)
}

export default App;
