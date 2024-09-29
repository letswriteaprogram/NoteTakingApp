const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteprojectId: String(import.meta.env.VITE_APPWRITE_PROJECTID),
  appwritedatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteboardcollectionId: String(import.meta.env.VITE_APPWRITE_BOARDS_COLLECTION_ID),
  appwritenotescollectionId: String(import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID),
  emailVerificationUrl: String(import.meta.env.VITE_EMAIL_VERIFICATION_URL),
};
export default conf;
