import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";
const notesURL = "http://localhost:3000/api/v1/notes";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: {},
      editingNote: false,
      searchInput: null
    };
  }

  // Fetching Notes from the database & setting the original state with the array of note objects returned from the fetch
  fetchNotes() {
    fetch(notesURL)
      .then(resp => resp.json())
      .then(notes => this.setState({ notes }))
      .catch(err => console.log(err));
  }

  // waits for the DOM to load in order to call the fetchNotes requests
  componentDidMount() {
    this.fetchNotes();
  }

  // Selects a single note from the Sidebar and displays it in the NoteViewer
  // Sets the selectedNote state to equal the note that is clicked
  // if another note clicked while inside of the NoteEditor then the state of the editingNote will be set back to false so that the the NoteViewer will render. 
  selectedNote = id => {
    let clickedNote = this.state.notes.find(note => note.id === id);
    this.setState({
      selectedNote: clickedNote,
      editingNote: false
    });
  };

  //passed through props to the noteViewer which will be fired by an onClick function inside of the edit button. 
  // editing note will be toggled to true in order the conditionally render the noteEditor in the Content Component
  handleEditClick = () => {
    this.setState({
      editingNote: true
    });
  };

  // once the edit form has submitted this posts to the database, and pessimistically renders the updated note by calling on the updatedNotes function. Also the handleCancelEdit function fires to close the NoteEditor and return to the NoteViewer
  handleEditSubmit = (state, id) => {
     fetch(`${notesURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: state.title,
        body: state.body
      })
    })
      .then(resp => resp.json())
      .then(update => this.updateNotes(update))
      .then(this.handleCancelEdit())
      .catch(err => console.log(err));
  };

  //takes in the response from the PATCH fetch request, maps over the notesArray and finds the one that matches the id of the updated note and replaces it with the updated version of the note and updates the state to the notesArray with the updated note in it. The selectedNote state is updated to the updated note so that the NoteViewer will show the current changes 
  updateNotes = update => {
    
    const updatedNoteArray = this.state.notes.map(note => {
      if (note.id === update.id) {
        return update;
      } else {
        return note;
      }
    });
    this.setState({
      notes: updatedNoteArray,
      selectedNote: update
    });
  };

  // passed through props on the SideBar component, an onClick function on the New button will fire this function
  // sends a Post fetch request with the new note having default parameters that can be edited later. Pessimistically renders the new note and sends the new note object to the renderBrandNewNote() 
  brandNewNote = () => {
    fetch(`${notesURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: "Title",
        body: "Note Details"
      })
    })
      .then(resp => resp.json())
      .then(newNote => {
        this.renderBrandNewNote(newNote);
      })
      .catch(err => console.log(err));
  };

  //takes in the previous state notes array and adds the new note to the end of the array.
  renderBrandNewNote = newNote => {
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote]
    }));
  };

  //sent through props to the NoteEditor with an onClick on the Edit button, sets the editingNote state back to false so that the noteEditor will not render. 
  handleCancelEdit = () => {
    this.setState({
      editingNote: false
    });
  };

  // passed through props to Search component the search bar has an onChange listener so that the state will be updated to whatever is typed into the search bar. 
  handleSearch = event => {
    this.setState({
      searchInput: event.target.value
    });
  };

  //filters the notes array to find where the searchInput matches any note titles 
  //conditional rendering occurs in the SideBar 'notes' props. 
  searchNotes = () => {
    return this.state.notes.filter(note =>
      note.title.includes(this.state.searchInput) || note.body.includes(this.state.searchInput)
    );
  };

  // passed through props to the noteViewer that has an onClick function, takes in the id of the note and sends a DELETE fetch to the database. invokes the original fetchNotes function so that it will grab the most updated notes array from the database. Also clears the noteViewer by updating the selectedNote state to be empty.
  handleDelete = id => {
    fetch(`${notesURL}/${id}`, {
      method: "DELETE"
    }).then(() => {
      this.fetchNotes();
      this.setState({
        selectedNote: {}
      });
    });
  };


  // the notes prop sent to the Sidebar evaluates if anything inside of the searchInput state and will fire the searchNotes function otherwise will render the entire notes array 
  render() {
    return (
      <Fragment>
        <Search
          handleSearch={this.handleSearch}
        />
        <div className="container">
          <Sidebar
            notes={
              this.state.searchInput ? this.searchNotes() : this.state.notes
            }
            selectedNote={this.selectedNote}
            brandNewNote={this.brandNewNote}
          />
          <Content
            selectedNote={this.state.selectedNote}
            handleEditClick={this.handleEditClick}
            editingNote={this.state.editingNote}
            handleCancelEdit={this.handleCancelEdit}
            handleEditSubmit={this.handleEditSubmit}
            handleDelete={this.handleDelete}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
