import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageContests = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['adminContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/contests');
            return res.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/admin/contests/${id}/approve`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminContests'] });
            Swal.fire('Approved!', '', 'success');
        }
    });

    const rejectMutation = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/admin/contests/${id}/reject`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminContests'] });
            Swal.fire('Rejected!', '', 'success');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            axiosSecure.delete(`/admin/contests/${id}`),

        onSuccess: () => {
            queryClient.invalidateQueries(['adminContests']);
            Swal.fire('Deleted!', '', 'success');
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Contests</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {contests.map(contest => (
                        <tr key={contest._id}>
                            <td>{contest.name}</td>
                            <td>{contest.status}</td>
                            <td className="space-x-2">

                                <button
                                    onClick={() =>
                                        approveMutation.mutate(contest._id)
                                    }
                                    className="btn btn-xs btn-success"
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() =>
                                        rejectMutation.mutate(contest._id)
                                    }
                                    className="btn btn-xs btn-warning"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        deleteMutation.mutate(contest._id)
                                    }
                                    className="btn btn-xs btn-error"
                                    // disabled={contest.status === 'approved'}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageContests;