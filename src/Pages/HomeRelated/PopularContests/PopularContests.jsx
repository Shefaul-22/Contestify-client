import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAxios from "../../../Hooks/UseAxios";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../components/Loading/Loading";


const PopularContests = () => {

    const axios = UseAxios();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const { data = [], isLoading } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            const res = await axios.get("/popular-contests");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className=" py-6 md:py-8 ">

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                    🔥 Popular Contests
                </h2>

                <button
                    onClick={() => navigate("/contests")}
                    className="btn btn-outline"
                >
                    Show All
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {data.map(contest => (

                    <div
                        key={contest._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                    >

                        <img
                            src={contest.image}
                            alt={contest.name}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">

                            <h3 className="text-lg font-semibold mb-2">
                                {contest.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-2">
                                {contest.description.slice(0, 70)}...
                            </p>

                            <p className="text-sm font-semibold text-primary mb-4">
                                Participants: {contest.participants?.length || 0}
                            </p>

                            <button
                                onClick={() =>
                                    user
                                        ? navigate(`/contests/${contest._id}`)
                                        : navigate("/login")
                                }
                                className="btn btn-primary w-full"
                            >
                                Details
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PopularContests;