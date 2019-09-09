import React, { Fragment } from 'react';

const NoteViewer = (props) => {
  console.log("noteviewer", props)
  return (
    <Fragment>
      <h2>{props.selectedNote.title}</h2>
      <p>{props.selectedNote.body}</p>
      <button onClick={() => console.log('EDIT BUTTON!!!')}>Edit</button>
    </Fragment>
  );
}

export default NoteViewer;
