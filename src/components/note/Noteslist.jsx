import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../features/notesSlice"; // Import the fetchNotes thunk
import Addnote from "./Addnote";
import Note from "./Note";
import Loader from "../util/Loader";

function Noteslist() {
  const dispatch = useDispatch();

  // Access the active board ID and loading status from the boards slice
  const { activeBoard, loading: boardLoading } = useSelector(
    (state) => state.boards
  );
  const { notes, loading: notesLoading } = useSelector((state) => state.notes);

  const loading = boardLoading || notesLoading;

  // Fetch notes for the active board when the component mounts or when the activeBoard changes
  useEffect(() => {
    if (activeBoard) {
      dispatch(fetchNotes(activeBoard.$id)); // Dispatch fetchNotes with active board ID
    }
  }, [dispatch, activeBoard]);

  return (
    <section className="w-full h-[90vh] overflow-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <>
          <p className="w-full text-center text-2xl capitalize underline font-semibold pt-4 text-gray-600">
            {activeBoard ? activeBoard?.boardName : "Select a Board"}
          </p>
          <div className="w-full flex flex-wrap justify-evenly gap-4 p-2 mb-20">
            {notes && notes.length > 0 ? (
              notes.map((note) => <Note key={note.$id} note={note} />)
            ) : (
              <p className="w-full text-center text-xl text-gray-600 p-4">
                It looks like you haven't added any notes yet. Start creating
                some to get organized!
              </p>
            )}
          </div>
          <Addnote className="absolute bottom-0 right-0 m-4" />
        </>
      )}
    </section>
  );
}

export default Noteslist;
