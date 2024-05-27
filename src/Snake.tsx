import React, { Component } from 'react';
import GameCanvas from './GameCanvas';
import Controls from './Controls';
import './Snake.css';

interface SnakeState {
  snake: number[][];
  direction: string;
  food: number[];
  gameOver: boolean;
}

class Snake extends Component<{}, SnakeState> {
  gameInterval: NodeJS.Timeout | undefined;

  state: SnakeState = {
    snake: [[10, 10]],
    direction: 'RIGHT',
    food: [15, 15],
    gameOver: false
  };

  changeDirection = (newDirection: string) => {
    this.setState({ direction: newDirection });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.gameInterval = setInterval(this.moveSnake, 200);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        this.setState({ direction: 'UP' });
        break;
      case 'ArrowDown':
        this.setState({ direction: 'DOWN' });
        break;
      case 'ArrowLeft':
        this.setState({ direction: 'LEFT' });
        break;
      case 'ArrowRight':
        this.setState({ direction: 'RIGHT' });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    if (this.state.gameOver) return;

    const newSnake = [...this.state.snake];
    const head = newSnake[newSnake.length - 1];

    let newHead: [number, number];
    switch (this.state.direction) {
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
      default:
        return;
    }

    newSnake.push(newHead);
    newSnake.shift();

    if (newHead[0] === this.state.food[0] && newHead[1] === this.state.food[1]) {
      this.setState({
        food: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]
      });
      newSnake.unshift([]);
    }

    if (
      newHead[0] < 0 ||
      newHead[0] >= 30 ||
      newHead[1] < 0 ||
      newHead[1] >= 30 ||
      newSnake.slice(0, -1).some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      this.setState({ gameOver: true });
      return;
    }

    this.setState({ snake: newSnake });
  };

  render() {
    return (
      <div className="Snake">
        <h1>Snake Game</h1>
        <GameCanvas snake={this.state.snake} food={this.state.food} />
        {this.state.gameOver && <div>Game Over</div>}
        <Controls changeDirection={this.changeDirection} />
      </div>
    );
  }
}

export default Snake;
