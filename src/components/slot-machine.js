import React, { Component } from 'react';
import { Text, Container } from 'atomize/dist';

class SlotMachine extends Component {
    
    // Initialize the reals
    realOne = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
    realTwo = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
    realThree = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Text textSize="heading">Slot Machine</Text>
            </Container>
        )
    }


}

export default SlotMachine;