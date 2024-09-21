import { Client, Databases, Account, ID } from "appwrite";
import conf from '../conf/conf';

const client = new Client();

// Initialize the Appwrite client
client
  .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
  .setProject(conf.appwriteprojectId); // Your project ID

// Initialize Appwrite services
const account = new Account(client);
const databases = new Databases(client);

// Export the initialized services
export { account, databases, ID };
