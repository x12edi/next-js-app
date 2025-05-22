export interface Todo {
    id: number;
    title: string;
    userId: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    departmentId: number;
}

export interface Department {
    id: number;
    name: string;
}