import React, { Component } from 'react';

class NoteEditor extends Component {
  state = {
    body: this.props.selectedNote.body, 
    title: this.props.selectedNote.title
  }

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



// make a function "handleSubmit" in this componene tto prrevent.defualt and also take in the state of the form elements and pass to the handleSave 


// in note container - send a patch request/fetch pass as props to the noteEditor 
// in noteEditor - handleSubmit-> preventDefault(), call props function & pass the state to it 