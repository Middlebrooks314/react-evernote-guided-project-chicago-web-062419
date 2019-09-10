import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  // props have been passed from the NoteContainer
  render() {
    // console.log('in Sidebar', this.props)
    return (
      <div className="master-detail-element sidebar">
        <NoteList 
        notes={this.props.notes} 
        selectedNote={this.props.selectedNote} />
        <button onClick={this.props.brandNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
