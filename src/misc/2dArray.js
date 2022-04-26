// create 2d
//Array.from(Array(size), () => new Array(size));array

function createArray(row, column) {
    let toRe = Array.from(Array(row), () => new Array(column));
    fillArray(toRe,"");

	return  toRe;
}

function fillArray(array, elem) {
	let toRe = array;
	for (let x = 0; x < toRe.length; x++) {
		for (let y = 0; y < toRe[0].length; y++) {
			toRe[x][y] = elem;
		}
	}
	return toRe;
}

function addToArray(array, loc, elem) {
	let toRe = array;
    toRe[loc[0]][loc[1]] = elem;

    return toRe;
}

function searchAndDestory(array, elem){
    let toRe = array;

    for (let x = 0; x < toRe.length; x++) {
		for (let y = 0; y < toRe[0].length; y++) {
            if(toRe[x][y] === elem ){
                toRe[x][y] = "";
            }
		}
	}
}

function searchAndReturnInt(array, elem){
	let amount = 0;
	for(let x = 0; x < array.length; x++){
		for(let y = 0; y < array[x].length; y++){
			if(array[x][y] === elem){
				amount++;
			}
		}
	}

	return amount;
}

export { createArray, fillArray, addToArray , searchAndDestory, searchAndReturnInt};
