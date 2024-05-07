import React, { useContext, useEffect, useRef, useState } from 'react'
import { ITask, TaskContext } from '../context/context';

export default function AddButton() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { tasks, addTask } = useContext(TaskContext);

	const [isInputShowed, setIsInputShowed] = useState(false);
	const [buttonText, setButtonText] = useState('+ Add Card');
	const [buttonClassName, setButtonClassName] = useState('group__button');
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
				if (inputRef.current.value) return
				setIsInputShowed(false);
				setButtonText('+ Add Card');
				setButtonClassName('group__button');
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		changeButton()
		if (isInputShowed && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isInputShowed]);



	function toggleInputHandler() {
		setIsInputShowed(prev => !prev);

		if (isInputShowed) {
			createNewTask()
			setInputValue("")
		}
	}

	function changeButton() {
		if (isInputShowed === true) {
			setButtonText('Submit');
			setButtonClassName('group__button group__button_active');
		} else {
			setButtonText('+ Add Card');
			setButtonClassName('group__button');
		}
	}

	function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	function createNewTask() {
		const newTask: ITask = {
			"id": tasks.length,
			"name": inputValue,
			"status": "backlog",
			"description": "",
		}

		addTask(newTask);

	}

	return (
		<>
			{isInputShowed ? (
				<input
					ref={inputRef}
					className="group__input"
					type="text"
					placeholder=" "
					value={inputValue}
					onChange={changeHandler}
					data-testid="input"
				/>
			) : null}

			<button
				className={buttonClassName}
				onClick={toggleInputHandler}
				disabled={isInputShowed && inputValue.length === 0}
				data-testid="addButton"
			>
				{buttonText}
			</button>
		</>
	)
}
