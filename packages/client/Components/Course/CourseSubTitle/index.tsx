import React from 'react';
// import style from '../index.module.css';

type Props = {
	isOpen: boolean
}
const CourseSubtitle = ({ isOpen }: Props) => {
	if (!isOpen) return null;
	return (
		<div className="bg-[#484848] rounded-[15px] p-4 mt-4 text-white">
			<ul className="p-0 m-0">
				<li className="flex flex-col sm:flex-row items-start sm:items-center p-2 hover:bg-white/10 hover:rounded-md">
					<span className="mr-6 text-sm shrink-0">00:00</span>
					<p className="text-sm">
						Sorry can't answer your call at the moment Sorry can't answer your call at the moment Sorry can't answer your call at the moment Sorry can't answer your call at the moment
					</p>
				</li>
				<li className="flex flex-col sm:flex-row items-start sm:items-center p-2 hover:bg-white/10 hover:rounded-md">
					<span className="mr-6 text-sm shrink-0">00:02</span>
					<p className="text-sm">Sorry can't answer your call at the moment</p>
				</li>
				<li className="flex flex-col sm:flex-row items-start sm:items-center p-2 hover:bg-white/10 hover:rounded-md">
					<span className="mr-6 text-sm shrink-0">00:04</span>
					<p className="text-sm">Sorry can't answer your call at the moment</p>
				</li>
				<li className="flex flex-col sm:flex-row items-start sm:items-center p-2 hover:bg-white/10 hover:rounded-md">
					<span className="mr-6 text-sm shrink-0">00:06</span>
					<p className="text-sm">Sorry can't answer your call at the moment</p>
				</li>
			</ul>
		</div>
	);
};

export default CourseSubtitle;
