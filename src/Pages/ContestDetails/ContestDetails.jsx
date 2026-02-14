import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ContestDetails = () => {

    const { id } = useParams();
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();


    const [contest, setContest] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");
    const [isEnded, setIsEnded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [submissionLink, setSubmissionLink] = useState("");

    //  Fetch Contest
    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => setContest(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");
        const paymentCancelled = params.get("payment");

        if (sessionId) {
            axiosSecure
                .patch(`/contest-payment-success?session_id=${sessionId}`)
                .then(res => {
                    if (res.data.success) {

                        //  contest refetch
                        axiosSecure.get(`/contests/${id}`)
                            .then(r => setContest(r.data));

                        Swal.fire(
                            "Success",
                            "Registration completed successfully!",
                            "success"
                        );

                        // optional: remove session_id from URL
                        window.history.replaceState({}, document.title, `/contests/${id}`);
                    }
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire("Error", "Payment verification failed", "error");
                });
        }

        if (paymentCancelled === "cancelled") {
            Swal.fire(
                "Payment Cancelled",
                "You did not complete the payment.",
                "info"
            );

            // optional clean URL
            window.history.replaceState({}, document.title, `/contests/${id}`);
        }

    }, [id, axiosSecure]);

    //  Countdown
    useEffect(() => {
        if (!contest?.deadline) return;

        const interval = setInterval(() => {
            const diff = new Date(contest.deadline) - new Date();

            if (diff <= 0) {
                setTimeLeft("Contest Ended");
                setIsEnded(true);
                clearInterval(interval);
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            setTimeLeft(
                `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
            );

        }, 1000);

        return () => clearInterval(interval);

    }, [contest?.deadline]);

    if (!contest || loading) return <Loading />;

    const isRegistered = contest.participants?.includes(user?.email);

    //  Payment
    const handleRegister = async () => {

        if (isEnded) return;

        try {
            const res = await axiosSecure.post("/create-contest-payment-checkout", {
                contestId: contest._id,
                email: user.email
            });

            window.location.href = res.data.url;

        } catch (error) {

            console.error(error)
            Swal.fire("Error", "Payment failed", "error");
        }
    };

    // Submit Task
    const handleSubmit = async () => {

        if (!submissionLink)
            return Swal.fire("Warning", "Provide submission link", "warning");

        try {

            if (isEnded) {
                return Swal.fire("Contest Ended", "Submission closed", "warning");
            }
            await axiosSecure.post("/submissions", {
                contestId: contest._id,
                email: user.email,
                link: submissionLink
            });

            Swal.fire("Success", "Task submitted!", "success");
            setShowModal(false);
            setSubmissionLink("");

        } catch (error) {

            console.error(error)
            Swal.fire("Error", "Submission failed", "error");
        }
    };

    return (

        <div className="p-4 w-full">

            <h2 className="text-3xl md:text-4xl lg:text-5xl my-6 text-center">
                Contest Details Page
            </h2>

            <div className="flex flex-col md:flex-row gap-6">

                {/* LEFT SIDE */}
                <div className="flex-1">

                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {contest.name}
                    </h2>

                    <p className="text-lg mb-2">
                        <strong>Category:</strong> {contest.contestType}
                    </p>

                    <p className="text-lg mb-2">
                        <strong>Prize:</strong> ${contest.prizeMoney}
                    </p>

                    <p className="text-lg mb-2">
                        <strong>Participants:</strong> {contest.participants?.length || 0}
                    </p>

                    <p className="text-lg mb-2 break-words">
                        <strong>Description:</strong> {contest.description}
                    </p>

                    <p className="text-lg mb-2 break-words">
                        <strong>Task Details:</strong> {contest.taskInstruction}
                    </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex-1">

                    <img
                        src={contest.image}
                        alt={contest.name}
                        className="w-full object-cover rounded-lg"
                    />

                    {/* BADGES */}
                    <div className="absolute top-2 right-2 flex gap-3">

                        <span className={`px-3 py-2 text-white text-xs rounded ${isEnded ? "bg-gray-500" : "bg-green-500"}`}>
                            {isEnded ? "Ended" : "Live"}
                        </span>

                        <span className="px-3 py-2 text-white text-xs rounded bg-blue-500">
                            {timeLeft}
                        </span>

                    </div>

                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 my-8">

                {
                    !isRegistered && (
                        <button
                            disabled={isEnded}
                            onClick={handleRegister}
                            className="btn btn-primary flex-1"
                        >
                            Register
                        </button>
                    )}

                {
                    isRegistered && !isEnded && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-success flex-1"
                        >
                            Submit Task
                        </button>
                    )}

            </div>

            {/* WINNER SECTION */}
            {contest.winner && (
                <div className="my-8 p-4 border rounded-lg bg-base-200">
                    <h3 className="text-2xl font-bold mb-3">Winner</h3>
                    <div className="flex items-center gap-4">
                        <img
                            src={contest.winner.photo}
                            alt="winner"
                            className="w-16 h-16 rounded-full"
                        />
                        <p className="text-lg">{contest.winner.name}</p>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl mb-4">Submit Task</h3>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Provide submission link"
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowModal(false)} className="btn btn-sm">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="btn btn-sm btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ContestDetails;