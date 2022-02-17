


export default function Header ({
	direction, score
}) {

	return (
		<div className="Header bg-slate-800 text-sm flex items-stretch">
			<div className="grow px-4 py-4">
				<h2>Snakecase</h2>
			</div>
			<div className="px-2 py-1 w-28 flex bg-slate-900">
				<div className="grow my-auto text-right text-2xl">
					{score}
				</div>
			</div>
		</div>
	);
}
