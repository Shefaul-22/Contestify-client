import React, { useState } from "react";
import UseAxios from "../../../Hooks/UseAxios";


const Banner = () => {

    const axios = UseAxios();

    const [searchType, setSearchType] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {

        const trimmed = searchType.trim();
        if (!trimmed) return;

        try {
            setLoading(true);

            const res = await axios.get("/contests", {
                params: {
                    category: trimmed
                }
            });

            setResults(res.data.contests || []);

        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">

            {/* Banner Section */}
            <div className="relative h-[70vh] w-full">

                <img
                    src="https://i.ibb.co.com/DH570fqD/image.png"
                    alt="banner"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Join - Compete - Learn - Win 🚀
                    </h1>

                    <div className="flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-xl">

                        <input
                            type="text"
                            placeholder="Search by contest type"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="flex-1 px-4 py-3 outline-none"
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-primary text-white px-6 font-semibold"
                        >
                            Search
                        </button>

                    </div>

                    <h6 className="text-xl md:text-3xl font-bold text-white my-4">
                        Type : Design - Article Writing - Business Idea - Gaming Review
                    </h6>

                </div>
            </div>

            {/* Search Results Section */}
            {
                (loading || results.length > 0) && (
                    <div className=" mt-10 px-4">

                        {loading && (
                            <p className="text-center text-lg">Searching...</p>
                        )}

                        {!loading && results.length === 0 && (
                            <p className="text-center text-gray-500">
                                No contests found.
                            </p>
                        )}

                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {
                                results.map(contest => (
                                    <div
                                        key={contest._id}
                                        className="bg-white shadow-lg rounded-lg p-4"
                                    >
                                        <img
                                            src={contest.image}
                                            alt={contest.name}
                                            className="h-72 w-full object-fit rounded"
                                        />

                                        <h3 className="text-lg font-semibold mt-3">
                                            {contest.name}
                                        </h3>

                                        <p className="text-sm text-gray-600">
                                            {contest.description?.slice(0, 70)}...
                                        </p>

                                        <p className="text-sm font-semibold mt-2">
                                            Participants: {contest.participants?.length || 0}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default Banner;