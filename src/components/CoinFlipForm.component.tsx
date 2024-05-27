import React, { Component } from 'react';
import eventBus from '../common/EventBus';

interface CoinFlipFormProps {
  balance: number;
}

interface CoinFlipFormState {
  bet: string;
}

class CoinFlipForm extends Component<CoinFlipFormProps, CoinFlipFormState> {
  constructor(props: CoinFlipFormProps) {
    super(props);
    this.state = {
      bet: '',
    };
  }

  handleBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ bet: event.target.value });
  };

  handleFlip = () => {
    const betAmount = parseFloat(this.state.bet);
    if (!isNaN(betAmount) && betAmount > 0 && betAmount <= this.props.balance) {
      eventBus.dispatch('flipCoin', betAmount);
      this.setState({ bet: '' });
    } else {
      alert('Invalid bet amount. Please enter a positive number not exceeding your balance.');
    }
  };

  render() {
    return (
      <div>
        <input
          type="number"
          value={this.state.bet}
          onChange={this.handleBetChange}
          placeholder="Enter your bet"
        />
        <button onClick={this.handleFlip}>Flip Coin</button>
      </div>
    );
  }
}

export default CoinFlipForm;
