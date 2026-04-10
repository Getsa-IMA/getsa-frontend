export interface SyncUserData {
  email: string;
  tenant: string;
}

export interface ProfileData {
  fullName: string;
  phone: string;
  city: string;
  state: string;
  whatsapp: string;
  instagramLink: string;
  instagramFollowers: string;
  youtubeSubscribers: string;
  views30Days: string;
  tools: string[];
  genderMen: string;
  genderWomen: string;
  genderOther: string;
  age18to24: string;
  age25to34: string;
  age45to54: string;
  age55to64: string;
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

export const saveProfile = async (profileData: ProfileData, token: string, imageFile?: File) => {
  try {
    console.log("Saving profile data with image...", profileData);

    const formData = new FormData();

    // 1. Add the IMAGE file with the key "image"
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // 2. Add all other fields from profileData
    Object.entries(profileData).forEach(([key, value]) => {
      if (key === "tools") {
        // Arrays must be stringified for FormData
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await fetch("http://localhost:5000/api/v1/creators/profile", {
      method: "POST",
      headers: {
        // IMPORTANT: DO NOT set Content-Type header here manually.
        // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
        "Authorization": `Bearer ${token}`,
      },
      body: formData, // Send FormData instead of JSON string
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile save failed:", response.status, errorText);
      return { success: false, status: response.status, error: errorText };
    }

    const result = await response.json();
    console.log("Profile saved successfully:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in saveProfile service:", error);
    return { success: false, error: (error as Error).message };
  }
};

