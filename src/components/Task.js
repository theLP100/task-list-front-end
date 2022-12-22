import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, is_complete, updateComplete }) => {
  const buttonClass = is_complete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => updateComplete(id, !is_complete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  is_complete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func.isRequired,
};

export default Task;
