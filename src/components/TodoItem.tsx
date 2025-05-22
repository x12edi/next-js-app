import { useState } from 'react';
import { Todo, User, Department } from '../app/types';

interface TodoItemProps {
    todo: Todo;
    user: User | undefined;
    department: Department | undefined;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

export default function TodoItem({ todo, user, department, onDelete, onEdit }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    const handleEdit = () => {
        if (isEditing && editText.trim()) {
            onEdit(todo.id, editText);
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 p-1 border rounded-md"
                />
            ) : (
                <span>
                        {todo.title} (by {user?.name || 'Unknown'} in {department?.name || 'Unknown'})
                </span>
            )}
            <div className="space-x-2">
                <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}