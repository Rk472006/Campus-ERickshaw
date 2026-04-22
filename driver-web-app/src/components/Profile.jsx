import React, { useState, useEffect } from 'react';
import { User as UserIcon, Save, X } from 'lucide-react';

export default function Profile({ user, onClose }) {
  const [profileData, setProfileData] = useState({ 
    name: '', 
    email: '', 
    dob: '',
    vehicleNumber: '',
    licenseId: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${user.uid}`)
      .then(res => res.json())
      .then(data => {
         setProfileData({
             name: data.name || '',
             email: data.email || user.email,
             dob: data.dob || '',
             vehicleNumber: data.vehicleNumber || '',
             licenseId: data.licenseId || '',
             address: data.address || '',
             phone: data.phone || ''
         });
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [user]);

  const handleSave = (e) => {
      e.preventDefault();
      fetch(`http://localhost:5000/api/user/${user.uid}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              name: profileData.name,
              dob: profileData.dob,
              vehicleNumber: profileData.vehicleNumber,
              licenseId: profileData.licenseId,
              address: profileData.address,
              phone: profileData.phone
          })
      })
      .then(res => res.json())
      .then(() => setMessage('Profile updated successfully!'))
      .catch(() => setMessage('Failed to update profile.'));
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-color)', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
        <div className="top-header" style={{ position: 'relative', top: 0, left: 0, right: 0, padding: '20px', background: 'var(--panel-bg)', borderBottom: '1px solid var(--panel-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: 'bold' }}>
                <UserIcon color="var(--primary)" /> Driver Profile
            </div>
            <X size={24} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>

        <div style={{ padding: '32px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            {loading ? <p>Loading profile...</p> : (
                <form onSubmit={handleSave} className="glass-panel" style={{ padding: '32px', borderRadius: '16px' }}>
                    {message && <p style={{ color: 'var(--primary)', marginBottom: '16px', fontWeight: 'bold' }}>{message}</p>}
                    
                    <div className="input-group">
                        <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Email (Read Only)</label>
                        <input type="email" value={profileData.email} disabled style={{ opacity: 0.6 }} />
                    </div>

                    <div className="input-group">
                        <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Driver Full Name</label>
                        <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Date of Birth</label>
                            <input type="date" value={profileData.dob} onChange={e => setProfileData({...profileData, dob: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                            <input type="text" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Vehicle Number</label>
                            <input type="text" value={profileData.vehicleNumber} onChange={e => setProfileData({...profileData, vehicleNumber: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>License ID Number</label>
                            <input type="text" value={profileData.licenseId} onChange={e => setProfileData({...profileData, licenseId: e.target.value})} />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '24px' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Home Address</label>
                        <input type="text" value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} />
                    </div>

                    <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <Save size={20} /> Save Details
                    </button>
                </form>
            )}
        </div>
    </div>
  );
}
