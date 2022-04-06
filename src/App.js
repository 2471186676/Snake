import { useState } from "react";
import "./App.css";
import Board from "./board"

const gameBoard = Board(10);
gameBoard.change(1,1,"hello");
console.log(gameBoard.get());
gameBoard.update();
console.log(gameBoard.get());
// console.log(gameBoard.get());

let createBoard = (size) => {
  let board = new Array(size * size);
  for (let i = 0; i < board.length; i++) {
    board[i] = i;
  }
  return board;
};

function App({ size }) {
	const [board, setBoard] = useState(createBoard(size));

  let inlineStyle = {
    gridTemplateColumns: "repeat("+size+", minmax(1px, 1fr))",
	};

	return (
		<>
			<div className="header">header</div>
			<div className="body">
				<div className="menu">menu</div>
				<div className="board" style={inlineStyle}>
					<GameBoard board={board}/>
				</div>
				<div className="result">result</div>
				<div className="leaderBoard">board</div>
			</div>
			<div className="footer">footer</div>
		</>
	);
}

function GameBoard({ board }) {

	return (
		<>
			{board.map((value, index) => {
				return (
					<div className="cell" key={index}>
					</div>
				);
			})}
		</>
	);
}

export default App;
