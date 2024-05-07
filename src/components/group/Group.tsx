import React, { useContext } from 'react';
import "../group/group.css";
import { TaskContext } from '../context/context';
import Task from '../task/Task';
import AddButton from '../addButton/AddButton';
import SelectButton from '../selectButton/SelectButton';


interface GroupProps {
	className: string;
	title: string;
}

export default function Group(props: GroupProps) {

	const groupName = props.className.slice(props.className.indexOf('__') + 2)

	const groupClassName = `group ${props.className}`;
	const { tasks } = useContext(TaskContext);


	const filteredTasks = tasks.filter(task => task.status === groupName);

	return (
		<section className={groupClassName}>
			<p className="group__title">{props.title}</p>

			{filteredTasks.map(task => (
				<Task name={task.name} key={task.id} id={task.id}></Task>
			))}

			{groupClassName.includes('backlog') ? <AddButton></AddButton> :
				<SelectButton className={groupName}></SelectButton>}

		</section>
	);
}
