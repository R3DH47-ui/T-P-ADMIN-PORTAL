/**
 * Client API Client for Admin Authentication & Multi-Account Management
 * Coordinates with /api/admin/auth/* endpoints
 */

const ACCOUNTS_STORAGE_KEY = 'rimt_admin_accounts';

/**
 * Determines whether two admin account objects represent the same identity.
 */
export function isSameAdminAccount(a, b) {
  if (!a || !b) return false;
  if (a.id && b.id && String(a.id) === String(b.id)) return true;
  const aEmail = (a.email || '').trim().toLowerCase();
  const bEmail = (b.email || '').trim().toLowerCase();
  if (aEmail && bEmail && aEmail === bEmail) return true;
  const aName = (a.full_name || a.name || '').trim().toLowerCase();
  const bName = (b.full_name || b.name || '').trim().toLowerCase();
  if (aName && bName && aName === bName) return true;
  return false;
}

export function getSavedAccounts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Default known database administrator (Raj Kumar - HOD BCA)
    const defaults = [
      {
        id: 'a0000000-0000-0000-0000-000000000001',
        full_name: 'Raj Kumar',
        name: 'Raj Kumar',
        email: 'raj.kumar@rimt.ac.in',
        role: 'ADMIN',
        roleTitle: 'HOD BCA',
        profile_pic_url: 'https://ui-avatars.com/api/?name=Raj+Kumar&background=7A1D27&color=fff&bold=true',
        lastActive: new Date().toISOString(),
      },
    ];
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  } catch (e) {
    return [];
  }
}

export function saveAccountSession(adminUser, token) {
  if (!adminUser || typeof window === 'undefined') return [];
  try {
    const accounts = getSavedAccounts();
    const filtered = accounts.filter((a) => !isSameAdminAccount(a, adminUser));
    const fullName = adminUser.full_name || adminUser.name || 'Administrator';
    const email = adminUser.email || (fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in');
    const existing = accounts.find((a) => isSameAdminAccount(a, adminUser));

    const updated = [
      {
        id: adminUser.id || existing?.id || `admin-${Date.now()}`,
        full_name: fullName,
        name: fullName,
        email: email,
        role: adminUser.role || existing?.role || 'ADMIN',
        profile_pic_url: adminUser.profile_pic_url || existing?.profile_pic_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=7A1D27&color=fff&bold=true`,
        token: token || adminUser.token || existing?.token || null,
        lastActive: new Date().toISOString(),
      },
      ...filtered,
    ];
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save account session:', e);
    return [];
  }
}

export function removeAccountSession(target) {
  if (typeof window === 'undefined' || !target) return [];
  try {
    const accounts = getSavedAccounts();
    const updated = accounts.filter((a) => {
      if (typeof target === 'object') {
        return !isSameAdminAccount(a, target);
      }
      const matchId = String(a.id) === String(target);
      const matchEmail = a.email && a.email.toLowerCase() === String(target).toLowerCase();
      const matchName = (a.full_name || a.name) && (a.full_name || a.name).toLowerCase() === String(target).toLowerCase();
      return !matchId && !matchEmail && !matchName;
    });
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

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
      saveAccountSession(data.admin, data.token);
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }
  return data;
}

export async function adminSignup({ name, email, password, role = 'ADMIN' }) {
  const res = await fetch('/api/admin/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to register administrator');
  }
  if (data.token) {
    try {
      localStorage.setItem('rimt_admin_token', data.token);
      localStorage.setItem('rimt_admin_user', JSON.stringify(data.admin));
      saveAccountSession(data.admin, data.token);
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
    try {
      sessionStorage.removeItem('rimt_splash_shown');
    } catch (e) {}
  }
  return true;
}

export async function getAdminMe() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rimt_admin_token') : null;
  const cachedUserStr = typeof window !== 'undefined' ? localStorage.getItem('rimt_admin_user') : null;
  let cachedUser = null;
  try {
    if (cachedUserStr) cachedUser = JSON.parse(cachedUserStr);
  } catch (e) {}

  if (!token) return cachedUser;

  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const res = await fetch('/api/admin/auth/me', {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      return cachedUser;
    }
    const data = await res.json();
    if (data?.admin) {
      // Identity guard: only update session storage if returned admin matches the client active identity
      if (!cachedUser || isSameAdminAccount(cachedUser, data.admin)) {
        try {
          localStorage.setItem('rimt_admin_user', JSON.stringify(data.admin));
          if (token) {
            saveAccountSession(data.admin, token);
          }
        } catch (e) {}
        return data.admin;
      } else {
        console.warn('Retaining active admin account:', cachedUser.full_name || cachedUser.name);
        return cachedUser;
      }
    }
  } catch (err) {
    return cachedUser;
  }

  return cachedUser;
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
      if (token) saveAccountSession(data.admin, token);
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
