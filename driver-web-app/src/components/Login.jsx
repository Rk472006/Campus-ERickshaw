import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebaseConfig';
import { CarTaxiFront, LogIn, UserPlus } from 'lucide-react';

export default function Login({ onAuthSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Extra fields for registration
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [address, setAddress] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let creds;
      if (isRegistering) {
        if (!name) return setError("Please provide your full name");
        creds = await createUserWithEmailAndPassword(auth, email, password);
        
        // Sync to MongoDB
        await fetch('http://localhost:5000/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firebaseUid: creds.user.uid,
                email: creds.user.email,
                name: name,
                role: 'DRIVER',
                dob,
                phone,
                vehicleNumber,
                licenseId,
                address
            })
        });

      } else {
        creds = await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <CarTaxiFront color="var(--primary)" size={48} style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Driver Portal Web</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to accept campus rides</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(255, 71, 87, 0.1)', color: 'var(--danger)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth}>
          {isRegistering && (
             <>
                 <div className="input-group">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                       <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                       <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                       <input type="text" placeholder="Vehicle No." value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                       <input type="text" placeholder="License ID" value={licenseId} onChange={(e) => setLicenseId(e.target.value)} required />
                    </div>
                 </div>
                 <div className="input-group">
                    <input type="text" placeholder="Home Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                 </div>
             </>
          )}
          <div className="input-group">
            <input  
              type="email" 
              placeholder="Driver Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {isRegistering ? <><UserPlus size={20}/> Register</> : <><LogIn size={20}/> Sign In</>}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Sign In' : 'Register Here'}
          </span>
        </p>

      </div>
    </div>
  );
}
