interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskProps {
    task: Task;
    onRemove: (id: number) => void,
    onToggle: (id: number) => void,
}

interface TaskListProps { tasks: Task[] }