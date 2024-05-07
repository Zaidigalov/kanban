interface ITask {
	id: number
	name: string;
	description: string;
	status: string;
}

const TASKS:ITask[] = [
	{
		"id": 0,		
		"name": "Вырастить сына",
		"description": "",
		"status": "backlog",
	},
	{
		"id": 1,		
		"name": "Посадить дерево",
		"description": "",
		"status": "backlog",
	},
	{
		"id": 2,		
		"name": "Построить дом",
		"description": "",
		"status": "backlog",
	},
]

export { TASKS };
export type { ITask };