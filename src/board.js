import React, { useState, useEffect } from "react";
import {
	createArray,
	fillArray,
	addToArray,
	searchAndDestory,
} from "./misc/2dArray";

function useBoard(size) {
	// create&fill game board
	const [board, setBoard] = useState(createArray(size, size));
	const snake = useSnake(size);
	const fruit = useFruit();
	const [loop, setLoop] = useState(false);
	const [key, setKey] = useState("");
	const acceptedKey = ["w", "a", "s", "d", "escape"];

	useEffect(() => {
		const listenerFunction = (e) => {
			let input = e.key.toLocaleLowerCase();
			let accept = acceptedKey.find((i) => i == input);

			loop == true ? (accept = accept) : (accept = "");
			accept != undefined ? (accept = accept) : (accept = key);

			setKey(accept);
		};
		document.addEventListener("keydown", listenerFunction);

		let gameLoop = setInterval(() => {
			if (loop == true) {
				update(key);
			}else{
				// appear game end screen
			}
		}, 100);

		return () => {
			clearInterval(gameLoop);
			document.removeEventListener("keydown", listenerFunction);
		};
	}, [loop, key]);

	const update = (key) => {
		if (snake.move(key, fruit)) {
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
		}else{
			setLoop(false);
		}
	};

	const startStop = () => {
		loop === true ? setLoop(false) : setLoop(true);
	};

	const reset = () => {
		snake.reset();
		setBoard(createArray(size, size));
		fruit.reset();
		setKey("");
		setLoop(false);
	};

	return { board, setBoard, update, reset, startStop };
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
		let possible = true;
		let newSnake = snake;
		let max = newSnake.length - 1;
		key = key.toLowerCase();
		let newHead;

		const checkMove = (x, y) => {
			let possible = true;

			// check if snake eat fruit
			if (fruit[0] == x && fruit[1] == y) {
				body.push(fruit);
			} else if (possibleMove(x, y, bordSize)) {
				for (let i = 0; i < newSnake.length; i++) {
					if (i !== newSnake.length - 1) {
						newSnake[i] = newSnake[i + 1];
					} else {
						newSnake[i] = newHead;
					}
				}
			} else {
				possible = false;
			}
			return possible;
		};

		switch (key) {
			case "w":
				newHead = [newSnake[max][0] - 1, newSnake[max][1]];
				possible = checkMove(newHead[0], newHead[1]);
				break;
			case "a":
				newHead = [newSnake[max][0], newSnake[max][1] - 1];
				possible = checkMove(newHead[0], newHead[1]);
				break;
			case "s":
				newHead = [newSnake[max][0] + 1, newSnake[max][1]];
				possible = checkMove(newHead[0], newHead[1]);
				break;
			case "d":
				newHead = [newSnake[max][0], newSnake[max][1] + 1];
				possible = checkMove(newHead[0], newHead[1]);
				break;
			case "escape":
				break;
			case undefined:
				break;
			default:
		}

		setSnake(newSnake);
		return possible;
	};

	const possibleMove = (x, y) => {
		let possibleMove = false;

		if (x >= 0 && x < bordSize && y >= 0 && y < bordSize) {
			possibleMove = true;
		}
		for (let i = 0; i < snake.length; i++) {
			let impact = snake[i][0] === x && snake[i][1] === y;
			if (impact) {
				i = snake.length + 2;
				possibleMove = false;
			}
		}

		return possibleMove;
	};

	const reset = () => {
		setSnake(body);
	};

	return { snake, add, move, reset };
}

function useFruit() {
	const defaultLoc = [1, 1];
	const [fruit, setFruit] = useState(defaultLoc);

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

	const reset = () => {
		setFruit(defaultLoc);
	};

	return { fruit, create, reset };
}

function random(max) {
	return Math.floor(Math.random() * max);
}

export { useBoard };
