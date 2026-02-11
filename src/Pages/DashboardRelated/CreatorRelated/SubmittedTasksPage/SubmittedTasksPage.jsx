import React from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SubmittedTasksPage = () => {

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

    const handleDeclareWinner = async (id) => {

        const confirm = await Swal.fire({
            title: 'Declare Winner?',
            showCancelButton: true
        });

        if (confirm.isConfirmed) {
            winnerMutation.mutate(id);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">
                Contest Submissions
            </h2>

            {submissions.map(sub => (
                <div key={sub._id} className="card p-5 shadow mb-4">
                    <h3 className="font-semibold">
                        {sub.participantName}
                    </h3>
                    <p>{sub.participantEmail}</p>
                    <p>{sub.taskDetails}</p>

                    {sub.isWinner ? (
                        <span className="badge badge-success">
                            Winner
                        </span>
                    ) : (
                        <button
                            onClick={() => handleDeclareWinner(sub._id)}
                            className="btn btn-sm btn-primary mt-2"
                        >
                            Declare Winner
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubmittedTasksPage;
