import React from 'react';

class Export extends React.Component {
  constructor(props) {
    super(props);
    this.exportData = this.exportData.bind(this);
    this.importData = this.importData.bind(this);
  }

  importData() {
    this.props.importData(JSON.parse(this.refs.textarea.value));
    this.props.saveData();
  }

  exportData() {
    this.refs.textarea.value = localStorage.getItem('questions');
  }

  render() {
    return(
      <div className="export">
        <textarea ref='textarea' className="export"></textarea>
        <ul className="export-buttons">
          <button onClick={this.exportData}>Export Current Data</button>
          <button onClick={this.importData}>Import Data</button>
        </ul>
      </div>
    )
  }
}

export default Export;
