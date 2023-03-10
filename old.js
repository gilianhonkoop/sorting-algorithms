import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

var ROWLENGTH = 3;
var COLUMNLENGTH = 3;


function Square(props) {

let classes = 'square';

if (props.winline) {
    if (props.winline.includes(props.index)) {
        props.value == 'X' ? classes += ' wonsquarex' : classes += ' wonsquareo';
    }
}

return (
    <button className={classes} onClick={props.onClick}>
        {props.value}
    </button>
);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
            winline: false,
            draw: false,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        if (!squares.includes(null)) {
            this.setState({
                draw: true,
            })
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                location: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleOrder() {
        this.setState({
            ascending: !this.state.ascending,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render () {
        return (
            <OneGame 
                history = {this.state.history}
                stepNumber = {this.state.stepNumber}
                xIsNext = {this.state.xIsNext}
                ascending = {this.state.ascending}
                winline = {this.state.winline}
                draw = {this.state.draw}
                handleClick = {(i) => this.handleClick(i)}
                handleOrder = {() => this.handleOrder()}
                jumpTo = {(step) => this.jumpTo(step)}
            />
        )
    }
}

class OneGame extends React.Component {

    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];

        const ret = calculateWinner(current.squares);

        let winner, winline = null;

        if (ret) {
            winline = calculateWinner(current.squares)[0];
            winner = calculateWinner(current.squares)[1];
        }

        const moves = history.map((step, move) => {

            const loc = history[move].location;
            let col = (loc % 3) + 1;
            let row = Math.floor(loc / 3) + 1;

            const desc = move ?
                'Go to move #' + move + ' (' + col + ',' + row + ')' :
                'Go to game start';

            return (
                <li key={move}>
                    <button style={move == this.props.stepNumber ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} onClick={() => this.props.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });

        if (!this.props.ascending) {
            moves.reverse();
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else if (this.props.draw) {
            status = 'Draw'
        }
        else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        winline = {winline}
                        squares={current.squares}
                        onClick={(i) => this.props.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div style={{marginLeft: '30px'}}>{status}</div>
                    <ol>{moves}</ol>
                    <button style={{marginLeft: '30px'}} onClick={() => this.props.handleOrder()}>
                        {this.props.ascending ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>
        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                index={i}
                key={i}
                winline={this.props.winline}
            />
        );
    }

    createRow(i) {
        return (Array.from(Array(ROWLENGTH)).map((e, j) => {
                return (
                    this.renderSquare(i * ROWLENGTH + j)
                );
            })
        );
    }

    render() {
        return (
            Array.from(Array(COLUMNLENGTH)).map((e, i) => {
                return (
                    <div className = 'board-row' key={i}>
                        {this.createRow(i)}
                    </div>
                );
            })
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [lines[i], squares[a]];
      }
    }
    return null;
  }

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  