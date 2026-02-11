import React from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ContestSubmissions = () => {

    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['submissions', contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/submissions/contest/${contestId}`
            );
            return res.data;
        }
    });

    const winnerMutation = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/submissions/${id}/declare-winner`),

        onSuccess: () => {
            queryClient.invalidateQueries(['submissions', contestId]);
            Swal.fire('Winner Declared!', '', 'success');
        }
    });

    const handleDeclareWinner = (id) => {
        Swal.fire({
            title: 'Declare this submission as winner?',
            icon: 'question',
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                winnerMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">
                Contest Submissions
            </h2>

            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Submitted At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.map(submission => (
                            <tr key={submission._id}>
                                <td>{submission.participantEmail}</td>

                                <td>
                                    {new Date(
                                        submission.submittedAt
                                    ).toLocaleDateString()}
                                </td>

                                <td>
                                    {submission.isWinner
                                        ? 'Winner'
                                        : 'Pending'}
                                </td>

                                <td>
                                    {!submission.isWinner && (
                                        <button
                                            onClick={() =>
                                                handleDeclareWinner(
                                                    submission._id
                                                )
                                            }
                                            className="btn btn-sm btn-success"
                                        >
                                            Declare Winner
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContestSubmissions;
