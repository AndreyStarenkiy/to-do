import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = (props) => {
  const { onDeleted, toggleDone, filterMode } = props;

  const elements = props.todos.map((item) => {
    const condition =
      filterMode === 'all' || (filterMode === 'active' && !item.done) || (filterMode === 'completed' && item.done);

    if (condition) {
      return (
        <li key={item.id}>
          <Task
            item={item}
            onDeleted={() => {
              onDeleted(item.id);
            }}
            toggleDone={() => {
              toggleDone(item.id);
            }}
          />
        </li>
      );
    }

    return undefined;
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {
    throw new Error('onDeleted func was not found');
  },
  toggleDone: () => {
    throw new Error('toggleDone func was not found');
  },
  filterMode: 'all',
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  toggleDone: PropTypes.func,
  filterMode: PropTypes.string,
};

export default TaskList;
