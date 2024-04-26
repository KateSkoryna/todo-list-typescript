import React, { useState, useEffect, useRef } from 'react';
import TaskItem from '../TaskItem/TaskItem';

const defaultProps: TaskListProps = {
    tasks: []
};

const TaskList = (props: TaskListProps): JSX.Element => {
    const [taskList, setToDoList] = useState<Task[]>(props.tasks);
    const [newTask, setNewTask] = useState("");
    const isMounted = useRef(false);

    useEffect(() => {
        const list = localStorage.getItem('tasks');
        if (list !== null) {
            setToDoList(JSON.parse(list))
        }
    }, []);

    useEffect(() => {
        if (isMounted.current || taskList.length !== 0) {
            localStorage.setItem("tasks", JSON.stringify(taskList));
        } else {
            isMounted.current = true;
        }

    }, [taskList])

    const handleRemoveTask = (id: number) => {
        setToDoList(prevList => prevList.filter(task => task.id !== id));
    };

    const handleToggleTask = (id: number) => {
        setToDoList(prevList => prevList.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
    }

    const handleNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    }

    const addNewTask = (): void => {
        if (newTask.trim() === '') {
            return;
        }
        setToDoList((prevList) => [...prevList, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    }

    return (
        <div className="task-list">
            <h2 className="task-list-title">Task List</h2>
            <div className="add-task-form">
                <input
                    className="add-task-input"
                    type="text"
                    value={newTask}
                    onChange={handleNewTask}
                />
                <button className="add-task-button" onClick={addNewTask}>
                    Add
                </button>
            </div>
            {taskList.length > 0 ? (
                <ul>
                    {taskList.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onRemove={handleRemoveTask}
                            onToggle={handleToggleTask}
                        />
                    ))}
                </ul>
            ) : (
                <div className="task-list-empty">No tasks to display</div>
            )}
        </div>
    );

};

TaskList.defaultProps = defaultProps;

export default TaskList;
