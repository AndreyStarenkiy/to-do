import React from 'react';
import TasksFilter from '../tasks-filter/tasks-filter';

function Footer({
  leftCounter, selectFilter, filterMode, clearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{leftCounter} items left</span>
      <TasksFilter selectFilter={(mode) => selectFilter(mode)}
                   filterMode={filterMode} />
      <button className="clear-completed"
              onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;
