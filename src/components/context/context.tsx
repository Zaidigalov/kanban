import { createContext } from "react";
import { ITask } from "../../mockData";


interface IContext {
	tasks: ITask[];
	addTask: (task: ITask) => void;
	updateTasks: (tasks: ITask[]) => void;
}

const context: IContext = {
	tasks: [],
	addTask: (task) => { },
	updateTasks: (task) => { },
}



const TaskContext = createContext(context);

export { TaskContext }
export type { ITask }