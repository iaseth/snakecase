import React from 'react';

import './Snakecase.css';

import Header from './Header';
import Footer from './Footer';



export default function Snakecase () {
	const rows = 27, columns = 48;
	const directions = {Up: 0, Right: 1, Down: 2, Left: 3};

	const [pause, setPause] = React.useState(true);
	const [direction, setDirection] = React.useState(directions.Right);

	const [height, setHeight] = React.useState(0);
	const [width, setWidth] = React.useState(0);

	const [length, setLength] = React.useState(5);
	const [positions, setPositions] = React.useState([
		[5, 6], [5, 5],
		[5, 4], [5, 3],
		[5, 2]
	]);

	let rowHeight = Math.round(height / rows);
	let columnWidth = Math.round(width / columns);

	let snakeBlocks = positions.map((p, i) => {
		let styles = {
			width: (columnWidth-2) + "px",
			height: (rowHeight-2) + "px",
			left: ((p[1] % columns) * columnWidth) + "px",
			top: ((p[0] % rows) * rowHeight) + "px"
		};

		return <div key={i} className="SnakeBlock" style={styles}>
			<div></div>
		</div>;
	});

	let rowMarkings = [...Array(rows)].map((v, i) => {
		let styles = {
			top: ((i % rows) * rowHeight - 1) + "px"
		};
		return <div key={i} className="RowMarking" style={styles}></div>;
	});

	let columnMarkings = [...Array(columns)].map((v, i) => {
		let styles = {
			left: ((i % columns) * columnWidth - 1) + "px"
		};
		return <div key={i} className="ColumnMarking" style={styles}></div>;
	});



	function setDimensions () {
		setHeight(document.getElementById("Maze").offsetHeight);
		setWidth(document.getElementById("Maze").offsetWidth);
		console.log(`W: ${width} \t H: ${height}`);
	}

	React.useEffect(function () {
		setDimensions();
	}, []);

	function updateGame () {
		if (pause) return;
		let newCell = [...positions[0]];
		switch (direction) {
			case directions.Up: newCell[0]--; break;
			case directions.Right: newCell[1]++; break;
			case directions.Down: newCell[0]++; break;
			case directions.Left: newCell[1]--; break;
		}
		let newPositions = [newCell, ...positions];
		newPositions.pop();
		setPositions(newPositions);
	}

	function processKeyboardInput (event) {
		let keyCode = event.keyCode;
		if (event.altKey || event.shiftKey || event.ctrlKey) return;
		event.preventDefault();

		switch (keyCode) {
			case 37: setDirection(directions.Left); break;
			case 38: setDirection(directions.Up); break;
			case 39: setDirection(directions.Right); break;
			case 40: setDirection(directions.Down); break;
			case 32: setPause(pause => !pause); break;
			default: console.log(`Key: ${keyCode}`);
		}
	}

	React.useEffect(function () {
		document.addEventListener('keydown', processKeyboardInput, false);
		window.addEventListener('resize', setDimensions);
		const id = setInterval(updateGame, 400);

		return function cleanup () {
			document.removeEventListener('keydown', processKeyboardInput, false);
			window.removeEventListener('resize', setDimensions);
			clearInterval(id);
		};
	});

	return (
		<div className="Snakecase bg-slate-300">
			<div className="max-w-4xl mx-auto min-h-screen flex flex-col gap-y-2">
				<Header />
				<div id="Maze" className="grow bg-slate-50 relative overflow-hidden border-4 border-slate-400">
					{rowMarkings}
					{columnMarkings}
					<div>
						{snakeBlocks}
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
