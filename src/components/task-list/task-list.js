import React from 'react';
import Task from '../task/task';

const TaskList = (props) => {
  const { onDeleted, toggleDone, filterMode } = props;
  let condition;

  /* switch (filterMode) {
    case 'all': condition = true; break;
    case 'active': condition = !this.item.done; break;
    case 'completed': condition = this.item.done; break;
    default: console.log('ЧТО ТО НЕ ТАК))');
  } */
  /* console.log(props);
  console.log(onDeleted); */

  const elements = props.todos.map((item) => (
    ((filterMode === 'all') || ((filterMode === 'active') && !item.done) || ((filterMode === 'completed') && item.done))
      ? (
        <li key={item.id}>
          <Task
            item={item}
            onDeleted={() => {
              onDeleted(item.id);
            }}
            toggleDone={() => { toggleDone(item.id); }}
          />
        </li>
      ) : undefined));

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
