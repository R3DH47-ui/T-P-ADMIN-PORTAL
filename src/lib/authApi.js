/**
 * Client API Client for Admin Authentication & Session Management
 * Coordinates with /api/admin/auth/* endpoints
 * NOTE: Signup has been removed. Only fixed admin accounts can sign in.
 */

export async function adminLogin({ name, password, remember_me = false }) {
  const res = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password, remember_me }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to authenticate');
  }
  if (data.token) {
    try {
      localStorage.setItem('rimt_admin_token', data.token);
      localStorage.setItem('rimt_admin_user', JSON.stringify(data.admin));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }
  return data;
}

export async function adminLogout() {
  try {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
  } catch (err) {
    console.warn('Logout API error:', err);
  } finally {
    try {
      localStorage.removeItem('rimt_admin_token');
      localStorage.removeItem('rimt_admin_user');
    } catch (e) {}
  }
  return true;
}

export async function getAdminMe() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rimt_admin_token') : null;
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('/api/admin/auth/me', {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (data?.admin) {
    try {
      localStorage.setItem('rimt_admin_user', JSON.stringify(data.admin));
    } catch (e) {}
  }
  return data.admin;
}

export async function updateAdminProfilePic(fileOrUrl) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rimt_admin_token') : null;
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let body;
  if (typeof fileOrUrl === 'string') {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify({ profile_pic_url: fileOrUrl });
  } else {
    const formData = new FormData();
    formData.append('file', fileOrUrl);
    body = formData;
  }

  const res = await fetch('/api/admin/auth/profile-pic', {
    method: 'POST',
    headers,
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update profile photo');
  }

  if (data.admin) {
    try {
      localStorage.setItem('rimt_admin_user', JSON.stringify(data.admin));
    } catch (e) {}
  }
  return data;
}

export async function changeAdminPassword({ current_password, new_password }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rimt_admin_token') : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch('/api/admin/auth/change-password', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ current_password, new_password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update password');
  }
  return data;
}
