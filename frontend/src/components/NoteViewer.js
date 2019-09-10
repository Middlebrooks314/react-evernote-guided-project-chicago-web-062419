import React, { Fragment } from 'react';



// props passed from content 
const NoteViewer = (props) => {

  return (
    <Fragment>
      <h2>{props.selectedNote.title}</h2>
      <p>{props.selectedNote.body}</p>
      <button onClick={() => props.handleEditClick()}>Edit</button>
      <button onClick={() => props.handleDelete(props.selectedNote.id)}>Delete</button>
    </Fragment>
  );
}

export default NoteViewer;
