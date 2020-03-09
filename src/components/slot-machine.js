import React, { Component } from 'react';
import { Text, Container, Div, Button } from 'atomize/dist';
import Slot from 'react-slot-machine';
import './styles/slot-machine.css';

class SlotMachine extends Component {
    
    // Initialize the reals
    realOne = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
    realTwo = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
    realThree = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];
    spinDuration = 3000; //in ms
    turnTimes = 10;

    constructor(props) {
        super(props);
        this.state = {
            coin: 20,
            
            target1: 0,
            target2: 0,
            target3: 0,

            spinDuration1: 10,
            spinDuration2: 20,
            spinDuration3: 30,

            loading: false,
            spinned: 0,

            coinWon: 0,

            error: null,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container d="flex" justify="center" align="center" h="100vh">
                <Div  w={{md:"50%", sm:"100%"}}>
                    <Div bg="black600" p="1rem">
                        <Text textColor="white" p=".25rem">You have {this.state.coin} {this.state.coin > 1 ? 'coins' : 'coin'}</Text>
                        <Text textColor="white" p=".25rem">Last Winning: {this.state.coinWon} {this.state.coinWon > 1 ? 'coins' : 'coin'}</Text>
                    </Div>
                    {/* <Text textSize="heading" p="1rem">Slot Machine</Text> */}
                    <Div d={{md:"flex", sm:"block"}} align="center" m={{t:"1rem"}}>
                        <Div p=".5rem">
                            <Slot onEnd={() => {this.spinEnded(1); console.log("1 ended");}} className="slot" target={this.state.target1} duration={this.state.spinDuration1} times={this.turnTimes}>
                                {this.realOne.map((value,i) => (
                                    <div className="slot-item" key={i} style={{width:'100%', height:'100%'}}>
                                        {value}
                                    </div>
                                ))}
                            </Slot>
                        </Div>
                        <Div p=".5rem">
                            <Slot onEnd={() => {this.spinEnded(1); console.log("2 ended");}} className="slot" target={this.state.target2} duration={this.state.spinDuration2} times={this.turnTimes}>
                                {this.realTwo.map((value,i) => (
                                    <div className="slot-item" key={i} style={{width:'100%', height:'100%'}}>
                                        {value}
                                    </div>
                                ))}
                            </Slot>
                        </Div>
                        <Div p=".5rem">
                            <Slot onEnd={() => {this.spinEnded(1); console.log("3 ended");}} className="slot" target={this.state.target3} duration={this.state.spinDuration3} times={this.turnTimes}>
                                {this.realThree.map((value,i) => (
                                    <div className="slot-item" key={i} style={{width:'100%', height:'100%'}}>
                                        {value}
                                    </div>
                                ))}
                            </Slot>
                        </Div>
                    </Div>
                    <Div d="flex">
                        <Button rounded="0" m={{t:"1rem",x:".5rem"}} w="100%"
                            shadow="2"
                            hoverShadow="3"
                            bg="info700"
                            onClick={() => {
                                this.spin();
                            }}
                            /* isLoading={this.state.loading} */
                            disabled={this.state.loading}
                        >
                            <Text>Spin!</Text>
                        </Button>
                    </Div>
                    <Div d="flex" p=".25rem" m={{t:".25rem"}} justify="center"><Text textColor="warning800">Note: You loose 1 coin per spin</Text></Div>
                    {(this.state.error !== null) && (<Div d="flex" p=".5rem" bg="danger800" m={{t:".25rem"}} justify="center"><Text textColor="white">{this.state.error}</Text></Div>)}
                </Div>
            </Container>
        )
    }

    spin = () => {
        if (this.state.coin > 0) {
            this.setState({target1:0, target2:0, target3:0, loading:true, spinned:0, coin: (this.state.coin - 1)}, () => {
                // let { target1, target2, target3 } = this.state;
    
                const target1 = Math.floor(Math.random() * this.realOne.length);
                if (target1 == this.state.target1) this.spinned += 1;
                const target2 = Math.floor(Math.random() * this.realTwo.length);
                if (target2 == this.state.target2) this.spinned += 1;
                const target3 = Math.floor(Math.random() * this.realThree.length);
                if (target3 == this.state.target3) this.spinned += 1;
    
                const spinDuration1 = Math.floor(Math.random() * 3000) + 1000;//Math.abs(Math.ceil(Math.random() * 6000) - Math.floor(Math.random() * 2000));
                const spinDuration2 = Math.floor(Math.random() * 3000) + 1000;//Math.abs(Math.ceil(Math.random() * 6000) - Math.floor(Math.random() * 2000));
                const spinDuration3 = Math.floor(Math.random() * 3000) + 1000;//Math.abs(Math.ceil(Math.random() * 6000) - Math.floor(Math.random() * 2000));
    
                // console.log(target1, target2, target3);
                // console.log(spinDuration1, spinDuration2, spinDuration3);
    
                this.setState({target1, target2, target3, spinDuration1, spinDuration2, spinDuration3});
            });
        } else {
            this.setState({error: "You have no coin to spin! Please buy more coins by reloading this page"});
        }
        
    }

    spinned = 0;
    spinEnded = i => {
        const spinned = this.spinned + 1;
        if (spinned >= 3) {
            this.spinned = 0;
            this.setState({loading: false }, () => {
                // Calculate the amount won here.
                this.calculateWinning();
            });
        } else {
            this.spinned = spinned;
        }
    }

    calculateWinning() {
        const { target1,target2,target3 } = this.state;
        /* const result1 = this.realOne[target1];
        const result2 = this.realTwo[target2];
        const result3 = this.realThree[target3]; */
        const result = [this.realOne[target1], this.realTwo[target2], this.realThree[target3]];
        let winning = 0;

        if (result.includes("cherry") && this.howMany(result, "cherry") === 3) winning = 50;
        else if (result.includes("cherry") && this.howMany(result, "cherry") === 2) winning = 40;
        else if (result.includes("apple") && this.howMany(result, "apple") === 3) winning = 20;
        else if (result.includes("apple") && this.howMany(result, "apple") === 2) winning = 10;
        else if (result.includes("banana") && this.howMany(result, "banana") === 3) winning = 15;
        else if (result.includes("banana") && this.howMany(result, "banana") === 2) winning = 5;
        else if (result.includes("lemon") && this.howMany(result, "lemon") === 3) winning = 3;

        this.setState({
            coinWon: winning,
            coin: this.state.coin + winning
        });
    }

    howMany = (myArray, str) => {
        const count = myArray.filter(x => x == str).length;
        return count;
    }

}

export default SlotMachine;