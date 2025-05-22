'use client';

import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import DataGrid from '../../components/DataGrid';
import { Department } from '../types';

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentNameInput, setDepartmentNameInput] = useState('');

    useEffect(() => {
        fetch('/api/departments')
            .then((res) => res.json())
            .then((data) => setDepartments(data));
    }, []);

    const addDepartment = async () => {
        if (departmentNameInput.trim()) {
            const res = await fetch('/api/departments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: departmentNameInput }),
            });
            if (res.ok) {
                const newDepartments = await res.json();
                setDepartments(newDepartments);
                setDepartmentNameInput('');
                setIsModalOpen(false);
            }
        }
    };

    const departmentColumns = [
        { key: 'id' as keyof Department, label: 'ID' },
        { key: 'name' as keyof Department, label: 'Name' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Departments</h2>
                <button
                    onClick={() => {
                        setDepartmentNameInput('');
                        setIsModalOpen(true);
                    }}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Add Department
                </button>
            </div>
            <DataGrid data={departments} columns={departmentColumns} />
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setDepartmentNameInput('');
                }}
                title="Add Department"
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        value={departmentNameInput}
                        onChange={(e) => setDepartmentNameInput(e.target.value)}
                        placeholder="Department name"
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        onClick={addDepartment}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </Modal>
        </div>
    );
}