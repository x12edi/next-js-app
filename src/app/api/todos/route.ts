import { NextResponse } from 'next/server';
import { Todo } from '../../types';

// In-memory storage (replace with database later)
let todos: Todo[] = [];

export async function GET() {
    return NextResponse.json(todos);
}

export async function POST(request: Request) {
    const { title, userId } = await request.json();
    if (typeof title === 'string' && title.trim() && typeof userId === 'number') {
        const newTodo: Todo = { id: todos.length + 1, title, userId };
        todos.push(newTodo);
        return NextResponse.json(todos, { status: 201 });
    }
    return NextResponse.json({ error: 'Invalid todo or userId' }, { status: 400 });
}

export async function PUT(request: Request) {
    const { id, title, userId } = await request.json();
    if (
        typeof id === 'number' &&
        typeof title === 'string' &&
        title.trim() &&
        typeof userId === 'number'
    ) {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex] = { ...todos[todoIndex], title, userId };
            return NextResponse.json(todos);
        }
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Invalid id, title, or userId' }, { status: 400 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    if (typeof id === 'number') {
        todos = todos.filter((todo) => todo.id !== id);
        return NextResponse.json(todos);
    }
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
}