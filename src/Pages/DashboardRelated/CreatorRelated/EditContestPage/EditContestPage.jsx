import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const EditContestPage = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
     
        watch,
        reset,

    } = useForm();

    const deadline = watch("deadline");

    
    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        enabled: !!id,
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
            Swal.fire({
                icon: 'success',
                title: 'Contest Updated!',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/dashboard/my-created-contests');
        }
    });

    const onSubmit = (data) => {

        const updatedContest = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            prizeMoney: Number(data.prizeMoney),
            taskInstruction: data.taskInstruction,
            contestType: data.contestType,
            deadline: data.deadline
        };

        updateMutation.mutate(updatedContest);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
                Edit Contest
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Name */}
                <div>
                    <label className="label">Contest Name</label>
                    <input
                        {...register('name', { required: true })}
                        className="input input-primary w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="textarea textarea-primary w-full"
                    />
                </div>

                {/* Price & Prize */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Registration Price</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            className="input input-primary w-full"
                        />
                    </div>

                    <div>
                        <label className="label">Prize Money</label>
                        <input
                            type="number"
                            {...register('prizeMoney', { required: true })}
                            className="input input-primary w-full"
                        />
                    </div>
                </div>

                {/* Task Instruction */}
                <div>
                    <label className="label">Task Instruction</label>
                    <textarea
                        {...register('taskInstruction', { required: true })}
                        className="textarea textarea-primary w-full"
                    />
                </div>

                {/* Contest Type */}
                <div>
                    <label className="label">Contest Type</label>
                    <select
                        {...register('contestType', { required: true })}
                        className="select select-primary w-full"
                    >
                        <option value="Design">Design</option>
                        <option value="Article Writing">Article Writing</option>
                        <option value="Business Idea">Business Idea</option>
                        <option value="Gaming Review">Gaming Review</option>
                    </select>
                </div>

                {/* Deadline */}
                <div>
                    <label className="label">Deadline</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setValue('deadline', date)}
                        className="input input-primary w-full"
                        minDate={new Date()}
                    />
                </div>

                {/* Update Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={updateMutation.isPending}
                >
                    {updateMutation.isPending ? 'Updating...' : 'Update Contest'}
                </button>

            </form>
        </div>
    );
};

export default EditContestPage;
