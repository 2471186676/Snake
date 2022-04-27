import { useState } from "react";
import "./App.css";
import "./cssAnimation.css";
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

function pauseScreen(score = 0) {
	let pauseUI = document.getElementsByClassName("pause")[0];
	let scorePoint = document.getElementsByClassName("score")[0];

	let display = pauseUI.style.display;
	display === "" || display === "none"
		? changeDisplay(pauseUI, "flex")
		: changeDisplay(pauseUI, "none");
	scorePoint.innerHTML = "Fruit eaten: "+score;
}

function addClassList(element, className) {
	let type = typeof element;
	if (type == "string") {
		let div = document.getElementsByClassName(element)[0];
		div.classList.add(className);
	} else if (type == "object") {
		element.classList.add(className);
	}
}

function App({ size }) {
	const board = useBoard(size);

	let inlineStyle = {
		gridTemplateColumns: "repeat(" + size + ", minmax(1px, 1fr))",
	};

	function pauseGame() {
		board.startStop();
		pauseScreen();
	}

	return (
		<>
			<div className="header">
				<a href="">Snake</a>
			</div>
			<div className="body">
				<Filler />
				<div className="wrapper">
					<div className="menu">
						<Menu additonal={board.startStop} />
					</div>
					<div className="board" style={inlineStyle}>
						<GameBoard board={board} pause={pauseGame} />
					</div>
					<div className="pause">
						<p className="score">score here</p>
						<button onClick={pauseGame}>continue</button>
					</div>
					<div className="result"></div>
					<div className="leader">board</div>
				</div>
				<Filler />
			</div>
			<div className="footer">
				Control: use W A S D to move, escape to pause.
				<br /> Goal is to control the snake to eat the fruit
			</div>
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
	}

	return (
		<>
			<button onClick={click}>Press Me To Start Game!</button>
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
		</>
	);
}

function Filler() {
	return (
		<>
			<div className="space"></div>
			<div className="space"></div>
			<div className="space"></div>
			<div className="space"></div>
		</>
	);
}

export { App, pauseScreen };
