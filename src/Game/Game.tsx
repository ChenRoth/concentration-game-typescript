import * as React from 'react';
import {Card} from '../Card/Card';
import './Game.css';

export type CardStack = string[]; // card stack is an array of image URLs

export interface IGameState {
  stack: CardStack;
  flippedCards: Record<number, boolean>;
  currentFlippedCards: number[];
}

export class Game extends React.Component<any, IGameState> {
  state: IGameState = {
    stack: [
      'https://picsum.photos/id/1003/1181/1772',
      'https://picsum.photos/id/1002/1181/1772',
      'https://picsum.photos/id/1003/1181/1772',
      'https://picsum.photos/id/1002/1181/1772'],
    flippedCards: {},
    currentFlippedCards: [],
  };

  flipCard = (index: number) => {
    const {currentFlippedCards} = this.state;
    if (currentFlippedCards.length === 2) {
      return;
    }

    this.setState({currentFlippedCards: currentFlippedCards.concat(index)}, () => {
      if (this.state.currentFlippedCards.length < 2) {
        return;
      }
      setTimeout(this.compareCards, 1000);
    });
  };

  compareCards = () => {
    const [firstCardIndex, secondCardIndex] = this.state.currentFlippedCards;

    // check if cards match
    if (this.state.stack[firstCardIndex] === this.state.stack[secondCardIndex]) {
      const newFlippedCards = {
        [firstCardIndex]: true,
        [secondCardIndex]: true,
      };
      // cards match, add them to flippedCards collection
      this.setState({
        currentFlippedCards: [],
        flippedCards: Object.assign(this.state.flippedCards, newFlippedCards)
      });
    } else {
      // cards don't match
      this.setState({
        currentFlippedCards: []
      });
    }
  }

  render() {
    const {stack, flippedCards, currentFlippedCards} = this.state;
    return (
      <div className="game">
        {stack.map((image, i) =>
          <Card
            key={i}
            index={i} image={image}
            onFlip={this.flipCard}
            isFlipped={flippedCards[i] || currentFlippedCards.includes(i)}/>
        )}
      </div>
    );
  }
}
