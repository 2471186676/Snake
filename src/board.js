import React, { useState, useEffect } from "react";
import { createArray, fillArray, addToArray, searchAndDestory } from "./misc/2dArray";

function random(max) {
	return Math.floor(Math.random() * max);
}

function useBoard(size) {
	// create&fill game board
	const [board, setBoard] = useState(createArray(size, size));
	const snake = useSnake();

	const addFruit = () => {
		// add new fruit at random location
		let added = false;
		while (!added) {
			let x = random(size);
			let y = random(size);

			if (board[x][y] == "") {
				setBoard([...addToArray(board, [x, y], "F")]);
				added = true;
			}
		}
	};

	const update = () =>{
		let newBoard = board;
		// remove snake
		searchAndDestory(newBoard, "S");
		// add snake
		snake.snake.forEach(body =>{
			newBoard[body[0]][body[1]] = "S";
		})

		setBoard([...newBoard]);
	}



	return { board, addFruit, setBoard ,update};
}

function useSnake() {
	let body = [[0,1],[0,2],[0,3],[0,4]];
	const [snake, setSnake] = useState(body);

	const add = (locX, locY) => {
		body.push({
			x: locX,
			y: locY,
		});
	};

	return {snake};
}

export { useBoard };
