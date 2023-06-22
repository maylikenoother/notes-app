import PropTypes from 'prop-types';

export default function Sidebar(props) {
    // Create an array of note elements
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                // Add a CSS class "selected-note" if the note is currently selected
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                // Set the current note ID when the note is clicked
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    // Delete the note when the delete button is clicked
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    );
}

// Declare prop types for type checking
Sidebar.propTypes = {
    notes: PropTypes.array,                   // Array of notes
    currentNote: PropTypes.object,            // Currently selected note
    setCurrentNoteId: PropTypes.func,         // Function to set the current note ID
    deleteNote: PropTypes.func,               // Function to delete a note
    newNote: PropTypes.func                   // Function to create a new note
};
