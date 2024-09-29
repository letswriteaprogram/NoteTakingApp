import { databases, ID } from "./appwriteClient";
import conf from "../conf/conf";
import { Query } from "appwrite";

const databasesId = conf.appwritedatabaseId;
const notesCollectionId = conf.appwritenotescollectionId;

// Function to create a new note using Appwrite
export const createNote = async (boardId, noteName, noteText) => {
  try {
    return await databases.createDocument(databasesId, notesCollectionId, ID.unique(), {
      boardId,
      noteName,
      noteText,
      createdDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Appwrite service :: createNote : error", error);
    throw new Error("Failed to create note");
  }
};

// Function to get all notes using Appwrite
export const getNotes = async (boardId) => {
  try {
    return await databases.listDocuments(databasesId, notesCollectionId, [
      Query.equal("boardId", boardId),
    ]);
  } catch (error) {
    console.error("Appwrite service :: getNotes : error", error);
    throw new Error("Failed to get notes");
  }
};

// Function to update a note using Appwrite
export const updateNote = async (noteId, data) => {
  try {
    return await databases.updateDocument(databasesId, notesCollectionId, noteId, data);
  } catch (error) {
    console.error("Appwrite service :: updateNote : error", error);
    throw new Error("Failed to update note");
  }
};

// Function to delete a note using Appwrite
export const deleteNote = async (noteId) => {
  try {
    return await databases.deleteDocument(databasesId, notesCollectionId, noteId);
  } catch (error) {
    console.error("Appwrite service :: deleteNote : error", error);
    throw new Error("Failed to delete note");
  }
};
// Function to delete All notes of Board using Appwrite
export const removeNotesByBoardId = async (boardId) => {
  try {
    // Query to get all notes related to the boardId
    const notesList = await databases.listDocuments(databasesId, notesCollectionId, [
      Query.equal('boardId', boardId)
    ]);

    // Loop through the returned notes and delete each one
    const deletePromises = notesList.documents.map(note => 
      databases.deleteDocument(databasesId, notesCollectionId, note.$id)
    );

    // Wait for all deletion promises to resolve
    await Promise.all(deletePromises);

    return "All notes deleted successfully!";
  } catch (error) {
    console.error("Appwrite service :: deleteAllNotes : error", error);
    throw new Error("Failed to delete notes");
  }
};