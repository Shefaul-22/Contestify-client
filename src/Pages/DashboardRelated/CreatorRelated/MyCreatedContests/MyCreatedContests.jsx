import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import UseAuth from '../../../../Hooks/UseAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyCreatedContests = () => {

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['myContests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-contests?email=${user.email}`
            );
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/contests/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['myContests']);
            Swal.fire('Deleted!', '', 'success');
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete contest?',
            icon: 'warning',
            showCancelButton: true
        });

        if (confirm.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">
                My Created Contests
            </h2>

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

                                {contest.status === 'pending' && (
                                    <>
                                        <Link
                                            to={`/dashboard/edit-contest/${contest._id}`}
                                            className="btn btn-sm btn-info"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(contest._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}

                                <Link
                                    to={`/dashboard/submissions/${contest._id}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    See Submissions
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyCreatedContests;
