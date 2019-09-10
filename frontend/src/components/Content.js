import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  


// props passed from NoteContainer 

  renderContent = () => {
    if (this.props.editingNote === true) {
      return <NoteEditor 
      selectedNote={this.props.selectedNote}
      handleCancelEdit={this.props.handleCancelEdit}
      handleEditSubmit={this.props.handleEditSubmit}
      />;
    } else if (this.props.selectedNote.id) {
      return <NoteViewer 
      selectedNote={this.props.selectedNote}
      handleEditClick={this.props.handleEditClick}
      handleDelete={this.props.handleDelete}
      />;
    } else {
      return <Instructions />;
    }
  }
  
  render() {
    // console.log(this.props)
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
