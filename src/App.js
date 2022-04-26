import { useState } from "react";
import "./App.css";
import { useBoard } from "./board";

const changeDisplay = (element, style) => {
	let type = typeof element;
	if (type == "string") {
		let div = document.getElementsByClassName(element)[0];
		div.style.display = style;
	} else if (type == "object") {
		element.style.display = style;
	}
};

function App({ size }) {
	const board = useBoard(size);

	let inlineStyle = {
		gridTemplateColumns: "repeat(" + size + ", minmax(1px, 1fr))",
	};

	function pauseGame() {
		board.startStop();
		let pauseUI = document.getElementsByClassName("pause")[0];
		let display = pauseUI.style.display;
		display === "" || display === "none"
			? changeDisplay(pauseUI, "flex")
			: changeDisplay(pauseUI, "none");
	}

	return (
		<>
			<div className="header">header</div>
			<div className="body">
				<div className="wrapper">
					<div className="menu">
						<Menu additonal={board.startStop} />
					</div>
					<div className="board" style={inlineStyle}>
						<GameBoard board={board} pause={pauseGame} />
					</div>
					<div className="pause">
						<button onClick={pauseGame}>unpause</button>
					</div>
					<div className="result">result</div>
					<div className="leader">board</div>
				</div>
			</div>
			<div className="footer">footer</div>
		</>
	);
}

function GameBoard({ board, pause }) {
	let oldBoard = board.board === undefined ? [[1, 2, 3]] : board.board;
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
			<button onClick={pause}>score</button>
		</>
	);
}

function Menu({ additonal }) {
	function click(e) {
		e.preventDefault();
		changeDisplay("board", "grid");
		changeDisplay(e.target.parentElement, "none");

		// run passed in function
		additonal();

		additonal !== undefined ? additonal() : console();
	}

	return (
		<>
			<button onClick={click}>click ME</button>
		</>
	);
}

export default App;
