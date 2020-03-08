import React, { Component } from 'react';
import { Container, Text, Div, Image } from 'atomize/dist';
import CountriesAPI from '../networking/countries';

class CountryDetails extends Component {

    constructor(props) {
        super(props);
        const match = this.props.match;
        this.state = {
            loading: true,
            country: null,
            error: null,
            countryName: match.params.name || "",
        }
    }

    componentDidMount() {
        this.loadCountry();
    }

    render() {
        const { country } = this.state;
        return (
            <Container>
                <Text textSize="heading">Country Details: {this.state.countryName}</Text>
                {this.state.loading && (
                    <Text>Loading...</Text>
                )}
                {(this.state.error !== null) && (
                    <Text>{this.state.error}</Text>
                )}
                {(country !== null) && (
                    <Div p=".5rem">
                        <Image src={country.flag} h="50px" w="auto" />
                        <Text p={{y:".5rem"}}>{country.name}</Text>
                        <Text p={{y:".5rem"}}>ISO Code(s): {country.alpha2Code} or {country.alpha3Code}</Text>
                        <Text p={{y:".5rem"}}>Region: {country.region}</Text>
                        <Text p={{y:".5rem"}}>Calling Code: {country.callingCodes}</Text>
                        <Text p={{y:".5rem"}}>Capital: {country.capital}</Text>
                        <Text p={{y:".5rem"}}>Population: {country.population}</Text>
                        <Text>Currencies:</Text>
                        <ul>
                            {Object.values(country.currencies).map((val, i) => {
                                return <li key={i}>{`${val.name} (${val.symbol})`}</li>;
                            })}
                        </ul>
                        <Text>Languages:</Text>
                        <ul>
                            {Object.values(country.languages).map((val, i) => {
                                return <li key={i}>{val.name}</li>;
                            })}
                        </ul>
                    </Div>
                )}
            </Container>
        )
    }

    loadCountry() {
        // Initialize the states
        this.setState({
            loading: true,
            error: null
        });

        // Get all the countries
        CountriesAPI.getUniqueCountry(this.state.countryName)
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                this.setState({
                    country: res.data
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

export default CountryDetails;