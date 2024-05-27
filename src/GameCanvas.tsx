import React, { Component, createRef } from 'react';

interface GameCanvasProps {
  snake: number[][];
  food: number[];
}

class GameCanvas extends Component<GameCanvasProps> {
  canvasRef = createRef<HTMLCanvasElement>();

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const ctx = canvas!.getContext('2d');
    ctx!.setTransform(10, 0, 0, 10, 0, 0);
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx!.fillStyle = 'red';
    ctx!.fillRect(this.props.food[0], this.props.food[1], 1, 1);

    ctx!.fillStyle = 'green';
    this.props.snake.forEach(([x, y]) => ctx!.fillRect(x, y, 1, 1));
  }

  render() {
    return <canvas ref={this.canvasRef} width="300" height="300" style={{ border: '1px solid black' }} />;
  }
}

export default GameCanvas;
