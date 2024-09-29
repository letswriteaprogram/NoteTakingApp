import conf from "../conf/conf";
import { account, ID } from "./appwriteClient";

// Function to sign up a user using Appwrite
const signup = async (email, password, name) => {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.error("Appwrite service :: Signup failed: ", error);
    let customMessage = "Signup failed. Please try again.";
    if (error.code === 409) {
      customMessage = "Email already in use. Please try logging in.";
    }
    throw new Error(customMessage); // Informative error thrown here
  }
};

// Function to login a user using Appwrite
const login = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Appwrite service :: Login failed: ", error);
    let customMessage = "Signup failed. Please try again.";
    if (error.code === 401) {
      customMessage =
        "Invalid credentials. Please check your email or password and try again.";
    } else if (error.code === 429) {
      customMessage =
        "Too many login attempts. Please wait for a few minutes before trying again..";
    }
    throw new Error(customMessage); // Informative error thrown here
  }
};

// Function to send email verification to the user using Appwrite
const emailVerification = async () => {
  try {
    const verificationUrl =
      conf.emailVerificationUrl || "http://localhost:5173";
    return await account.createVerification(verificationUrl);
  } catch (error) {
    console.error("Appwrite service :: Email verification failed: ", error);
    throw new Error("Email verification failed. Please try again.");
  }
};

// Function to logout the current user using Appwrite
const logout = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error("Appwrite service :: Logout failed: ", error);
    throw new Error("Logout failed. Please try again.");
  }
};

// Function to get the current logged-in user using Appwrite
const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    // console.error("Appwrite service :: Failed to get current user: ", error);
    // throw new Error("Failed to retrieve current user. Please try again.");
  }
};

export { signup, login, logout, getCurrentUser, emailVerification };
