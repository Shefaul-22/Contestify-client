import React from "react";
import { FaTrophy, FaUsers, FaLightbulb, FaMedal } from "react-icons/fa";

const ExtraSection = () => {
    return (
        <div className="bg-gray-100 py-16 px-4">

            <div className="max-w-6xl mx-auto text-center">

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Choose Our Contest Platform?
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    We provide a competitive and creative environment where talents grow,
                    skills improve, and winners shine.
                </p>

                <div className="grid md:grid-cols-4 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FaTrophy className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                            Fair Competition
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Transparent judging and equal opportunity for all participants.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FaUsers className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                            Community Driven
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Join thousands of creative minds from different categories.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                            Skill Development
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Improve your real-world skills by solving practical challenges.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FaMedal className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                            Exciting Rewards
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Win certificates, prizes, and recognition for your talent.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ExtraSection;