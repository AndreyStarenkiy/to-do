import React from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

function TasksFilter({ selectFilter, filterMode }) {
  let allButtonClasses = 'all-button';
  let activeButtonClasses = 'active-button';
  let completedButtonClasses = 'completed-button';

  switch (filterMode) {
    case 'all':
      allButtonClasses += ' selected';
      activeButtonClasses = activeButtonClasses.replace(' selected', '');
      completedButtonClasses = completedButtonClasses.replace(' selected', '');
      break;
    case 'active':
      allButtonClasses = allButtonClasses.replace(' selected', '');
      activeButtonClasses += ' selected';
      completedButtonClasses = completedButtonClasses.replace(' selected', '');
      break;
    case 'completed':
      allButtonClasses = allButtonClasses.replace(' selected', '');
      activeButtonClasses = activeButtonClasses.replace(' selected', '');
      completedButtonClasses += ' selected';
      break;
    default:
      throw new Error('tasks-filter switch case found filterMode to be invalid');
  }

  const handleFilterSwitch = (e) => {
    selectFilter(e.target.name);
  };

  return (
    <ul className="filters">
      <li>
        <button name="all"
                className={allButtonClasses}
                onClick={handleFilterSwitch}>All</button>
      </li>
      <li>
        <button name="active"
                className={activeButtonClasses}
                onClick={handleFilterSwitch}>Active</button>
      </li>
      <li>
        <button name="completed"
                className={completedButtonClasses}
                onClick={handleFilterSwitch}>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  selectFilter: () => { throw new Error('selectFilter func was not found'); },
  filterMode: 'all',
};

TasksFilter.propTypes = {
  selectFilter: PropTypes.func,
  filterMode: PropTypes.string,
};

export default TasksFilter;
