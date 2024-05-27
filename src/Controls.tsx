import React, { Component } from 'react';

interface ControlsProps {
  changeDirection: (direction: string) => void;
}

class Controls extends Component<ControlsProps> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        this.props.changeDirection('UP');
        break;
      case 'ArrowDown':
        this.props.changeDirection('DOWN');
        break;
      case 'ArrowLeft':
        this.props.changeDirection('LEFT');
        break;
      case 'ArrowRight':
        this.props.changeDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  render() {
    return null;
  }
}

export default Controls;
