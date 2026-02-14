import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Loading from "../../components/Loading/Loading";

import ContestsFilters from "./ContestsFilters";
import ContestCard from "./ContestCard";

const AllContests = () => {

    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
        
    });

    // pagination functionality
    const [page, setPage] = useState(1);


    const { data = {}, refetch, isFetching } = useQuery({

        queryKey: [
            "allIssues",
            filters.search,
            filters.category,
            filters.status,
            
            page
        ],

        queryFn: async () => {
            const res = await axiosSecure.get("/contests", {
                params: {
                    ...filters,
                    page,

                }
            });
            return res.data;

        },
        keepPreviousData: true
    });

    // console.log(contests);

    const handleSetFilters = useCallback((update) => {
        setFilters(prev => {
            const newFilters =
                typeof update === "function" ? update(prev) : update;

            return newFilters;
        });

        setPage(1);
    }, []);


    const {
        contests = [],
        totalPages = 1,
        currentPage = 1,

        total

    } = data

    if (loading ) return <Loading />;

    return (

        <div>

            <h2 className="text-xl md:text-3xl lg:text-4xl my-4">
                All Contests : {total}
            </h2>

            {/* Filters */}
            <ContestsFilters

                filters={filters}
                // setFilters={setFilters}
                setFilters={handleSetFilters}

            />

            {
                isFetching && (
                    <div className="mt-4">
                        <Loading />
                    </div>
                )
            }

            {/* All Contests  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {
                    contests.map(contest => (
                        <ContestCard
                            key={contest._id}
                            contest={contest}
                            user={user}
                            refetch={refetch}

                            axiosSecure={axiosSecure}
                        />
                    ))}
            </div>

            {/* No data */}
            {contests.length === 0 && (
                <p className="text-center mt-6 text-gray-500">
                    No contest Ongoing.
                </p>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllContests;
