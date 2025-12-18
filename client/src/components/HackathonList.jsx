import React from 'react';
import { format, isAfter, isSameDay, addDays } from 'date-fns';

const HackathonList = ({ hackathons, onEdit, onDelete }) => {

    const getStatusColor = (date, status) => {
        if (!date) return ''; // No date set
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const roundDate = new Date(date);

        if (status === 'Selected' || status === 'Completed') return 'status-success';
        if (status === 'Rejected') return 'status-rejected';

        // Check if missed
        if (isAfter(today, roundDate) && status === 'Not Started') {
            return 'status-missed';
        }

        return '';
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return format(new Date(date), 'MMM dd, yyyy');
    };

    return (
        <div className="table-container">
            <table className="hackathon-table">
                <thead>
                    <tr>
                        <th>Hackathon Name</th>
                        <th>Team Size</th>
                        <th>Selected Members</th>
                        <th>Round 1</th>
                        <th>Round 2</th>
                        <th>Round 3</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hackathons.map((h) => (
                        <tr key={h._id}>
                            <td>
                                <div className="hackathon-name">{h.name}</div>
                                {h.eventLink && <a href={h.eventLink} target="_blank" rel="noreferrer" className="event-link">Link</a>}
                            </td>
                            <td className="text-center">{h.teamSizeLimit}</td>
                            <td>{h.teamMembers.join(', ')}</td>

                            <td className={getStatusColor(h.round1Date, h.statusRound1)}>
                                <div className="date">{formatDate(h.round1Date)}</div>
                                <div className="status">{h.statusRound1}</div>
                            </td>

                            <td className={getStatusColor(h.round2Date, h.statusRound2)}>
                                <div className="date">{formatDate(h.round2Date)}</div>
                                <div className="status">{h.statusRound2}</div>
                            </td>

                            <td className={getStatusColor(h.round3Date, h.statusRound3)}>
                                <div className="date">{formatDate(h.round3Date)}</div>
                                <div className="status">{h.statusRound3}</div>
                            </td>

                            <td>
                                <button className="btn-icon edit" onClick={() => onEdit(h)}>✎</button>
                                <button className="btn-icon delete" onClick={() => onDelete(h._id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                    {hackathons.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center">No hackathons added yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HackathonList;
