/* eslint-disable camelcase */
//import css for this sheet.
import PropTypes from 'prop-types';
import React from 'react';

import { useState } from 'react';

const INITIAL_FORM_DATA = {
  title: 'Do this thing',
  description: 'description',
};

const NewTaskForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    let datafield = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: datafield,
    };
    console.log(newFormData);
    setFormData(newFormData);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    props.addTaskCallbackFunc(formData);
  };

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <label htmlFor="title">Task Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="description">description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};
NewTaskForm.propTypes = {
  addTaskCallbackFunc: PropTypes.func.isRequired,
};
export default NewTaskForm;
