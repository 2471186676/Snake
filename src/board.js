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

	const update = (key) => {
		snake.move(size, key);
		let newBoard = board;
		// remove snake
		searchAndDestory(newBoard, "S");
		// add snake
		snake.snake.forEach((body) => {
			newBoard[body[0]][body[1]] = "S";
		});
		setBoard([...newBoard]);

		// console.log("update");
	};


	return { board, addFruit, setBoard, update };
}

function useSnake(bordSize) {
	let body = [
		[3, 1],
		[3, 2],
		[3, 3],
		[3, 4],
	];
	const [snake, setSnake] = useState(body);

	const add = (x, y) => {
		// new snake part is added at where
		let newSnake = snake;
		newSnake.splice(0, 0, [x, y]);
		setSnake([...newSnake]);
	};

	const move = (size, key) => {
		let newSnake = snake;
		let max = newSnake.length - 1;
		key = key.toLowerCase();
		let newHead;

		// go right
		switch (key) {
			case "w":
				newHead = [newSnake[max][0] - 1, newSnake[max][1]];
				// check outOfBound
				if (possibleMove(newHead[0], newHead[1], size)) {
					for (let i = 0; i < newSnake.length; i++) {
						if (i !== newSnake.length - 1) {
							newSnake[i] = newSnake[i + 1];
						} else {
							newSnake[i] = newHead;
						}
					}
				}
				break;
			case "a":
				newHead = [newSnake[max][0], newSnake[max][1] - 1];
				// check outOfBound
				if (possibleMove(newHead[0], newHead[1], size)) {
					for (let i = 0; i < newSnake.length; i++) {
						if (i !== newSnake.length - 1) {
							newSnake[i] = newSnake[i + 1];
						} else {
							newSnake[i] = newHead;
						}
					}
				}
				break;
			case "s":
				newHead = [newSnake[max][0]+1, newSnake[max][1]];
				// check outOfBound
				if (possibleMove(newHead[0], newHead[1], size)) {
					for (let i = 0; i < newSnake.length; i++) {
						if (i !== newSnake.length - 1) {
							newSnake[i] = newSnake[i + 1];
						} else {
							newSnake[i] = newHead;
						}
					}
				}
				break;
			case "d":
				newHead = [newSnake[max][0], newSnake[max][1] + 1];
				// check outOfBound
				if (possibleMove(newHead[0], newHead[1], size)) {
					for (let i = 0; i < newSnake.length; i++) {
						if (i !== newSnake.length - 1) {
							newSnake[i] = newSnake[i + 1];
						} else {
							newSnake[i] = newHead;
						}
					}
				}
				break;
			case "escape":
				break;
			case undefined:
				break;
			default:
		}

		setSnake(newSnake);
		// console.log(newSnake);
	};

	const possibleMove = (x, y, size) => {
		let possibleMove = false;
	
		if (x >= 0 && x < size && y >= 0 && y < size) {
			possibleMove = true;
		}
		for (let i = 0; i < body.length; i++) {
			// console.log(x, y,"|", body[i][0], body[i][1], possibleMove);

			let impact = body[i][0] == x && body[i][1] == y;
			if(impact){
				i = body.length + 2;
				possibleMove = false;
			}
		}
		console.log(possibleMove)
		console.log("--------")


		return possibleMove;
	};

	return { snake, add, move };
}

export { useBoard };
