import React, { useEffect, useState } from 'react';

import { CiLock } from 'react-icons/ci';
import { FaLock } from 'react-icons/fa';

import { useNavigate } from 'react-router';

import Swal from "sweetalert2";


const ContestCard = ({ contest, user, }) => {

    // console.log(user,contest);

    const navigate = useNavigate();


    const now = new Date();
    const deadlineDate = new Date(contest.deadline);

    let contestStatus = "";

    if (contest.status === "approved") {
        contestStatus = deadlineDate > now ? "Ongoing" : "Completed";
    }



    // timer added

    const [timeLeft, setTimeLeft] = useState("");

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const deadline = new Date(contest.deadline).getTime();
            const distance = deadline - now;

            if (distance <= 0) {

                setTimeLeft("00:00:00");

                setIsExpired(true);

                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [contest.deadline]);



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

                {/* Status */}
                <div className=" absolute top-2 right-4 flex gap-2 my-2 justify-between">

                    <span
                        className={`badge px-3 py-2
                             ${contestStatus === "Ongoing" && "badge-success"}
                             ${contestStatus === "Completed" && "badge-info text-white font-bold"} `
                        }
                    >
                        {
                            contest.status === "closed" ?

                                <span className='text-gray-700'>Closed</span>
                                :
                                contestStatus
                        }
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
                    <p className="text-xl">Fee ${contest.price}</p>
                    <p className="text-xl text-gray-800">Prize ${contest.prizeMoney}</p>
                </div>




                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                    <button

                        className="btn flex items-center gap-3 text-blue-600 bg-gray-200"
                    >
                        <span className=" flex items-center gap-2 ">

                            {
                                isExpired ? <FaLock size={24} /> : <CiLock size={24} />
                            }
                            <span>{timeLeft}</span>

                        </span>
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
