import { useState, useEffect } from 'react';

export default function TrueOrFalseForm({
    question,
    correctAnswer,
    totalScore,
    onScoreChange,
    showFeedback = false,
    timeLimit,
    onTimeUp
}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [timeExpired, setTimeExpired] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0 || isSubmitted) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setTimeExpired(true);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, onTimeUp]);

    // Handle time expiration
    useEffect(() => {
        if (timeExpired && !isSubmitted) {
            if (selectedAnswer === null) {
                // Don't submit if no answer is selected
                setIsSubmitted(true); // Just mark as submitted without calling onScoreChange
            } else {
                // If there's a selected answer, submit it
                handleSubmit();
            }
        }
    }, [timeExpired, selectedAnswer, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = () => {
        const score = selectedAnswer === correctAnswer ? totalScore : 0;
        setIsSubmitted(true);
        onScoreChange(score);
    };

    const handleAnswerSelect = (answer) => {
        if (!isSubmitted) {
            setSelectedAnswer(answer);
        }
    };

    return (
        <div className="bg-white max-w-4xl mx-4 sm:mx-auto my-8 p-4 sm:p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-bold">{question}</h2>
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
                {['True', 'False'].map((answer, index) => (
                    <div
                        key={index}
                        className={`p-3 border border-gray-300 rounded-md ${
                            selectedAnswer === answer ? 'bg-blue-100' : 'bg-transparent'
                        } ${
                            !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                        } transition-colors ${
                            isSubmitted && showFeedback && answer === correctAnswer ? 'border-green-500 bg-green-50' : ''
                        } ${
                            isSubmitted && showFeedback && selectedAnswer === answer && answer !== correctAnswer ? 'border-red-500 bg-red-50' : ''
                        }`}
                        onClick={() => !isSubmitted && handleAnswerSelect(answer)}
                    >
                        {answer}
                        {isSubmitted && showFeedback && answer === correctAnswer && (
                            <span className="ml-2 text-green-600">✓ Correct answer</span>
                        )}
                        {isSubmitted && showFeedback && selectedAnswer === answer && answer !== correctAnswer && (
                            <span className="ml-2 text-red-600">✗ Your answer</span>
                        )}
                    </div>
                ))}
            </div>
    
            {!isSubmitted ? (
                <div className="flex justify-between">
                    <p />
                    <button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className={`${
                            selectedAnswer === null ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-900'
                        } text-white px-4 py-2 rounded-md font-semibold mb-4 transition-colors`}
                    >
                        Submit Answer
                    </button>
                </div>
            ) : (
                <div className="text-green-600 font-bold">
                    {timeExpired && selectedAnswer === null ? 'Time expired (no answer selected)' : 'Answer submitted!'}
                    {showFeedback && isSubmitted && (
                        <div className="mt-2 text-gray-800">
                            Your score: {selectedAnswer === correctAnswer ? totalScore : 0}/{totalScore}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
