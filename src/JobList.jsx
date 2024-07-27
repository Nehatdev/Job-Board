import React, { useState, useEffect } from 'react';
import './App.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Button } from 'react-bootstrap';

const JobList = () => {
    const [data, setData] = useState({ title: '', details: '' });
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/list/');
                if (Array.isArray(response.data)) {
                    setJobs(response.data);
                } else {
                    setJobs([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/job', data);
            if (response.data && response.data.job) {
                toast.success('Successfully added');
                setData({ title: '', details: '' });
                setJobs([...jobs, response.data.job]);
            } else {
                toast.error('Failed to add job');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const handleApply = (jobId) => {
        toast.info(`Applied to job with ID: ${jobId}`);
        
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className="Job">Find Your Jobs</h2>
                <div className='input-group'>
                    <label>Title:</label>
                    <input
                        type='text'
                        name='title'
                        placeholder='title'
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label>Details:</label>
                    <textarea
                        name='details'
                        placeholder='details'
                        value={data.details}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='btn'>Submit</button>
                </div>
            </form>

            <div className="input-group search-bar">
                <label>Search Jobs:</label>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {Array.isArray(filteredJobs) && 
            filteredJobs.map((job) => (
                <Card key={job._id} className="job-card">
                    <Card.Body>
                        <Card.Title>{job.title}</Card.Title>
                        <Button variant="primary" onClick={() => handleApply(job._id)}>Apply</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default JobList;
