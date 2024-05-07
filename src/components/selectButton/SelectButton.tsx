import React, { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../context/context';

interface SelectButtonProps {
	className: string;
}

interface IPrevGroupClassName {
	ready: string;
	progress: string;
	finished: string;
}

const PrevGroupClassName: IPrevGroupClassName = {
	"ready": "backlog",
	"progress": "ready",
	"finished": "progress",
}
export default function SelectButton(props: SelectButtonProps) {
	const [buttonClassName, setButtonClassName] = useState(`group__button button__select select_${props.className}`)
	const selectRef = useRef<HTMLButtonElement>(null);
	const { tasks, updateTasks } = useContext(TaskContext);
	const currentTasks = tasks.filter(task => task.status === PrevGroupClassName[props.className as keyof IPrevGroupClassName])
	const [isSelectShowed, setIsSelectShowed] = useState(false);

	useEffect(() => {
		if (isSelectShowed) {
			setButtonClassName(prev => `${prev} button__select_active`)
		} else setButtonClassName(`group__button button__select select_${props.className}`)
	}, [isSelectShowed, props.className]);


	function toggleSelectHandler() {
		if (selectRef.current!.classList.contains("button__select_disabled")) return
		setIsSelectShowed(prev => !prev);
	}

	function selectTaskHandler(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		const taskID: string | null = e.currentTarget.getAttribute('data-key');
		if (!taskID) return;
		const updatedTasks = tasks.map(task => {
			if (task.id.toString() === taskID) {
				return { ...task, status: props.className };
			}
			return task;
		});
		updateTasks(updatedTasks);
		setIsSelectShowed(prev => !prev);
	}

	return (
		<>
			<button
				ref={selectRef}
				className={buttonClassName}
				onClick={toggleSelectHandler}
				disabled={currentTasks.length === 0}
			>	+ Add Card
			</button>

			{isSelectShowed &&

				<ul className='select__list'>
					{currentTasks.map((task) => {
						return <li key={task.id} data-key={task.id} onClick={selectTaskHandler}>{task.name}</li>
					})
					}
				</ul>
			}
		</>
	)
}
