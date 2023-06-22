import React from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Split from "react-split";
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { notesCollection, db } from "../firebase";

export default function App() {
  const [notes, setNotes] = React.useState([]); // State for storing the notes
  const [currentNoteId, setCurrentNoteId] = React.useState(""); // State for storing the ID of the current note being displayed
  const [tempNoteText, setTempNoteText] = React.useState(""); // State for storing the text of the temp note being displayed

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0]; // Get the current note based on the currentNoteId

  // Create a new sortedNotes array that orders notes by updatedAt in descending order
  const sortedNotes = notes.sort((note1, note2) => {
    const updatedAt1 = note1.updatedAt;
    const updatedAt2 = note2.updatedAt;

    if (updatedAt1 > updatedAt2) {
      return -1; // note1 comes before note2
    } else if (updatedAt1 < updatedAt2) {
      return 1; // note2 comes before note1
    } else {
      return 0; // notes have the same updatedAt value
    }
  });

  // Fetch the notes from the Firestore collection and update the local notes state
  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  // Set the currentNoteId to the ID of the first note when the notes array is updated or initially loaded
  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  //set the current note in the editor
  React.useEffect(() => {
    if(currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote])

  React.useEffect(() => {
     const timeoutId = setTimeout(() => {
        if (tempNoteText !== currentNote.body) {
          updateNote(tempNoteText);
           }
     }, 500)
     return () => clearTimeout(timeoutId)
  }, [tempNoteText])

  // Create a new note in Firestore with default values
  async function createNewNote() {
    const newNote = {
      body: "Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  // Update the text content of the current note in Firestore and update the updatedAt timestamp
  async function updateNote(text) {
    console.log("Updating note:", currentNoteId, "with text:", text);
    const docRef = doc(db, "notes", currentNoteId);
    try {
      console.log("Before updating note in Firestore");
      await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
      console.log("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  // Delete a note from Firestore
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor tempNoteText={tempNoteText} setTempNoteText={setTempNoteText} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
