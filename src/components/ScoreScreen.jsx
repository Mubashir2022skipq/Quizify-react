

export const ScoreScreen = ({ score, quizQuestions, handlePlayAgain }) => {
  // display the message according to your score
  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Great job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  return (
    <div className="score-screen">
      <h1 className="score-title">Quiz Completed!</h1>
      <div className="score-circle">
        <span className="score-number">{score}</span>
        <span className="score-total">/{quizQuestions.length}</span>
      </div>
      <p className="score-message">{getScoreMessage()}</p>
      <p className="score-percentage">
        {Math.round((score / quizQuestions.length) * 100)}% Correct
      </p>
      <button className="play-again-btn" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};
