import React, { useState, useEffect } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../services/api';
import TeamMemberList from './TeamMemberList';
import TeamMemberForm from './TeamMemberForm';

const TeamMemberDashboard = () => {
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const data = await getMembers();
            setMembers(data);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleCreate = async (formData) => {
        try {
            await createMember(formData);
            setIsModalOpen(false);
            fetchMembers();
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Failed to create member');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateMember(editingMember._id, formData);
            setIsModalOpen(false);
            setEditingMember(null);
            fetchMembers();
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Failed to update member');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await deleteMember(id);
                fetchMembers();
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Team Members</h2>
                <button className="btn-primary" onClick={() => {
                    setEditingMember(null);
                    setIsModalOpen(true);
                }}>+ Add Member</button>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <TeamMemberList
                    members={members}
                    onEdit={(m) => {
                        setEditingMember(m);
                        setIsModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {isModalOpen && (
                <TeamMemberForm
                    initialData={editingMember}
                    onSubmit={editingMember ? handleUpdate : handleCreate}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TeamMemberDashboard;
