import React, { Component } from 'react';
import CoinFlipForm from './components/CoinFlipForm.component';
import eventBus from './common/EventBus';
import './App.css';

interface CoinFlipState {
  balance: number;
  message: string;
}

class CoinFlip extends Component<{}, CoinFlipState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      balance: 100,
      message: '',
    };
  }

  componentDidMount() {
    eventBus.on('flipCoin', this.handleFlipCoin);
  }

  componentWillUnmount() {
    eventBus.remove('flipCoin', this.handleFlipCoin);
  }

  flipCoin = (): boolean => Math.random() < 0.45;

  handleFlipCoin = (event: Event) => {
    const bet = (event as CustomEvent).detail;
    if (this.flipCoin()) {
      this.setState(prevState => ({
        balance: prevState.balance + bet,
        message: 'You win!',
      }));
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - bet,
        message: 'You lose.',
      }));
    }

  };

  updateUserBalance = (balance : BigInt) =>{
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Flip & Win</h1>
          <p>Your current balance is ${this.state.balance.toFixed(2)}</p>
          <CoinFlipForm balance={this.state.balance} />
          {this.state.message && <p>{this.state.message}</p>}
          {this.state.balance <= 0 && <p>You're out of money! Game over.</p>}
        </header>
      </div>
    );
  }
}

export default CoinFlip;
