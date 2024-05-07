import React from 'react'
import "../header/header.css"
import Avatar from '../avatar/Avatar'

export default function Header() {
	return (
		<header className="header">
			<p className="header__logo">Awesome Kanban Board</p>
			<Avatar />
		</header>
	)
}
