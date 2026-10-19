import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Konfigurasi Supabase belum tersedia. Atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message === 'Invalid login credentials'
          ? 'Email atau password salah.'
          : signInError.message);
        return;
      }
      onLogin();
    } catch (signInError: unknown) {
      setError(signInError instanceof Error ? signInError.message : 'Tidak dapat terhubung ke server autentikasi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page section-padding">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>Login Admin</h3>
          <p style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            Masuk menggunakan email dan password admin yang terdaftar.
          </p>
          {!supabase && (
            <div role="alert" style={{ color: 'var(--color-danger)', marginBottom: '0.75rem' }}>
              Supabase belum dikonfigurasi. Atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sesuai petunjuk README.
            </div>
          )}
          {error && <div role="alert" style={{ color: 'var(--color-danger)', marginBottom: '0.75rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-email">Email</label>
              <input id="admin-email" type="email" className="form-control" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">Password</label>
              <input id="admin-password" type="password" className="form-control" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary" type="submit" disabled={isSubmitting || !supabase}>
                {isSubmitting ? 'Memeriksa...' : 'Masuk'}
              </button>
              <button type="button" className="btn btn-outline" disabled={isSubmitting} onClick={() => { setEmail(''); setPassword(''); setError(''); }}>Batal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
