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
    // this.selectedNote = this.selectedNote.bind(this)
  }

  // Fetching Notes from the database & setting the original state to the array of note objects
  fetchNotes() {
    fetch(notesURL)
      .then(resp => resp.json())
      .then(notes => this.setState({ notes }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchNotes();
  }

  // method to select one note so that it can display an individual note in the content component
  selectedNote = id => {
    // console.log("noteContainer", id)
    let clickedNote = this.state.notes.find(note => note.id === id);
    this.setState({
      selectedNote: clickedNote,
      editingNote: false
    });
    // console.log(clickedNote)
  };

  handleEditClick = () => {
    this.setState({
      editingNote: true
    });
  };

  handleEditSubmit = (state, id) => {
    console.log(state.body, state.title, id);
    console.log(`${notesURL}/${id}`);

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

  updateNotes = update => {
    console.log(update);

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

  brandNewNote = () => {
    fetch(`${notesURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: "default",
        body: "default"
      })
    })
      .then(resp => resp.json())
      .then(newNote => {
        this.renderBrandNewNote(newNote);
        console.log(newNote);
      })
      .catch(err => console.log(err));
  };

  renderBrandNewNote = newNote => {
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote]
    }));
  };

  handleCancelEdit = () => {
    this.setState({
      editingNote: false
    });
  };

  handleSearch = event => {
    this.setState({
      searchInput: event.target.value
    });
  };

  searchNotes = () => {
    return this.state.notes.filter(
      note => note.title === this.state.searchInput
    );
  };

  handleDelete = id => {
    console.log("delete", id);
    fetch(`${notesURL}/${id}`, {
      method: "DELETE"
    }).then(console.log("deleted!!!"));
  };

  // passing props to the Sidebar & Content components
  render() {
   
    console.log(this.state.searchInput)
    return (
      <Fragment>
        <Search
          handleSearch={this.handleSearch}
          searchNotes={this.searchNotes}
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
