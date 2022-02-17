


export function ExternalLink ({href, children}) {
	return (
		<a href={href} target="_blank" rel="noreferrer" className="font-bold border-b-2 border-blue-500 duration-300 pb-[1px] text-blue-500 hover:text-blue-300 hover:border-blue-300">{children}</a>
	);
}


