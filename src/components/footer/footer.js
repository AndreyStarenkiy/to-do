import React from 'react';
import PropTypes from 'prop-types';
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

Footer.defaultProps = {
  leftCounter: undefined,
  selectFilter: () => { throw new Error('selectFilter func was not found'); },
  filterMode: undefined,
  clearCompleted: () => { throw new Error('clearCompleted func was not found'); },
};

Footer.propTypes = {
  leftCounter: PropTypes.number,
  selectFilter: PropTypes.func,
  filterMode: PropTypes.string,
  clearCompleted: PropTypes.func,
};

export default Footer;
