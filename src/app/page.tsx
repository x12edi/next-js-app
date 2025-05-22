import Link from 'next/link';

export default function Home() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Todo List App</h2>
            <p className="mb-4">Manage your todos, users, and departments efficiently.</p>
            <div className="space-y-2">
                <Link href="/todos" className="block p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Go to Todos
                </Link>
                <Link href="/users" className="block p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Go to Users
                </Link>
                <Link href="/departments" className="block p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Go to Departments
                </Link>
            </div>
        </div>
    );
}