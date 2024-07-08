import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
  
    useEffect(() => {
      const fetchQuizData = async () => {
        try {
          const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy');
          const formattedQuestions = response.data.results.map((question) => {
            const incorrectAnswers = question.incorrect_answers.map((answer) => ({
              text: answer,
              isCorrect: false
            }));
            const correctAnswer = {
              text: question.correct_answer,
              isCorrect: true
            };
            const shuffledAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
            return {
              question: question.question,
              answers: shuffledAnswers
            };
          });
          setQuestions(formattedQuestions);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
  
      fetchQuizData();
    }, []);
  
    const handleAnswerClick = (isCorrect) => {
      setUserAnswers([...userAnswers, isCorrect]);
      if (isCorrect) {
        setScore(score + 1);
      }
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    };
  
 
    if (questions.length === 0) {
      return(
        <>
        <Navbar/>
        <div className="quiz-main">
          <Sidebar/>
          <div className="quiz-container">            
          <div className='quiz-loading'>Random Quiz is Generating...</div>;
          </div>
        </div>
        </>
      )
    }
  
    if (quizCompleted) {
      return (
        <>
        <Navbar/>
        <div className="quiz-main">
            <Sidebar/>
            <div className="quiz-container">
            <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
           <p className="score">Your score: {score}/{questions.length}</p>
           <h4>Come back for another quiz!</h4>
           <Link to={"/"} style={{color: "white", textAlign: "center"}}>
           <h3>Go back to Home</h3>
           </Link>
        </div>
            </div>
        </div>
        </>
      );
    }
  
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
        <>
        <Navbar/>
        <div className="quiz-main">
            <Sidebar/>

      <div className="quiz-container">
        <h2>Quiz is Fun!</h2>
        <div className="question">
          <h3>{currentQuestion.question}</h3>
          <ul className="answers">
            {currentQuestion.answers.map((answer, index) => (
                <li key={index} onClick={() => handleAnswerClick(answer.isCorrect)}>
                {answer.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
            </div>
            </>
    );
  };
  
  export default Quiz;
  
