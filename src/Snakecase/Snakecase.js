import React from 'react';

import './Snakecase.css';

import Header from './Header';
import Footer from './Footer';

import {getRowMarkings, getColumnMarkings} from './Markings';

const rows = 18, columns = 32;
const directions = {Up: 0, Right: 1, Down: 2, Left: 3};
const levelLength = 5;
const levelBonus = 20;



export default function Snakecase () {
	const [pause, setPause] = React.useState(true);
	const [direction, setDirection] = React.useState(directions.Right);
	const [score, setScore] = React.useState(0);

	const [level, setLevel] = React.useState(1);
	const [calories, setCalories] = React.useState(0);

	const [height, setHeight] = React.useState(0);
	const [width, setWidth] = React.useState(0);

	const [length, setLength] = React.useState(5);
	const [positions, setPositions] = React.useState([
		[5, 6], [5, 5],
		[5, 4], [5, 3],
		[5, 2]
	]);

	const [foodPosition, setFoodPosition] = React.useState([-5, -5]);
	const [foodLife, setFoodLife] = React.useState(0);
	const maxFoodLife = rows + columns;

	let rowHeight = Math.floor(height / rows);
	let columnWidth = Math.floor(width / columns);

	let snakeBlocksStyle = {
		width: (columnWidth-1) + "px",
		height: (rowHeight-1) + "px",
	};
	let snakeBlocks = positions.map((p, i) => {
		let styles = {
			left: ((p[1] % columns) * columnWidth) + "px",
			top: ((p[0] % rows) * rowHeight) + "px",
			...snakeBlocksStyle
		};

		return <div key={i} className="SnakeBlock" style={styles}>
			<div></div>
		</div>;
	});

	let food = <div className="Food" style={{
		left: ((foodPosition[1] % columns) * columnWidth) + "px",
		top: ((foodPosition[0] % rows) * rowHeight) + "px",
		...snakeBlocksStyle
	}}></div>;

	function setDimensions () {
		setHeight(document.getElementById("Maze").offsetHeight);
		setWidth(document.getElementById("Maze").offsetWidth);
		console.log(`W: ${width} \t H: ${height}`);
	}

	React.useEffect(function () {
		setDimensions();
	}, []);

	function cellIsEmpty (x, y) {
		for (let position of positions) {
			if (x === position[0] && y === position[1]) {
				return false;
			}
		}
		return true;
	}

	function getRandomEmptyCell () {
		while (true) {
			let x = Math.floor(Math.random() * rows);
			let y = Math.floor(Math.random() * columns);
			if (cellIsEmpty(x, y)) return [x, y];
		}
	}

	function updateGame () {
		if (pause) return;
		let [x, y] = [...positions[0]];
		switch (direction) {
			case directions.Up: x--; break;
			case directions.Right: y++; break;
			case directions.Down: x++; break;
			case directions.Left: y--; break;
		}
		x = (x + rows) % rows;
		y = (y + columns) % columns;
		let newPositions = [[x, y], ...positions];
		let justHadDinner = false;
		if (x === foodPosition[0] && y === foodPosition[1]) {
			let scoreAdder = Math.ceil(foodLife * 10 / maxFoodLife);
			if (calories + 1 === levelLength) {
				// current level is complete
				setLevel(level => level + 1);
				setScore(score => score + scoreAdder + levelBonus);
				setCalories(0);
			} else {
				setScore(score => score + scoreAdder);
				setCalories(calories => calories + 1);
			}
			justHadDinner = true;
		} else {
			newPositions.pop();
		}
		setPositions(newPositions);

		if (justHadDinner || foodLife === 0) {
			let [fx, fy] = getRandomEmptyCell();
			setFoodPosition([fx, fy]);
			setFoodLife(maxFoodLife);
		} else {
			setFoodLife(foodLife => (foodLife-1));
		}
	}

	function processKeyboardInput (event) {
		let keyCode = event.keyCode;
		if (event.altKey || event.shiftKey || event.ctrlKey) return;
		event.preventDefault();

		if (keyCode === 32) {
			// spacebar was pressed
			setPause(pause => !pause);
			return;
		}

		// no direction changes when the games is paused
		if (pause) return;

		switch (keyCode) {
			case 37: if (direction === directions.Up || direction === directions.Down) setDirection(directions.Left); break;
			case 38: if (direction === directions.Left || direction === directions.Right) setDirection(directions.Up); break;
			case 39: if (direction === directions.Up || direction === directions.Down) setDirection(directions.Right); break;
			case 40: if (direction === directions.Left || direction === directions.Right) setDirection(directions.Down); break;
			default: console.log(`Key: ${keyCode}`);
		}
	}

	React.useEffect(function () {
		document.addEventListener('keydown', processKeyboardInput, false);
		window.addEventListener('resize', setDimensions);
		const id = setInterval(updateGame, 250);

		return function cleanup () {
			document.removeEventListener('keydown', processKeyboardInput, false);
			window.removeEventListener('resize', setDimensions);
			clearInterval(id);
		};
	});

	let headerProps = {
		direction, foodLife,
		level, levelLength, calories,
		pause, score
	};

	return (
		<div className="Snakecase bg-slate-300 text-white font-bold select-none">
			<div className="max-w-4xl mx-auto min-h-screen flex flex-col gap-y-2">
				<Header {...headerProps} />
				<div id="Maze" className="grow flex bg-slate-50 relative overflow-hidden border-4 border-slate-400">
					<div className="relative m-auto" style={{
						height: (rows * rowHeight) + "px",
						width: (columns * columnWidth) + "px"
					}}>
						{getRowMarkings(rows, rowHeight)}
						{getColumnMarkings(columns, columnWidth)}
						<div>
							{food}
						</div>
						<div>
							{snakeBlocks}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
