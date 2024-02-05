import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    // Send DELETE request to server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          // Remove the question from the state
          onDelete(id);
        } else {
          throw new Error("Failed to delete question");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdate = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    // Send PATCH request to server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
      .then((response) => {
        if (response.ok) {
          // Update the question in the state
          onUpdate(id, newCorrectIndex);
        } else {
          throw new Error("Failed to update question");
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <h5>Answers:  {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}</h5>
        <p>Correct Answer: {answers[question.correctIndex]}</p>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;