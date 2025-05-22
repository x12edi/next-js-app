"use client";

import Image from "next/image";
import { useState } from "react";
import TodoItem from "../components/TodoItem";

export default function Home() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const addTodos = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput('');
        }
    }

    const deleteTodos = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a new todo"
                        className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addTodos}
                        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
                {/*<ul className="space-y-2">*/}
                {/*    {todos.map((todo, index) => (*/}
                {/*        <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">*/}
                {/*            <span>{todo}</span>*/}
                {/*            <button onClick={() => deleteTodos(index)} className="text-red-500 hover:text-red-700">*/}
                {/*                Delete*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                <ul className="space-y-2">
                    {todos.map((todo, index) => (
                        <TodoItem key={index} todo={todo} index={index} onDelete={deleteTodos} ></TodoItem>
                    ))}
                </ul>
            </div>
        </div>
    );
}