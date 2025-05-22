'use client';

import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import DataGrid from '../../components/DataGrid';
import { User, Department } from '../types';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userNameInput, setUserNameInput] = useState('');
    const [userEmailInput, setUserEmailInput] = useState('');
    const [departmentIdInput, setDepartmentIdInput] = useState('');

    useEffect(() => {
        Promise.all([
            fetch('/api/users').then((res) => res.json()),
            fetch('/api/departments').then((res) => res.json()),
        ]).then(([usersData, departmentsData]) => {
            setUsers(usersData);
            setDepartments(departmentsData);
        });
    }, []);

    const addUser = async () => {
        if (userNameInput.trim() && userEmailInput.trim() && departmentIdInput) {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userNameInput,
                    email: userEmailInput,
                    departmentId: Number(departmentIdInput),
                }),
            });
            if (res.ok) {
                const newUsers = await res.json();
                setUsers(newUsers);
                setUserNameInput('');
                setUserEmailInput('');
                setDepartmentIdInput('');
                setIsModalOpen(false);
            }
        }
    };

    const userColumns = [
        { key: 'id' as keyof User, label: 'ID' },
        { key: 'name' as keyof User, label: 'Name' },
        { key: 'email' as keyof User, label: 'Email' },
        {
            key: 'departmentId' as keyof User,
            label: 'Department',
            render: (user: User) => {
                const department = departments.find((d) => d.id === user.departmentId);
                return department ? department.name : 'Unknown';
            },
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Users</h2>
                <button
                    onClick={() => {
                        setUserNameInput('');
                        setUserEmailInput('');
                        setDepartmentIdInput('');
                        setIsModalOpen(true);
                    }}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Add User
                </button>
            </div>
            <DataGrid data={users} columns={userColumns} />
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setUserNameInput('');
                    setUserEmailInput('');
                    setDepartmentIdInput('');
                }}
                title="Add User"
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)}
                        placeholder="User name"
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="email"
                        value={userEmailInput}
                        onChange={(e) => setUserEmailInput(e.target.value)}
                        placeholder="User email"
                        className="w-full p-2 border rounded-md"
                    />
                    <select
                        value={departmentIdInput}
                        onChange={(e) => setDepartmentIdInput(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={addUser}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </Modal>
        </div>
    );
}