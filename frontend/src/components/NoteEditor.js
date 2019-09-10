import React, { Component } from 'react';

class NoteEditor extends Component {
  state = {
    body: this.props.selectedNote.body, 
    title: this.props.selectedNote.title
  }

//  [event.target.name]: event.target.value will take in any of the fields that match any of the state objects and evaluate that as the key. 
  handleEditChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
     })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleEditSubmit(this.state, this.props.selectedNote.id)

  }

  render() {
    return (
      <form className="note-editor">
        <input 
          type="text" 
          name="title" 
          defaultValue={this.props.selectedNote.title} 
          onChange={this.handleEditChange}/>
        <textarea 
          name="body" 
          defaultValue={this.props.selectedNote.body} 
          onChange={this.handleEditChange}/>
        <div className="button-row">
          <input 
            className="button" 
            type="submit" 
            value="Save" 
            onClick={this.handleSubmit}
            />
          <button type="button" onClick={this.props.handleCancelEdit}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;



