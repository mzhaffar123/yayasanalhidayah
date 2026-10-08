import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', '1');
      onLogin();
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="admin-login-page section-padding">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>Login Admin (Demo)</h3>
          <p style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            Masuk untuk mengelola konten situs. Gunakan kredensial demo.
          </p>
          {error && <div style={{ color: 'var(--color-danger)', marginBottom: '0.75rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary" type="submit">Masuk</button>
              <button type="button" className="btn btn-outline" onClick={() => { setUsername(''); setPassword(''); setError(''); }}>Batal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
