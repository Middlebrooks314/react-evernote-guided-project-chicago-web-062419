import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: {},
      edit: false
    };
    // this.selectedNote = this.selectedNote.bind(this)
  }

  // Fetching Notes from the database & setting the original state to the array of note objects
  fetchNotes() {
    const notesURL = "http://localhost:3000/api/v1/notes";
    fetch(notesURL)
      .then(resp => resp.json())
      .then(notes => this.setState({ notes }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchNotes();
  }


  // method to select one note so that it can display an individual note in the content component
  selectedNote = (id) => {
    // console.log("noteContainer", id)
    let clickedNote = this.state.notes.find(note => note.id === id) 
      this.setState({
        selectedNote: clickedNote
      })
      // console.log(clickedNote)
  }

  handleEditClick = () => {
    this.setState({
      edit: true
    })
  }

  // passing props to the Sidebar & Content components
  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar 
          notes={this.state.notes} 
          selectedNote={this.selectedNote} />
          <Content 
          selectedNote={this.state.selectedNote}
          handleEditClick={this.state.handleEditClick}
          edit={this.state.edit}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
