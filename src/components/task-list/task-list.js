import React from 'react';
import Task from '../task/task';

const TaskList = (props) => {
  const { onDeleted } = props;
  console.log(props);
  console.log(onDeleted);

  const elements = props.todos.map((item) => (
    <li key={item.id}>
      <Task
        item={item}
        onDeleted={() => {
          onDeleted(item.id);
        }}
      />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
