import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

const EditContestModal = ({ id, closeModal }) => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const deadline = watch("deadline");

    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (contest) {
            reset({
                name: contest.name,
                description: contest.description,
                price: contest.price,
                prizeMoney: contest.prizeMoney,
                taskInstruction: contest.taskInstruction,
                contestType: contest.contestType,
                deadline: contest.deadline ? new Date(contest.deadline) : null
            });
        }
    }, [contest, reset]);

    const updateMutation = useMutation({
        mutationFn: (updatedData) =>
            axiosSecure.patch(`/contests/${id}`, updatedData),

        onSuccess: () => {
            queryClient.invalidateQueries(['adminContests']);
            Swal.fire('Updated!', 'Contest Updated successfully !', 'success');
            closeModal();
        }
    });

    const onSubmit = (data) => {
        updateMutation.mutate({
            ...data,
            price: Number(data.price),
            prizeMoney: Number(data.prizeMoney)
        });
    };

    if (isLoading) return null;

    return (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">

                <button
                    onClick={closeModal}
                    className="absolute top-2 right-3 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">Edit Contest</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        {...register('name')}
                        className="input input-bordered w-full"
                    />

                    <textarea
                        {...register('description')}
                        className="textarea textarea-bordered w-full"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            {...register('price')}
                            className="input input-bordered"
                        />
                        <input
                            type="number"
                            {...register('prizeMoney')}
                            className="input input-bordered"
                        />
                    </div>

                    <textarea
                        {...register('taskInstruction')}
                        className="textarea textarea-bordered w-full"
                    />

                    <select
                        {...register('contestType')}
                        className="select select-bordered w-full"
                    >
                        <option value="Design">Design</option>
                        <option value="Article Writing">Article Writing</option>
                        <option value="Business Idea">Business Idea</option>
                        <option value="Gaming Review">Gaming Review</option>
                    </select>

                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setValue('deadline', date)}
                        className="input input-bordered w-full"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? 'Updating...' : 'Update'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditContestModal;