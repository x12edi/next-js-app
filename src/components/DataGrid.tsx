import { useState } from 'react';

interface Column<T> {
    key: keyof T | string; // Allow string for pseudo-keys
    label: string;
    render?: (item: T) => string | JSX.Element;
}

interface DataGridProps<T> {
    data: T[];
    columns: Column<T>[];
    itemsPerPage?: number;
}

export default function DataGrid<T>({ data, columns, itemsPerPage = 5 }: DataGridProps<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (key: keyof T | string) => {
        // Only sort if key is a valid field on T
        if (typeof key === 'string' && key in data[0]) {
            const typedKey = key as keyof T;
            if (sortKey === typedKey) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortKey(typedKey);
                setSortOrder('asc');
            }
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="p-2 border-b bg-gray-100 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort(column.key)}
                            >
                                {column.label} {sortKey === column.key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="border-b">
                            {columns.map((column) => (
                                <td key={String(column.key)} className="p-2">
                                    {column.render ? column.render(item) : String(item[column.key as keyof T])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}