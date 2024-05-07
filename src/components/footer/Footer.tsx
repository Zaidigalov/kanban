import React, { useContext } from 'react'
import "../footer/footer.css"
import { TaskContext } from '../context/context';

export default function Footer() {
	const { tasks } = useContext(TaskContext);

	const activeTasks = tasks.filter(task => task.status === 'ready').length;
	const finishedTasks = tasks.filter(task => task.status === 'finished').length;

	return (
		<footer className='footer'>
			<p className="footer__active">Active tasks: <span>{activeTasks}</span></p>
			<p className="footer__finished">Finished tasks:<span>{finishedTasks}</span></p>
			<p className="footer__info">Kanban board by <span>Arthur</span>, <span>2024</span></p>
		</footer>
	)
}
