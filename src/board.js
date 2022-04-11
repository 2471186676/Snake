import React, { useState, useEffect } from "react";
import {
	createArray,
	fillArray,
	addToArray,
	searchAndDestory,
} from "./misc/2dArray";

function random(max) {
	return Math.floor(Math.random() * max);
}

function useBoard(size) {
	// create&fill game board
	const [board, setBoard] = useState(createArray(size, size));
	const snake = useSnake(size);

	const addFruit = () => {
		// add new fruit at random location
		let added = false;
		while (!added) {
			let x = random(size);
			let y = random(size);

			if (board[x][y] === "") {
				setBoard([...addToArray(board, [x, y], "F")]);
				added = true;
			}
		}
	};

	const update = () => {
		let newBoard = board;
		// remove snake
		searchAndDestory(newBoard, "S");
		// add snake
		snake.snake.forEach((body) => {
			newBoard[body[0]][body[1]] = "S";
		});
		setBoard([...newBoard]);

		console.log("update");
	};

	const move = () => {
		snake.move(size);
	};


	return { board, addFruit, setBoard, move, update, startStop };
}

function useSnake(bordSize) {
	let body = [
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
	];
	const [snake, setSnake] = useState(body);

	const add = (x, y) => {
		// new snake part is added at where
		let newSnake = snake;
		newSnake.splice(0, 0, [x, y]);
		setSnake([...newSnake]);
	};

	const move = (size) => {
		let newSnake = snake;
		let max = newSnake.length - 1;
		let newHead = [newSnake[max][0], newSnake[max][1] + 1];

		// check outOfBound
		if (newHead[1] < 10) {
			for (let i = 0; i < newSnake.length; i++) {
				if (i !== newSnake.length - 1) {
					newSnake[i] = newSnake[i + 1];
				} else {
					newSnake[i] = newHead;
				}
			}
		}

		setSnake(newSnake);
		console.log(newSnake);
	};

	return { snake, add, move };
}

export { useBoard };
