import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <article className="question">
        Question
        <input className="question" placeholder=""></input>
        Question Type
        <select defaultValue="option-1" className="question-type">
          <option id="option-1" disabled>--Select Option--</option>
          <option>yaya</option>
          <option>yaya</option>
          <option>yaya</option>
        </select>
        <div className="question-buttons">
          <button>Add sub-input</button>
          <button>Delete</button>
        </div>
      </article>
    )
  }
}

export default Question;
