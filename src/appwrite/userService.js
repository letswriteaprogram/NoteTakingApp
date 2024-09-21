import { account, ID } from "./appwriteClient";

// Sign up a user
const signup = async (email, password, name) => {
  try {
    return await account.create(ID, email, password, name);
  } catch (error) {
    throw new Error("Signup failed: " + error.message);
  }
};

// Login a user
const login = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

// Send email verification to the user
const emailVerification = async () => {
  try {
    return await account.createVerification("http://localhost:5173");
  } catch (error) {
    throw new Error("Email verification failed: " + error.message);
  }
};

// Logout the current user
const logout = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    throw new Error("Logout failed: " + error.message);
  }
};

// Get current logged-in user
const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    throw new Error("Failed to get current user: " + error.message);
  }
};

export { signup, login, logout, getCurrentUser, emailVerification };
