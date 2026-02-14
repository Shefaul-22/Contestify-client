
import React from 'react';

const ContestsFilters = ({ filters, setFilters }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}

            <input
                type="text"
                name="search"
                placeholder="Search contest..."
                className="input input-bordered input-sm"
                value={filters.search}
                onChange={handleChange}
            />

            {/* By  Category */}
            <select
                name="category"
                className="select select-sm select-bordered"
                value={filters.category}
                onChange={handleChange}
            >
                <option value="">All Categories</option>
                <option>Design</option>
                <option>Article Writing</option>
                <option>Business Idea</option>
                <option>Gaming Review</option>
               
            </select>



            {/* By  Status */}
            <select
                name="status"
                className="select select-sm select-bordered"
                value={filters.status}
                onChange={handleChange}
            >
                <option value="">All Status</option>
                <option value="approved">Ongoing</option>
                {/* <option >Completed</option> */}
                
            </select>


        </div>
    );
};

export default ContestsFilters;
