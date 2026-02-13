import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        }
    });

    const roleMutation = useMutation({
        mutationFn: ({ id, role }) =>
            axiosSecure.patch(`/admin/users/${id}/role`, { role }),

        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            Swal.fire('Role Updated!', '', 'success');
        },

        onError: () => {
            Swal.fire('Failed to update role', '', 'error');
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Change Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="space-x-2">


                                <select
                                    className="select select-xs select-bordered"

                                    value={user.role}

                                    onChange={(e) => {
                                        const newRole = e.target.value;
                                        if (newRole !== user.role) {
                                            roleMutation.mutate({
                                                id: user._id,
                                                role: newRole
                                            });
                                        }
                                    }}
                                >
                                    <option value="user">User</option>
                                    <option value="creator">Creator</option>
                                    <option value="admin">Admin</option>

                                </select>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;