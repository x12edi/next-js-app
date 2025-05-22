import { NextResponse } from 'next/server';
import { User } from '../../types';

// In-memory storage (replace with database later)
let users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', departmentId: 1 },
    { id: 2, name: 'Bob', email: 'bob@example.com', departmentId: 2 },
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const { name, email, departmentId } = await request.json();
    if (
        typeof name === 'string' &&
        name.trim() &&
        typeof email === 'string' &&
        email.trim() &&
        typeof departmentId === 'number'
    ) {
        const newUser: User = { id: users.length + 1, name, email, departmentId };
        users.push(newUser);
        return NextResponse.json(users, { status: 201 });
    }
    return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
}