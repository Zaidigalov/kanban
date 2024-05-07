import React, { useContext, useState } from 'react'
import { TaskContext } from '../context/context';
import { Link } from 'react-router-dom';

interface TaskProps {
	name: string,
	id: number,
}

export default function Task(props: TaskProps) {

	const [isOptionVisible, setIsOptionVisible] = useState(false)
	const { tasks, updateTasks } = useContext(TaskContext);

	function showOptionsHandler() {
		setIsOptionVisible(prev => !prev)
	}

	function deleteTaskHandler() {
		const updatedTasks = tasks.filter(task => task.id !== props.id)
		updateTasks(updatedTasks)
	}

	return (
		<div className="group__task" task-id={props.id} data-testid="task">
			<p className="task__name">{props.name}</p>
			<button className='task__settings' onClick={showOptionsHandler} data-testid="settings"></button>
			{isOptionVisible &&
				<div className="task__options">
					<Link to={`/edit?task=${props.id}`} className='options__item options__item_edit' data-testid="editButton">Edit</Link>
					<button className='options__item options__item_delete' onClick={deleteTaskHandler}>Delete</button>
				</div>}
		</div>
	)
}
