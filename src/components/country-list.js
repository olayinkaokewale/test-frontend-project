import React, { Component } from 'react';
import { Text, Container, Div, Input, Icon } from 'atomize/dist';
import CountriesAPI from '../networking/countries';
import { Link } from 'react-router-dom';

class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            countries: [],
            error: null,
            filterQuery: "",
            filteredResult: []
        }
    }

    componentDidMount() {
        this.getCountries();
    }

    render() {
        return (
            <Container>
                <Text textSize="heading">Country List</Text>
                {this.state.loading &&(
                    <Text>Loading...</Text>
                )}
                {Object(this.state.countries).length > 0 &&(
                    <Div>
                        <Input
                            placeholder="Search"
                            onChange={e => {
                                this.setState({
                                    filterQuery: e.target.value
                                }, () => {
                                    // Do a filter.
                                    this.filterResult();
                                })
                            }}
                            suffix={
                                <Icon
                                    name="Search"
                                    size="20px"
                                    cursor="pointer"
                                    /* onClick={() => console.log("clicked")} */
                                    pos="absolute"
                                    top="50%"
                                    right="1rem"
                                    transform="translateY(-50%)"
                                />
                            }
                        />
                        {(this.state.filteredResult !== null && this.state.filteredResult !== undefined && typeof this.state.filteredResult === "object") && (<Div p="1rem">
                            {Object.values(this.state.filteredResult).map((data, index) => {
                                return (
                                    <Link key={index} to={`/country/details/${data.name}`}><Text p=".5rem">{data.name}</Text></Link>
                                )
                            })}
                        </Div>)}
                    </Div>
                )}
                {this.state.error &&(
                    <Text>{this.state.error}</Text>
                )}
            </Container>
        )
    }

    getCountries() {
        // Initialize the states
        this.setState({
            loading: true,
            error: null
        });

        // Get all the countries
        CountriesAPI.getAllCountries()
        .then(res => {
            if (res.status == 200) {
                this.setState({
                    countries: res.data
                }, () => {
                    this.filterResult();
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

    filterResult() {
        if (String(this.state.filterQuery).trim() === "") {
            this.setState({
                filteredResult: this.state.countries
            })
        } else {
            // console.log("Filter Query => ",this.state.filterQuery);
            const filtered = this.state.countries.filter(country => {
                return String(country.name).trim().toLowerCase().includes(String(this.state.filterQuery).trim().toLowerCase())
            });
            // console.log("Filtered => ",filtered);
            this.setState({
                filteredResult: filtered,
            })
        }
    }
}

export default CountryList;