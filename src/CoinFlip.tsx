import React, { Component } from 'react';
import './CoinFlip.css';
import coinTail from './bitcoin.jpg'; 
import coinHead from './pepebtc.jpg'; 
import eventBus from './common/EventBus';

interface CoinFlipState {
  flipping: boolean;
  result: string;
  bet: string;
  amount: number | string;
  message: string;
}

class CoinFlip extends Component<{}, CoinFlipState> {
  state: CoinFlipState = {
    flipping: false,
    result: 'heads',  // Set default result to 'heads'
    bet: '',
    amount: '',
    message: '',
  };

  componentDidMount() {
    eventBus.on('coinFlipResult', this.handleFlipResult as EventListener);
  }

  componentWillUnmount() {
    eventBus.remove('coinFlipResult', this.handleFlipResult as EventListener);
  }

  handleBetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ bet: event.target.value });
  };

  handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ amount: event.target.value });
  };

  flipCoin = () => {
    const { bet, amount } = this.state;

    if (!bet) {
      this.setState({ message: 'Please place your bet!' });
      return;
    }

    if (amount === '' || parseFloat(amount.toString()) <= 0) {
      this.setState({ message: 'Please enter a valid amount!' });
      return;
    }

    this.setState({ flipping: true, message: '' });

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      eventBus.dispatch('coinFlipResult', { result, bet, amount: parseFloat(amount.toString()) });
    }, 3000); // Duration of the animation
  };

  handleFlipResult = (e: Event) => {
    const { result, bet, amount } = (e as CustomEvent).detail;
    const winAmount = amount * 2;
    const message = bet === result ? `You won $${winAmount}!` : `You lost $${amount}.`;
    this.setState({ flipping: false, result, message });
  };

  render() {
    const { flipping, result, bet, amount, message } = this.state;

    return (
      <div className="coin-flip-container">
        <div className={`coin ${flipping ? 'flipping' : ''} ${result}`}>
          <div className="front">
            <img src={coinHead} alt="Heads" className="coin-image" />
          </div>
          <div className="back">
            <img src={coinTail} alt="Tails" className="coin-image" />
          </div>
        </div>
        <div className="bet-container">
          <select value={bet} onChange={this.handleBetChange} disabled={flipping}>
            <option value="">Place your bet</option>
            <option value="heads">Heads</option>
            <option value="tails">Tails</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={this.handleAmountChange}
            disabled={flipping}
            placeholder="Enter amount"
          />
          <button onClick={this.flipCoin} disabled={flipping}>
            Flip Coin
          </button>
        </div>
        {!flipping && result && <div className="result">{result}</div>}
        {message && <div className="message">{message}</div>}
      </div>
    );
  }
}

export default CoinFlip;
