import React, { useState, useEffect } from "react";
import { createArray, fillArray, searchAndReturnInt } from "./misc/2dArray";

const changeDisplay = (element, style) => {
	let type = typeof element;
	if (type == "string") {
		let div = document.getElementsByClassName(element)[0];
		div.style.display = style;
	} else if (type == "object") {
		element.style.display = style;
	}
};

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

			// pause or unpause
			if (accept == "escape") {
				startStop();
				accept = key;
			}
			// if unknow input, use last known key
			if (accept == undefined) {
				accept = key;
			}
			setKey(accept);
		};

		let gameLoop;

		document.addEventListener("keydown", listenerFunction);
		if (loop) {
			gameLoop = setInterval(() => {
				update(key);
			}, 100);
		}

		return () => {
			clearInterval(gameLoop);
			document.removeEventListener("keydown", listenerFunction);
		};
	}, [loop, key]);

	const update = (key) => {
		if (snake.move(key)) {
			let newBoard = board;
			// remove snake
			fillArray(newBoard, "");
			// add snake
			snake.snake.forEach((body) => {
				newBoard[body[0]][body[1]] = "S";
			});

			if (fruit.create(newBoard, snake.add)) {
				let newFruit = fruit.fruit;
				newBoard[newFruit[0]][newFruit[1]] = "F";
			} else {
				setLoop(false);
			}

			setBoard([...newBoard]);
		} else {
			// gameOver
			console.log(fruit.score);
			setLoop(false);
			// appear pause screen
			let pauseUI = document.getElementsByClassName("pause")[0];
			let display = pauseUI.style.display;
			display === "" || display === "none"
				? changeDisplay(pauseUI, "flex")
				: changeDisplay(pauseUI, "none");
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

	return { board, setBoard, update, reset, startStop, score: fruit.score };
}

function useSnake(bordSize) {
	let body = [
		[3, 1],
		[3, 2],
		[3, 3],
		[3, 4],
	];
	const [snake, setSnake] = useState(body);
	const [lastAction, setLastAction] = useState("d");
	// a & d
	// w & s

	const add = (x, y) => {
		// new snake part is added at where
		let newSnake = snake;
		newSnake.splice(0, 0, [x, y]);
		setSnake([...newSnake]);
	};

	const move = (key) => {
		let possible = true;
		let newSnake = snake;
		let max = newSnake.length - 1;
		key = key.toLowerCase();
		let newHead;

		// prevent going backward, do last action instead
		if (
			(key == "a" && lastAction == "d") ||
			(key == "d" && lastAction == "a") ||
			(key == "w" && lastAction == "s") ||
			(key == "s" && lastAction == "w")
		) {
			key = lastAction;
		}

		const checkMove = (x, y) => {
			let possible = possibleMove(x, y, bordSize);

			if (possible) {
				for (let i = 0; i < newSnake.length; i++) {
					if (i !== newSnake.length - 1) {
						newSnake[i] = newSnake[i + 1];
					} else {
						newSnake[i] = newHead;
					}
				}
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
			default:
			// do nothing
		}

		setSnake(newSnake);
		setLastAction(key);
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
	const [score, setScore] = useState(1);

	const create = (board, growSnake) => {
		let canCreateFruit = true;
		// check if fruit is eaten, if eaten create new fruit
		if (board[fruit[0]][fruit[1]] == "S") {
			// this is so scuffed, blame how setState work
			setScore(score + 1);
			growSnake(fruit[0], fruit[1]);

			// check if board is full
			// console.log(searchAndReturnInt(board, "S"));
			let boardSize = board.length * board.length;

			if (score + 1 < boardSize) {
				let newFruit = fruit;
				newFruit[0] = random(10);
				newFruit[1] = random(10);
				setFruit([...newFruit]);
			} else {
				canCreateFruit = false;
			}
		}

		return canCreateFruit;
	};

	const reset = () => {
		setFruit(defaultLoc);
		setScore(1);
	};

	return { fruit, create, reset, score };
}

function random(max) {
	return Math.floor(Math.random() * max);
}

export { useBoard };
