import React, { Component } from 'react';
import { Text, Container, Div, Input, Icon, Button } from 'atomize/dist';
import { Link } from 'react-router-dom';
import CountriesAPI from '../networking/countries';

class CountrySearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            query: "",
            countries: [],
            error: null,
            loading: false,
        }
    }

    render() {
        return (
            <Container>
                <Text textSize="heading">Country List</Text>
                
                <Div>
                    <Input
                        placeholder="Search"
                        onChange={e => {
                            // console.log(e.target.value);
                            this.setState({
                                query: e.target.value
                            })
                        }}
                        suffix={
                            <Button
                                pos="absolute"
                                onClick={() => this.searchCountry()}
                                bg="info700"
                                hoverBg="info800"
                                top="0"
                                right="0"
                                rounded={{ r: "md" }}
                            >
                                Search
                            </Button>
                        }
                    />
                    <Text textSize="caption">Input and click on search button</Text>
                </Div>
    
                {this.state.loading &&(
                    <Text>Loading...</Text>
                )}
                {Object(this.state.countries).length > 0 && (<Div p="1rem">
                    {Object.values(this.state.countries).map((data, index) => {
                        return (
                            <Link key={index} to={`/country/details/${data.name}`}><Text p=".5rem">{data.name}</Text></Link>
                        )
                    })}
                </Div>)}
                {this.state.error &&(
                    <Text>{this.state.error}</Text>
                )}
            </Container>
        )
    }

    searchCountry() {
        // Initialize the states
        this.setState({
            loading: true,
            error: null,
            countries: [],
        });

        // Get all the countries
        CountriesAPI.searchCountries(String(this.state.query).trim())
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                this.setState({
                    countries: res.data
                });
            } else {
                this.setState({
                    error: res.message
                });
            }
        })
        .catch(err => {
            this.setState({
                error: "An error occurred. Please try again"
            });
            console.log("Country List Error =>", err);
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }
}

export default CountrySearch;