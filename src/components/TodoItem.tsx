interface TodoItemProps {
    todo: string;
    index: number;
    onDelete: (index: number) => void;
}

export default function TodoItem({ todo, index, onDelete }: TodoItemProps) {
    return (
        <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span>{todo}</span>
            <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
}