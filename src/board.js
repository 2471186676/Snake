import React, { useState, useEffect } from "react";
import { createArray, fillArray, addToArray } from "./misc/2dArray";

function random(max) {
	return Math.floor(Math.random() * max);
}

function useBoard(size) {
	// create&fill game board
	const [board, setBoard] = useState(createArray(size, size));

	const addFruit = () => {
		// check no fruit on board

		// add new fruit at random location
		let added = false;
		while (!added) {
			let x = random(size);
			let y = random(size);

			if (board[x][y] == "") {
				setBoard([...addToArray(board, [x, y], "H")]);
				added = true;
			}
		}
	};

	return { board, addFruit, setBoard };
}

function snake() {
	let body = [];

	const add = (locX, locY) => {
		body.push({
			x: locX,
			y: locY,
		});
	};

	return body, add;
}

export { useBoard };
