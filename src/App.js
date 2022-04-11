import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useEffect, useState } from "react";
import "./App.css";
import { useBoard } from "./board";

function App({ size }) {
	const board = useBoard(size);

	useEffect(() => {
		let keyDown = "d";
		let cycle = true;

		// read input
		document.addEventListener("keydown", (e) => {
			keyDown = e.key;
		});

		setInterval(() => {
			if (cycle == true) {
				board.update(keyDown);
			}
		}, 100);

	}, []);

	const keyPress = (e) => {
		return e.key;
	};

	let inlineStyle = {
		gridTemplateColumns: "repeat(" + size + ", minmax(1px, 1fr))",
	};

	return (
		<>
			<div className="header">header</div>
			<div className="body" onKeyDown={keyPress}>
				<div className="wrapper">
					<div className="menu">
						<Menu />
					</div>
					<div className="board" style={inlineStyle}>
						<GameBoard board={board} change={board.change} />
						<button onClick={() => board.addFruit()}>add</button>
					</div>
					<div className="result">result</div>
					<div className="leaderBoard">board</div>
				</div>
			</div>
			<div className="footer">footer</div>
		</>
	);
}

function GameBoard({ board, change }) {
	// console.log(board.board)
	let oldBoard = board.board;
	let newArray = [];

	for (let x = 0; x < oldBoard.length; x++) {
		for (let y = 0; y < oldBoard[0].length; y++) {
			newArray.push(oldBoard[x][y]);
		}
	}

	return (
		<>
			{newArray.map((value, index) => {
				if (value === "S") {
					return <div className="S" key={index} id={index}></div>;
				} else if (value === "F") {
					return <div className="F" key={index} id={index}></div>;
				}
				return <div className="E" key={index} id={index}></div>;
			})}
		</>
	);
}

function Menu() {
	function click(e) {
		e.preventDefault();
		let board = document.getElementsByClassName("board")[0];
		board.style.display = "grid";
		e.target.parentElement.style.display = "none";
	}

	return (
		<>
			<button onClick={click}>click ME</button>
		</>
	);
}

export default App;
