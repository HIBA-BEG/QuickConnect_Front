const apiUrl  = process.env.REACT_APP_API_URL;


// if (!apiUrl) {
//   console.error('REACT_APP_API_URL is not defined in environment variables');
//   throw new Error('API URL is not configured');
// }

// Remove the console.log that was showing undefined
console.log("apiUrl",apiUrl);

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture?: string;
  phoneNumber?: string;
  status: UserStatus;
}

export const loginUser = async (email: string): Promise<User> => {
  try {
    const response = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}): Promise<User> => {
  try {
    const response = await fetch(`${apiUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (error) {
        console.error('Logout error:', error);
      throw error;
    }
  };