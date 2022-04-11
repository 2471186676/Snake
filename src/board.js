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
	const fruit = useFruit();

	const update = (key) => {
		snake.move(key, fruit);
		let newBoard = board;
		// remove snake
		fillArray(newBoard, "");
		// add snake
		snake.snake.forEach((body) => {
			newBoard[body[0]][body[1]] = "S";
		});

		fruit.create(newBoard, snake.add);
		let newFruit = fruit.fruit;
		newBoard[newFruit[0]][newFruit[1]] = "F";

		setBoard([...newBoard]);
	};

	return { board, setBoard, update };
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

	const move = (key, fruit) => {
		let newSnake = snake;
		let max = newSnake.length - 1;
		key = key.toLowerCase();
		let newHead;

		const checkMove = (x, y) => {
			if (fruit[0] == x && fruit[1] == y) {
				//grow snake
				body.push(fruit);
			} else if (possibleMove(x, y, bordSize)) {
				for (let i = 0; i < newSnake.length; i++) {
					if (i !== newSnake.length - 1) {
						newSnake[i] = newSnake[i + 1];
					} else {
						newSnake[i] = newHead;
					}
				}
			}
		};

		// go right
		switch (key) {
			case "w":
				newHead = [newSnake[max][0] - 1, newSnake[max][1]];
				// check outOfBound
				checkMove(newHead[0], newHead[1]);
				break;
			case "a":
				newHead = [newSnake[max][0], newSnake[max][1] - 1];
				// check outOfBound
				checkMove(newHead[0], newHead[1]);
				break;
			case "s":
				newHead = [newSnake[max][0] + 1, newSnake[max][1]];
				// check outOfBound
				checkMove(newHead[0], newHead[1]);
				break;
			case "d":
				newHead = [newSnake[max][0], newSnake[max][1] + 1];
				// check outOfBound
				checkMove(newHead[0], newHead[1]);
				break;
			case "escape":
				break;
			case undefined:
				break;
			default:
		}

		setSnake(newSnake);
	};

	const possibleMove = (x, y) => {
		let possibleMove = false;

		if (x >= 0 && x < bordSize && y >= 0 && y < bordSize) {
			possibleMove = true;
		}
		for (let i = 0; i < body.length; i++) {
			let impact = body[i][0] == x && body[i][1] == y;
			if (impact) {
				i = body.length + 2;
				possibleMove = false;
			}
		}
		return possibleMove;
	};

	return { snake, add, move };
}

function useFruit() {
	const [fruit, setFruit] = useState([1, 1]);

	const create = (board, growSnake) => {
		if (board[fruit[0]][fruit[1]] == "S") {
			// this is so scuffed, blame how setState work
			growSnake(fruit[0], fruit[1]);

			let abc = fruit;
			abc[0] = random(10);
			abc[1] = random(10);
			setFruit([...abc]);
		}
	};

	return { fruit, create };
}
export { useBoard };
