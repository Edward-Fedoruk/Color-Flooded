const createArr = (table, value) => {
	for(let i = 0; i < 10; i++) {
		table.push(new Array(10));
		for(let j = 0; j < 10; j++) {
			table[i][j] = {numb: value()};
		}
	}
	return table;
}

const checkLeft = (row, cell, table) => cell - 1 >= 0 && table[row][cell - 1].numb === table[0][0].numb;
const checkTop = (row, cell, table) => row - 1 >= 0 && table[row - 1][cell].numb === table[0][0].numb;
const checkRight = (row, cell, table) => cell + 1 < table.length && table[row][cell + 1].numb === table[0][0].numb;
const checkBottom = (row, cell, table) => row + 1 < table.length && table[row + 1][cell].numb === table[0][0].numb;

const checkAround = table => {
	let firstElem = table[0][0];
	table[0][0].flooded = true;
	for(let i = 0; i < table.length; i++) {
		for(let j = 0; j < table.length; j++) {
			if(checkLeft(i, j, table) && checkFlooded(i, j - 1, table))
				table[i][j - 1].flooded = true;
			
//			if(j - 1 >= 0 && table[i][j - 1].numb === firstElem.numb && checkFlooded(i, j - 1, table))
//				table[i][j - 1].flooded = true;
			
			if(checkTop(i, j, table) && checkFlooded(i - 1, j, table)) 
				table[i - 1][j].flooded = true;
			
			if(checkRight(i, j, table) && checkFlooded(i, j + 1, table))
				table[i][j + 1].flooded = true;
			
			if(i + 1 < table.length && table[i + 1][j].numb === firstElem.numb && checkFlooded(i + 1, j, table)) 
				table[i + 1][j].flooded = true;
		}
	}
	return table;
}

const checkFlooded = (row, cell, table) => {
	if( cell - 1 >= 0 && table[row][cell - 1].flooded === true ) return true;
	else if( row - 1 >= 0 && table[row - 1][cell].flooded === true ) return true;
	else if( cell + 1 < table[row].length && table[row][cell + 1].flooded === true ) return true;
	else if( row + 1 < table.length && table[row + 1][cell].flooded === true ) return true;
	else return false;
}

const renderDOM = (table, grid) => {
	for(let i = 0; i < table.length; i++) {
		for(let j = 0; j < table[i].length; j++) {
			let elem = table[i][j].numb;
			let cell = document.createElement("div");
			cell.classList.add("cell-10")
			if(elem === 1) cell.classList.add("red");
			else if(elem === 2) cell.classList.add("yellow");
			else if(elem === 3) cell.classList.add("blue");
			else if(elem === 4) cell.classList.add("green");
			else if(elem === 5) cell.classList.add("orange");
			grid.appendChild(cell);
		}
	}
}

const clearDOM = grid => { 
	while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
	}
}

let table;
const gameStart = () => {
	clearDOM(grid);
	table = createArr([], () => Math.floor(Math.random() * 5 + 1) );
	const around = checkAround(table);
	renderDOM(table, grid);
}

const changeFlooded = (color, table) => {
	for(let i = 0; i < table.length; i++) {
		for(let j = 0; j < table.length; j++) {
			console.log(table[i][j].flooded);
			if(table[i][j].flooded) table[i][j].numb = color;
		}
	}
	checkAround(table);
	clearDOM(grid);
	renderDOM(table, grid);
} 

const changeColor = e => {
	const colorOfPicker = e.target.classList[0];
	if(colorOfPicker === "red") changeFlooded(1, table);
	else if(colorOfPicker === "yellow") changeFlooded(2, table);		
	else if(colorOfPicker === "blue") changeFlooded(3, table); 	
	else if(colorOfPicker === "green") changeFlooded(4, table); 	
	else if(colorOfPicker === "orange") changeFlooded(5, table);
	else return 0;
}

const start = document.querySelector(".start");
const pickers = document.querySelector(".color-pickers");
const grid = document.querySelector(".grid");

pickers.addEventListener("click", changeColor);
start.addEventListener("click", gameStart);