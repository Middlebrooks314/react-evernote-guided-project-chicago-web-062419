import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  //props have been passed from the sidebar 
  //props include an array of notes
  // console.log("in note list", props);
  return (
    <ul>
      {props.notes.map(note => {
        return (
          <NoteItem 
          id={note.id} 
          key={note.id} 
          note={note} 
          selectedNote={props.selectedNote}
          />
        );
      })}
    </ul>
  );
}

export default NoteList;

// const mappedNotes = props.notes.map(note => <NoteItem id={note.id} key={note.id} note={note} selectedNote={() => props.selectedNote(note.id)} />)

//   return (
//     <ul>
//       {mappedNotes}
//     </ul>
//   );
// }

// which way is better?