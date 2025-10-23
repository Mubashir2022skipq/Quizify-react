

export const HomeScreen = ({
    quizSettings,
    setQuizSettings,
    startQuiz,
    categories
}) => {
    return (
        <div className="home-screen">
            <h1 className="app-title">Quiz Game (app)</h1>
            <p className="app-subtitle">Test your knowledge with our fun quiz!</p>

            <div className="settings-panel">
                <div className="setting-group">
                    <label>Number of Questions:</label>
                    <select
                        value={quizSettings.numQuestions}
                        onChange={(e) => setQuizSettings({
                            ...quizSettings,
                            numQuestions: parseInt(e.target.value)
                        })}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>

                <div className="setting-group">
                    <label>Category:</label>
                    <select
                        value={quizSettings.category}
                        onChange={(e) => setQuizSettings({
                            ...quizSettings,
                            category: e.target.value
                        })}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button className="start-btn" onClick={startQuiz}>
                Start Quiz
            </button>
        </div>
    );
};

