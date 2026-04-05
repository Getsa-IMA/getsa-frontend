export interface SyncUserData {
  email: string;
  tenant: string;
}

export const syncUserWithBackend = async (userData: SyncUserData, token?: string) => {
  try {
    console.log("Syncing user with backend through service...", userData);
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("http://localhost:5000/api/v1/users", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend sync failed:", response.status, errorText);
      return { success: false, status: response.status, error: errorText };
    }

    console.log("User successfully synced with backend via service.");
    return { success: true };
  } catch (error) {
    console.error("Error in syncUserWithBackend service:", error);
    return { success: false, error: (error as Error).message };
  }
};
