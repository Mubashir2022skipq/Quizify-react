
import  { useState } from 'react';
import './App.css';
import { quizData } from './data/quizData';
import {HomeScreen} from './components/HomeScreen.jsx';
import {QuizScreen} from './components/QuizScreen.jsx';
import {ScoreScreen} from './components/ScoreScreen.jsx';

function App() {
  
  const [gameState, setGameState] = useState('home'); 
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);
  
  // Quiz settings
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 5,
    category: 'all',
    difficulty: 'all'
  });

  // Categories list will created
  const categories = ['all', ...new Set(quizData.map(q => q.category))];

  // Function for shuffling an array
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Start the Quiz (function)
  const startQuiz = () => {
    let filteredQuestions = [...quizData];
    
    // filter according to category
    if (quizSettings.category !== 'all') {
      filteredQuestions = filteredQuestions.filter(
        q => q.category === quizSettings.category
      );
    }
    
    // shufllig the questions
    const shuffled = shuffleArray(filteredQuestions);
    const selectedQuestions = shuffled.slice(0, quizSettings.numQuestions);
    
    // every option for shuffle  
    const questionsWithShuffledOptions = selectedQuestions.map(question => ({
      ...question,
      allOptions: shuffleArray([...question.options, question.correct_answer])
    }));
    
    setQuizQuestions(questionsWithShuffledOptions);
    setGameState('quiz');
    setScore(0);
  };

  // Play again Button is here
  const handlePlayAgain = () => {
    setGameState('home');
    setScore(0);
  };

  return (
    <div className="app">
      <div className="quiz-container">
        {/* Home Screen */}
        {gameState === 'home' && (
          <HomeScreen 
            quizSettings={quizSettings}
            setQuizSettings={setQuizSettings}
            startQuiz={startQuiz}
            categories={categories}
          />
        )}

        {/* Quiz Screen */}
        {gameState === 'quiz' && quizQuestions.length > 0 && (
          <QuizScreen 
            quizQuestions={quizQuestions}
            score={score}
            setScore={setScore}
            setGameState={setGameState}
          />
        )}

        {/* Score Screen */}
        {gameState === 'score' && (
          <ScoreScreen 
            score={score}
            quizQuestions={quizQuestions}
            handlePlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
}

export default App;