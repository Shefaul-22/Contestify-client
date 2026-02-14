import React from 'react';
import { AiFillLike } from 'react-icons/ai';

import { useNavigate } from 'react-router';

import Swal from "sweetalert2";


const ContestCard = ({ contest, user, refetch, axiosSecure }) => {

    // console.log(user,contest);

    const navigate = useNavigate();

    

    const handleUpvote = async () => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (contest.creatorEmail === user.email) {

            Swal.fire(
                "Not allowed",
                "You cannot upvote your own contest",
                "warning"
            );

            return;
        }

        try {
            await axiosSecure.patch(`/issues/${contest._id}/upvote`);
            refetch();

        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || "Already upvoted",
                "error"
            );
        }
    };

    const handleViewDetails = () => {

        if (!user) {
            navigate("/login");
            return;
        }
        navigate(`/contest/${contest._id}`);
    };

    return (

        <div className="card bg-base-200 shadow-lg ">

            <div className="p-2 relative">
                <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-80 object-cover rounded-md"
                />

                {/* Status + Priority */}
                <div className=" absolute top-2 right-4 flex gap-2 my-2 justify-between">

                    <span className={`badge px-3 py-2
                        
                        ${contest.status === "approved" && "badge-success"}
                        ${contest.status === "ongoing" && "badge-info"}
                    `}>
                        {contest.status}
                    </span>


                </div>
            </div>

            <div className=" p-4 w-full">

                {/* contest name, category */}
                <div className='flex gap-2 justify-between w-full mb-2 md:mb-3'>
                    <h2 className="text-xl">{contest.name}</h2>
                    <p className="text-xl text-gray-800">{contest.contestType}</p>
                </div>


                {/* contest registration price, prizemoney */}
                <div className='flex gap-2 justify-between w-full mb-2 md:mb-3'>
                    <h2 className="text-xl">${contest.price}</h2>
                    <p className="text-xl text-gray-800">${contest.prizeMoney}</p>
                </div>




                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handleUpvote}
                        className="btn flex items-center gap-3 text-blue-600 bg-gray-200"
                    >
                        <AiFillLike size={24} /> <span className='text-xl font-semibold'>{contest.submissions || 0}</span>
                    </button>

                    <button
                        className="btn btn-sm btn-primary"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ContestCard;
