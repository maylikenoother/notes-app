import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function Editor({ tempNoteText, setTempNoteText }) {
  const mdParser = new MarkdownIt();

  // Event handler for editor content change
  const handleEditorChange = ({ text }) => {
    console.log("Editor content changed:", text);
    setTempNoteText(text);
  };

  console.log("Editor value:", tempNoteText);

  return (
    <section className="pane editor">
      <MdEditor
        value={tempNoteText}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </section>
  );
}

//Declare prop types for type checking
Editor.propTypes = {
  tempNoteText: PropTypes.object,  // Currently selected note
  setTempNoteText: PropTypes.func,
};
