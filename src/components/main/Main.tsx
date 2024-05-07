import React from 'react'
import "../main/main.css"
import { Routes, Route } from 'react-router-dom';
import Group from '../group/Group'
import EditPage from '../editPage/EditPage'

export default function Main() {

	return (
		<main className='main'>
			<Routes>
				<Route path="/edit" element={<EditPage />} />
				<Route path="/" element={
					<section className='groups'>
						<Group className='group__backlog' title='Backlog'></Group>
						<Group className='group__ready' title='Ready'></Group>
						<Group className='group__progress' title='In Progress'></Group>
						<Group className='group__finished' title='Finished'></Group>
					</section>} />
			</Routes>
		</main>
	)
}
