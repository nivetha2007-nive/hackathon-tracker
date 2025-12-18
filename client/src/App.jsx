import React, { useState, useEffect } from 'react';
import { getHackathons, createHackathon, updateHackathon, deleteHackathon } from './services/api';
import HackathonList from './components/HackathonList';
import HackathonForm from './components/HackathonForm';
import { addDays, isSameDay, format } from 'date-fns';
import './styles/index.css';

function App() {
  const [hackathons, setHackathons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Hackathons
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
    // Request notification permission
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
            // Show notification
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
      const msg = error.response?.data?.message || 'Failed to create hackathon';
      alert(msg);
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
      const msg = error.response?.data?.message || 'Failed to update hackathon';
      alert(msg);
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

  const openAddModal = () => {
    setEditingHackathon(null);
    setIsModalOpen(true);
  };

  const openEditModal = (hackathon) => {
    setEditingHackathon(hackathon);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Hackathon Tracker</h1>
        <button className="btn-primary" onClick={openAddModal}>+ Add Hackathon</button>
      </header>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <HackathonList
          hackathons={hackathons}
          onEdit={openEditModal}
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
}

export default App;
