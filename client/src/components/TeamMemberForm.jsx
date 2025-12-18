import React, { useState, useEffect } from 'react';

const TeamMemberForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        personalEmail: '',
        collegeEmail: '',
        githubId: '',
        address: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{initialData ? 'Edit Member' : 'Add Member'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Personal Email</label>
                        <input
                            type="email"
                            name="personalEmail"
                            value={formData.personalEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>College Email</label>
                        <input
                            type="email"
                            name="collegeEmail"
                            value={formData.collegeEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>GitHub ID (URL)</label>
                        <input
                            type="text"
                            name="githubId"
                            value={formData.githubId}
                            onChange={handleChange}
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamMemberForm;
