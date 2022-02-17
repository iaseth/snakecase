import './Markings.css';



export function getRowMarkings (rows, rowHeight) {
	let rowMarkings = [...Array(rows + 1)].map((v, i) => {
		let styles = {
			top: (i * rowHeight - 1) + "px"
		};
		return <div key={i} className="RowMarking" style={styles}></div>;
	});
	return rowMarkings;
}

export function getColumnMarkings (columns, columnWidth) {
	let columnMarkings = [...Array(columns + 1)].map((v, i) => {
		let styles = {
			left: (i * columnWidth - 1) + "px"
		};
		return <div key={i} className="ColumnMarking" style={styles}></div>;
	});
	return columnMarkings;
}
