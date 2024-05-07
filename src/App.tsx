import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { ITask, TaskContext } from './components/context/context';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  const storageTasks: ITask[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  const [tasks, setAllTasks] = useState<ITask[]>(storageTasks);

  function addTask(newTask: ITask) {
    setAllTasks(tasks => [...tasks, newTask]);
  }

  function updateTasks(updatedTasks: ITask[]) {
    setAllTasks(updatedTasks);
  }


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <HashRouter>
      <TaskContext.Provider value={{ tasks, addTask, updateTasks }}>
        <div className="App">
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
        </div>
      </TaskContext.Provider>
    </HashRouter>
  );
}

export default App;
