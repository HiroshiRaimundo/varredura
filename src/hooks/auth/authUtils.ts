
// Validate user session
export const validateSession = (): boolean => {
  const auth = localStorage.getItem("isAuthenticated");
  const session = localStorage.getItem("sessionId");
  const lastActivity = localStorage.getItem("lastActivity");
  
  if (!auth || !session || !lastActivity) {
    return false;
  }

  // Verifica se a última atividade foi há menos de 24 horas
  const lastActivityTime = parseInt(lastActivity, 10);
  const now = Date.now();
  const hoursSinceLastActivity = (now - lastActivityTime) / (1000 * 60 * 60);
  
  if (hoursSinceLastActivity > 24) {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("lastActivity");
    return false;
  }

  return true;
};

// Update last activity timestamp
export const updateLastActivity = (): void => {
  localStorage.setItem("lastActivity", Date.now().toString());
};

// Load user data from localStorage
export const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : undefined;
};

// Save authentication data
export const saveAuthData = (userData: any): void => {
  const sessionId = Date.now().toString();
  
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("lastActivity", Date.now().toString());
  localStorage.setItem("user", JSON.stringify(userData));
};

// Clear authentication data
export const clearAuthData = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("sessionId");
  localStorage.removeItem("lastActivity");
  localStorage.removeItem("user");
};

// Check URL for impersonation parameter
export const checkForImpersonation = (search: string): string | null => {
  const params = new URLSearchParams(search);
  return params.get('impersonate');
};
