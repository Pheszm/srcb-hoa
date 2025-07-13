import { useState, useEffect } from 'react';

export default function MultipleResponseForm({
    question,
    answers,
    correctAnswer,
    totalScore,
    onScoreChange,
    showFeedback = false,
    timeLimit,
    onTimeUp
}) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [timeExpired, setTimeExpired] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0 || isSubmitted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeExpired(true);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, onTimeUp]);

    useEffect(() => {
        if (timeExpired && !isSubmitted) {
            if (selectedAnswers.length === 0) {
                setIsSubmitted(true);
            } else {
                handleSubmit();
            }
        }
    }, [timeExpired, selectedAnswers, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerToggle = (answer) => {
        if (isSubmitted) return;

        const isSelected = selectedAnswers.includes(answer);

        if (isSelected) {
            setSelectedAnswers(prev => prev.filter(a => a !== answer));
        } else {
            if (selectedAnswers.length < correctAnswer.length) {
                setSelectedAnswers(prev => [...prev, answer]);
            }
        }
    };

    const handleSubmit = () => {
        const correctSet = new Set(correctAnswer);
        const selectedSet = new Set(selectedAnswers);

        let correctCount = 0;
        selectedSet.forEach(answer => {
            if (correctSet.has(answer)) {
                correctCount += 1;
            }
        });

        const perAnswerScore = totalScore / correctSet.size;
        const score = parseFloat((correctCount * perAnswerScore).toFixed(2));

        setIsSubmitted(true);
        onScoreChange(score);
    };

    return (
        <div className="bg-white max-w-4xl mx-4 sm:mx-auto my-8 p-4 sm:p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-bold">
                    {question}
                </h2>
                <div className={`ml-2 px-3 py-1 rounded-full font-medium ${
                    timeLeft < (timeLimit/2) ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    Time: {formatTime(timeLeft)}
                </div>
            </div>

            <div className="mb-2">
                <span className="font-medium">Total Score: </span>
                {totalScore} points
            </div>

            <div className="mb-6 space-y-2">
                {answers.map((answer, index) => {
                    const isSelected = selectedAnswers.includes(answer);
                    const maxReached = selectedAnswers.length >= correctAnswer.length && !isSelected;

                    return (
                        <div
                            key={index}
                            onClick={() => handleAnswerToggle(answer)}
                            className={`p-3 border border-gray-300 rounded-md transition-colors ${
                                isSubmitted ? 'cursor-default' : maxReached ? 'cursor-not-allowed' : 'cursor-pointer'
                            } ${
                                isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-50'
                            } ${
                                isSubmitted && showFeedback && correctAnswer.includes(answer) ? 'border-green-500 bg-green-50' : ''
                            } ${
                                isSubmitted && showFeedback && isSelected && !correctAnswer.includes(answer) ? 'border-red-500 bg-red-50' : ''
                            }`}
                        >
                            {answer}
                            {isSubmitted && showFeedback && correctAnswer.includes(answer) && (
                                <span className="ml-2 text-green-600">✓ Correct</span>
                            )}
                            {isSubmitted && showFeedback && isSelected && !correctAnswer.includes(answer) && (
                                <span className="ml-2 text-red-600">✗ Incorrect</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {!isSubmitted ? (
                <div className="flex justify-between">
                    <p />
                    <button
                        onClick={handleSubmit}
                        disabled={selectedAnswers.length !== correctAnswer.length}
                        className={`${
                            selectedAnswers.length !== correctAnswer.length ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-900'
                        } text-white px-4 py-2 rounded-md font-semibold mb-4 transition-colors`}
                    >
                        Submit Answers
                    </button>
                </div>
            ) : (
                <div className="text-green-600 font-bold">
                    {timeExpired && selectedAnswers.length === 0 ? 'Time expired (no answer selected)' : 'Answers submitted!'}
                    {showFeedback && isSubmitted && (
                        <div className="mt-2 text-gray-800">
                            Your score: {selectedAnswers.filter(ans => correctAnswer.includes(ans)).length * (totalScore / correctAnswer.length)}/{totalScore}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
