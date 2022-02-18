


export default function Header ({
	direction, foodLife,
	level, levelLength, calories,
	pause, score
}) {

	return (
		<div className="Header bg-slate-800 text-sm flex items-stretch">

			<div className="grow px-4 py-2 flex">
				<div className="text-base my-auto pt-1">Level</div>
				<div className="text-3xl ml-2">{level}</div>
			</div>

			<div className="px-2 py-1 w-12 flex bg-slate-700 border-y-4 border-green-500">
				<div className="grow my-auto text-right text-base">
					{calories} | {levelLength}
				</div>
			</div>

			<div className="px-2 py-1 w-12 flex bg-slate-700 border-y-4 border-green-500">
				<div className="grow my-auto text-right text-base">
					{foodLife}
				</div>
			</div>

			<div className="px-2 py-1 w-28 flex bg-slate-900">
				<div className="grow my-auto text-right text-2xl">
					{score}
				</div>
			</div>

		</div>
	);
}
