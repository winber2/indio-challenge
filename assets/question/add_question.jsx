import React from 'react';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <button className="add-question">
        <div className="circle">+</div>
        <span>Add a question!</span>
      </button>
    )
  }
}

export default AddQuestion;
