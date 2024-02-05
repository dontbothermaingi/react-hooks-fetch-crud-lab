import React, { useState , useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((questions) => setQuestions(questions))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  // Function to add a new question to the state
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  function handleChangeQuestionDelete(id){
    setQuestions(questions.filter((question)=>question.id !== id))
  }

  function handleAnswerUpdate(id,newCorrectIndex){
    setQuestions(questions.map((question)=>{
      if( question.id !== id){
        return {...question,correcIndex:newCorrectIndex}
      }
      return question;
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions}  onDelete={handleChangeQuestionDelete} 
        onUpdate={handleAnswerUpdate} />}
      
    
    </main>
  );
}

export default App;