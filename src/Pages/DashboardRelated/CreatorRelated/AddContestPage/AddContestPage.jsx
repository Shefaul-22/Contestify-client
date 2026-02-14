import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import UseAuth from '../../../../Hooks/UseAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';


const AddContestPage = () => {


    const { user } = UseAuth();
    // console.log(user);


    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const deadline = watch("deadline");

    const handleAddContest = async (data) => {


        try {

            const contestImg = data.image[0];
            const formData = new FormData();
            formData.append('image', contestImg);

            const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

            const imgRes = await axios.post(imageApi, formData);
            const imageURL = imgRes.data.data.url;

            const contestInfo = {
                name: data.name,
                image: imageURL,
                description: data.description,
                price: Number(data.price),
                prizeMoney: Number(data.prizeMoney),
                taskInstruction: data.taskInstruction,
                contestType: data.contestType,
                deadline: data.deadline,
                creatorEmail: user?.email,
                status: 'pending',
                createdAt: new Date()
            };

            const res = await axiosSecure.post('/contests', contestInfo);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contest created!',
                    text: 'Waiting for admin approval',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate('/dashboard/my-created-contests');
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create contest'
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Add New Contest</h2>

            <form onSubmit={handleSubmit(handleAddContest)} className="space-y-6 text-black">

                {/* Contest Name */}
                <div>
                    <label className="label">Contest Name</label>
                    <input
                        {...register('name', { required: 'Contest name is required' })}
                        className="input input-primary w-full"
                        placeholder="Contest name"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                {/* Contest Type */}
                <div>
                    <label className="label">Contest Type</label>
                    <select
                        {...register('contestType', { required: true })}
                        defaultValue=""
                        className="select select-primary w-full"
                    >
                        <option value="" disabled>Select contest type</option>
                        <option value="Design">Design</option>
                        <option value="Article Writing">Article Writing</option>
                        <option value="Business Idea">Business Idea</option>
                        <option value="Gaming Review">Gaming Review</option>
                    </select>
                </div>

                {/* Image */}
                <div>
                    <label className="label">Contest Image</label>
                    <input
                        type="file"
                        {...register('image', { required: 'Image is required' })}
                        className="file-input file-input-primary w-full"
                    />
                    {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="textarea textarea-primary w-full"
                        placeholder="Contest description"
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
                            placeholder="$ Price"
                        />
                    </div>

                    <div>
                        <label className="label">Prize Money</label>
                        <input
                            type="number"
                            {...register('prizeMoney', { required: true })}
                            className="input input-primary w-full"
                            placeholder="$ Prize money"
                        />
                    </div>
                </div>



                {/* Task Instruction */}
                <div>
                    <label className="label">Task Instruction</label>
                    <textarea
                        {...register('taskInstruction', { required: true })}
                        className="textarea textarea-primary w-full"
                        placeholder="Explain what participants need to do"
                    />
                </div>





                {/* Deadline */}

                <div>
                    <label className="label mr-2">Deadline</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setValue('deadline', date)}
                        className="input input-primary w-full"
                        minDate={new Date()}
                        placeholderText="Select deadline"
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                    Create Contest
                </button>

            </form>
        </div>
    );
};

export default AddContestPage;
