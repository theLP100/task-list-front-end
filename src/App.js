/* eslint-disable camelcase */
import React from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',

    is_complete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    is_complete: true,
  },
];

const App = () => {
  const initialCopy = TASKS.map((task) => {
    return { ...task };
  });
  const [tasksList, setTasksList] = useState(initialCopy);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';
  //below, should i name this function? instead of it being anonymous?
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
            is_complete: task.is_complete,
          };
        });
        setTasksList(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteTask = (id) => {
    console.log('deleteTask called');
    axios.delete(`${URL}/${id}`).then(() => {
      const newTasksList = [];
      for (const task of tasksList) {
        if (task.id !== id) {
          newTasksList.push(task);
        }
      }
      setTasksList(newTasksList);
    });
  };

  const updateComplete = (taskId, updateComplete) => {
    const newTasksList = [];
    for (const task of tasksList) {
      if (task.id !== taskId) {
        newTasksList.push(task);
      } else {
        const newTask = {
          ...task,
          is_complete: updateComplete,
        };
        newTasksList.push(newTask);
      }
    }
    setTasksList(newTasksList);
    //console.log(`task list is set ${newTasksList[0].is_complete}`);
  };

  const addTask = (newTaskInfo) => {
    console.log('inside addTask: new task info is', newTaskInfo);
    axios
      .post(URL, newTaskInfo)
      .then((response) => {
        const newTasks = [...tasksList];
        const newTaskJSON = {
          ...newTaskInfo,
          id: response.data.id,
        };
        newTasks.push(newTaskJSON);
        setTasksList(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasksList}
            updateComplete={updateComplete}
            deleteTask={deleteTask}
          />
          <NewTaskForm addTaskCallbackFunc={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
