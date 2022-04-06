const Board = (size) => {
	let board = Array.from(Array(size), () => new Array(size));
	// for (let x = 0; x < board.length; x++) {
	// 	for (let y = 0; y < board[0].length; y++) {
	// 		board[x][y] = "";
	// 	}
	// }

	const snake = SnakeHead(2, 2);

	const update = () => {
        console.log("update board")
		// clear board
		for (let x = 0; x < board.length; x++) {
			for (let y = 0; y < board[0].length; y++) {
				board[x][y] = "";
			}
		}

		// add snakeHead
		let sneakH = snake.getHeadLoc();
		board[sneakH[0]][sneakH[1]] = "H";
	};

	const change = (x, y, ele) => {
        console.log("changes")
		board[x][y] = ele;
	};

	const get = () => board;

	return { size, get, change, update };
};

const SnakeHead = (x, y) => {
	const getHeadLoc = () => [x, y];

	return { getHeadLoc };
};

export default Board;
