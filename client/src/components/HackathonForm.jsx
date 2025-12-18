import React, { useState, useEffect } from 'react';

const TEAM_MEMBERS = [
    'Nivetha',
    'Praveen',
    'Prathika',
    'Praveen Kumar',
    'Priya',
    'Priyadharshni'
];

const HackathonForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        eventLink: '',
        teamSizeLimit: 4,
        teamMembers: [],
        round1Date: '',
        round2Date: '',
        round3Date: '',
        statusRound1: 'Not Started',
        statusRound2: 'Not Started',
        statusRound3: 'Not Started'
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                round1Date: initialData.round1Date ? initialData.round1Date.split('T')[0] : '',
                round2Date: initialData.round2Date ? initialData.round2Date.split('T')[0] : '',
                round3Date: initialData.round3Date ? initialData.round3Date.split('T')[0] : ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMemberChange = (member) => {
        setFormData(prev => {
            const isSelected = prev.teamMembers.includes(member);
            let newMembers;
            if (isSelected) {
                newMembers = prev.teamMembers.filter(m => m !== member);
            } else {
                if (prev.teamMembers.length >= prev.teamSizeLimit) {
                    // Can't add more
                    return prev;
                }
                newMembers = [...prev.teamMembers, member];
            }
            return { ...prev, teamMembers: newMembers };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const limit = parseInt(formData.teamSizeLimit, 10);
        if (formData.teamMembers.length > limit) {
            setError(`Max team size is ${limit}`);
            return;
        }

        // Sanitize data: Convert empty strings to null for dates
        const payload = {
            ...formData,
            teamSizeLimit: limit,
            round1Date: formData.round1Date || null,
            round2Date: formData.round2Date || null,
            round3Date: formData.round3Date || null,
        };

        onSubmit(payload);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{initialData ? 'Edit Hackathon' : 'Add Hackathon'}</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Hackathon Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Link (Optional)</label>
                        <input
                            type="url"
                            name="eventLink"
                            value={formData.eventLink}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Team Size Limit</label>
                            <input
                                type="number"
                                name="teamSizeLimit"
                                value={formData.teamSizeLimit}
                                onChange={handleChange}
                                min="1"
                                max="6"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Team Members (Max: {formData.teamSizeLimit})</label>
                        <div className="checkbox-group">
                            {TEAM_MEMBERS.map(member => (
                                <label key={member} className={`checkbox-label ${formData.teamMembers.includes(member) ? 'checked' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={formData.teamMembers.includes(member)}
                                        onChange={() => handleMemberChange(member)}
                                        disabled={!formData.teamMembers.includes(member) && formData.teamMembers.length >= formData.teamSizeLimit}
                                    />
                                    {member}
                                </label>
                            ))}
                        </div>
                    </div>

                    <h3>Round details</h3>

                    <div className="rounds-grid">
                        <div className="round-col">
                            <h4>Round 1</h4>
                            <input type="date" name="round1Date" value={formData.round1Date} onChange={handleChange} />
                            <select name="statusRound1" value={formData.statusRound1} onChange={handleChange}>
                                <option>Not Started</option>
                                <option>Selected</option>
                                <option>Rejected</option>
                                <option>Completed</option>
                                <option>Missed</option>
                            </select>
                        </div>
                        <div className="round-col">
                            <h4>Round 2</h4>
                            <input type="date" name="round2Date" value={formData.round2Date} onChange={handleChange} />
                            <select name="statusRound2" value={formData.statusRound2} onChange={handleChange}>
                                <option>Not Started</option>
                                <option>Selected</option>
                                <option>Rejected</option>
                                <option>Completed</option>
                                <option>Missed</option>
                            </select>
                        </div>
                        <div className="round-col">
                            <h4>Round 3</h4>
                            <input type="date" name="round3Date" value={formData.round3Date} onChange={handleChange} />
                            <select name="statusRound3" value={formData.statusRound3} onChange={handleChange}>
                                <option>Not Started</option>
                                <option>Selected</option>
                                <option>Rejected</option>
                                <option>Completed</option>
                                <option>Missed</option>
                            </select>
                        </div>
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

export default HackathonForm;
