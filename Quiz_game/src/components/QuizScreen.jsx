
import  { useState } from 'react';

export const QuizScreen = ({ 
  quizQuestions, 
  score, 
  setScore, 
  setGameState 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

 
  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
   
    if (answer === quizQuestions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };


  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
    
      setGameState('score');
    }
  };

 
  const getButtonClass = (option) => {
    if (!isAnswered) return "option-btn";
    
    if (option === quizQuestions[currentQuestion].correct_answer) {
      return "option-btn correct";
    }
    
    if (option === selectedAnswer && option !== quizQuestions[currentQuestion].correct_answer) {
      return "option-btn incorrect";
    }
    
    return "option-btn disabled";
  };

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <div className="question-counter">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
        <div className="score-counter">
          Score: {score}
        </div>
      </div>
      
      <div className="question-card">
        <h2 className="question-category">
          {quizQuestions[currentQuestion].category}
        </h2>
        <h3 className="question-text">
          {quizQuestions[currentQuestion].question}
        </h3>
        
        <div className="options-container">
          {quizQuestions[currentQuestion].allOptions.map((option, index) => (
            <button
              key={index}
              className={getButtonClass(option)}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered && option !== selectedAnswer && option !== quizQuestions[currentQuestion].correct_answer}
            >
              {option}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <button className="next-btn" onClick={handleNextQuestion}>
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
};
