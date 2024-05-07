import React, { useState } from 'react'

export default function Avatar() {

	const [selected, setSelected] = useState(false)

	function showSelectionHandler() {
		setSelected(prev => !prev)
		document.querySelector(".avatar__button")?.classList.toggle("avatar__button_active");
	}

	return (
		<div className='header__avatar'>
			<div className="avatar__container">
				<img src="./images/user-avatar.svg" alt="" />
			</div>
			<button className='avatar__button' onClick={showSelectionHandler}></button>
			{selected ?
				<div className='avatar__selection'>
					<button className='selection__item'>Profile</button>
					<button className='selection__item'>Log Out</button>
				</div> : null}
		</div>
	)
}
