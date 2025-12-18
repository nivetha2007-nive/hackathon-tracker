import React from 'react';
import { format } from 'date-fns';

const TeamMemberList = ({ members, onEdit, onDelete }) => {
    const formatDate = (date) => {
        if (!date) return '-';
        return format(new Date(date), 'dd-MM-yyyy');
    };

    return (
        <div className="table-container">
            <table className="hackathon-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Email (Personal)</th>
                        <th>Email (College)</th>
                        <th>GitHub</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member._id}>
                            <td>{member.name}</td>
                            <td>{formatDate(member.dateOfBirth)}</td>
                            <td>{member.personalEmail}</td>
                            <td>{member.collegeEmail}</td>
                            <td>
                                {member.githubId ? (
                                    <a href={member.githubId} target="_blank" rel="noreferrer">
                                        View
                                    </a>
                                ) : '-'}
                            </td>
                            <td>{member.address}</td>
                            <td>
                                <button className="btn-icon edit" onClick={() => onEdit(member)}>✎</button>
                                <button className="btn-icon delete" onClick={() => onDelete(member._id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                    {members.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center">No team members found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TeamMemberList;
