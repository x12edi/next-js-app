'use client';

import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import DataGrid from '../../components/DataGrid';
import { Todo, User, Department } from '../types';

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoInput, setTodoInput] = useState('');
    const [userIdInput, setUserIdInput] = useState('');
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    useEffect(() => {
        Promise.all([
            fetch('/api/todos').then((res) => res.json()),
            fetch('/api/users').then((res) => res.json()),
            fetch('/api/departments').then((res) => res.json()),
        ])
            .then(([todosData, usersData, departmentsData]) => {
                setTodos(todosData);
                setUsers(usersData);
                setDepartments(departmentsData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addTodo = async () => {
        if (todoInput.trim() && userIdInput) {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: todoInput, userId: Number(userIdInput) }),
            });
            if (res.ok) {
                const newTodos = await res.json();
                setTodos(newTodos);
                setTodoInput('');
                setUserIdInput('');
                setIsModalOpen(false);
            } else {
                console.error('Error adding todo:', await res.json());
            }
        }
    };

    const editTodoHandler = async () => {
        if (editTodo && todoInput.trim() && userIdInput) {
            const res = await fetch('/api/todos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editTodo.id, title: todoInput, userId: Number(userIdInput) }),
            });
            if (res.ok) {
                const newTodos = await res.json();
                setTodos(newTodos);
                setTodoInput('');
                setUserIdInput('');
                setEditTodo(null);
                setIsModalOpen(false);
            } else {
                console.error('Error editing todo:', await res.json());
            }
        }
    };

    const deleteTodo = async (id: number) => {
        const res = await fetch('/api/todos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            const newTodos = await res.json();
            setTodos(newTodos);
        } else {
            console.error('Error deleting todo:', await res.json());
        }
    };

    const todoColumns = [
        { key: 'id' as keyof Todo, label: 'ID' },
        { key: 'title' as keyof Todo, label: 'Todo' },
        {
            key: 'user',
            label: 'User',
            render: (todo: Todo) => {
                const user = users.find((u) => u.id === todo.userId);
                return user ? user.name : 'Unknown';
            },
        },
        {
            key: 'department',
            label: 'Department',
            render: (todo: Todo) => {
                const user = users.find((u) => u.id === todo.userId);
                const department = user ? departments.find((d) => d.id === user.departmentId) : null;
                return department ? department.name : 'Unknown';
            },
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (todo: Todo) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            setEditTodo(todo);
                            setTodoInput(todo.title);
                            setUserIdInput(String(todo.userId));
                            setIsModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Todos</h2>
                <button
                    onClick={() => {
                        setEditTodo(null);
                        setTodoInput('');
                        setUserIdInput('');
                        setIsModalOpen(true);
                    }}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Add Todo
                </button>
            </div>
            <DataGrid data={todos} columns={todoColumns} />
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditTodo(null);
                    setTodoInput('');
                    setUserIdInput('');
                }}
                title={editTodo ? 'Edit Todo' : 'Add Todo'}
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        placeholder="Todo title"
                        className="w-full p-2 border rounded-md"
                    />
                    <select
                        value={userIdInput}
                        onChange={(e) => setUserIdInput(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={editTodo ? editTodoHandler : addTodo}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        {editTodo ? 'Save' : 'Add'}
                    </button>
                </div>
            </Modal>
        </div>
    );
}