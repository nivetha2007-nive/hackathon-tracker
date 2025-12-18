import React, { useState, useEffect } from 'react';
import { getHackathons, createHackathon, updateHackathon, deleteHackathon } from '../services/api';
import HackathonList from './HackathonList';
import HackathonForm from './HackathonForm';
import { addDays, isSameDay } from 'date-fns';

const HackathonDashboard = () => {
    const [hackathons, setHackathons] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHackathon, setEditingHackathon] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchHackathons = async () => {
        try {
            setLoading(true);
            const data = await getHackathons();
            setHackathons(data);
            checkReminders(data);
        } catch (error) {
            console.error('Failed to fetch hackathons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHackathons();
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const checkReminders = (data) => {
        if (Notification.permission !== 'granted') return;

        const today = new Date();
        const tomorrow = addDays(today, 1);

        data.forEach(h => {
            const rounds = [
                { name: 'Round 1', date: h.round1Date, status: h.statusRound1 },
                { name: 'Round 2', date: h.round2Date, status: h.statusRound2 },
                { name: 'Round 3', date: h.round3Date, status: h.statusRound3 },
            ];

            rounds.forEach(r => {
                if (r.date && r.status === 'Not Started') {
                    const rDate = new Date(r.date);
                    if (isSameDay(rDate, tomorrow)) {
                        new Notification(`Upcoming Deadline: ${h.name}`, {
                            body: `Tomorrow is ${r.name} for ${h.name}!`,
                        });
                    }
                }
            });
        });
    };

    const handleCreate = async (formData) => {
        try {
            await createHackathon(formData);
            setIsModalOpen(false);
            fetchHackathons();
        } catch (error) {
            console.error('Error creating hackathon:', error);
            alert('Failed to create hackathon');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateHackathon(editingHackathon._id, formData);
            setIsModalOpen(false);
            setEditingHackathon(null);
            fetchHackathons();
        } catch (error) {
            console.error('Error updating hackathon:', error);
            alert('Failed to update hackathon');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hackathon?')) {
            try {
                await deleteHackathon(id);
                fetchHackathons();
            } catch (error) {
                console.error('Error deleting hackathon:', error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Hackathons</h2>
                <button className="btn-primary" onClick={() => {
                    setEditingHackathon(null);
                    setIsModalOpen(true);
                }}>+ Add Hackathon</button>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <HackathonList
                    hackathons={hackathons}
                    onEdit={(h) => {
                        setEditingHackathon(h);
                        setIsModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {isModalOpen && (
                <HackathonForm
                    initialData={editingHackathon}
                    onSubmit={editingHackathon ? handleUpdate : handleCreate}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default HackathonDashboard;
