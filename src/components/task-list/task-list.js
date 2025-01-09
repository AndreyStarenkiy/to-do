import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ elementsToRender }) => <ul className="todo-list">{elementsToRender}</ul>;

TaskList.defaultProps = { elementsToRender: undefined };

TaskList.propTypes = { elementsToRender: PropTypes.arrayOf(PropTypes.element) };

export default TaskList;
