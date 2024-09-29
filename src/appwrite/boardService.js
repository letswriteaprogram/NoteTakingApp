import { Query } from "appwrite";
import conf from "../conf/conf";
import { databases, ID } from "./appwriteClient";

const databasesId = conf.appwritedatabaseId;
const boardCollectionId = conf.appwriteboardcollectionId;

// Function to create a new board document using Appwrite
export const createBoard = async (userId, boardName) => {
  try {
    return await databases.createDocument(databasesId, boardCollectionId, ID.unique(), {
      userId,
      boardName,
      isActive: false,
    });
  } catch (error) {
    console.error("Appwrite service :: createBoard : error", error);
    throw new Error("Failed to create board");
  }
};

// Function to get all boards using Appwrite
export const getBoards = async (userId) => {
  try {
    return await databases.listDocuments(databasesId, boardCollectionId, [
      Query.equal("userId", userId),
    ]);
  } catch (error) {
    console.error("Appwrite service :: getBoards : error", error);
    throw new Error("Failed to get boards");
  }
};

// Function to update board using Appwrite
export const updateBoard = async (boardId, data) => {
  try {
    return await databases.updateDocument(databasesId, boardCollectionId, boardId, data);
  } catch (error) {
    console.error("Appwrite service :: updateBoard : error", error);
    throw new Error("Failed to update board");
  }
};

// Function to delete board using Appwrite
export const deleteBoard = async (boardId) => {
  try {
    return await databases.deleteDocument(databasesId, boardCollectionId, boardId);
  } catch (error) {
    console.error("Appwrite service :: deleteBoard : error", error);
    throw new Error("Failed to delete board");
  }
};
