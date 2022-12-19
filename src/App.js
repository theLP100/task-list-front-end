import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',

    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialCopy = TASKS.map((task) => {
    return { ...task };
  });
  const [tasksList, setTasksList] = useState(initialCopy);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        const newTasks = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: task.isComplete,
          };
        });
        setTasksList(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateComplete = (taskId, updateComplete) => {
    const newTasksList = [];
    for (const task of tasksList) {
      if (task.id !== taskId) {
        newTasksList.push(task);
      } else {
        const newTask = {
          ...task,
          isComplete: updateComplete,
        };
        newTasksList.push(newTask);
      }
    }
    setTasksList(newTasksList);
    //console.log(`task list is set ${newTasksList[0].isComplete}`);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={tasksList} updateComplete={updateComplete} />
        </div>
      </main>
    </div>
  );
};

export default App;
