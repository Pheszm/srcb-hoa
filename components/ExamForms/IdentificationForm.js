import { useState, useEffect } from 'react';

export default function IdentificationForm({
    question,
    correctAnswer,
    totalScore,
    onScoreChange,
    showFeedback = false,
    timeLimit,
    onTimeUp
}) {
    const [userAnswer, setUserAnswer] = useState('');
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
            if (userAnswer === '') {
                // Don't submit if no answer is entered
                setIsSubmitted(true); // Just mark as submitted without calling onScoreChange
            } else {
                // If there's a user answer, submit it
                handleSubmit();
            }
        }
    }, [timeExpired, userAnswer, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = () => {
        const score = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase() ? totalScore : 0;
        setIsSubmitted(true);
        onScoreChange(score);
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

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Your Answer"
                    value={userAnswer}
                    onChange={(e) => !isSubmitted && setUserAnswer(e.target.value)}
                    disabled={isSubmitted}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            {!isSubmitted ? (
                <div className="flex justify-between">
                    <p />
                    <button
                        onClick={handleSubmit}
                        disabled={userAnswer.trim() === ''}
                        className={`${
                            userAnswer.trim() === '' ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-900'
                        } text-white px-4 py-2 rounded-md font-semibold mb-4 transition-colors`}
                    >
                        Submit Answer
                    </button>
                </div>
            ) : (
                <div className="text-green-600 font-bold">
                    {timeExpired && userAnswer === '' ? 'Time expired (no answer entered)' : 'Answer submitted!'}
                    {showFeedback && isSubmitted && (
                        <div className="mt-2 text-gray-800">
                            Your score: {userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase() ? totalScore : 0}/{totalScore}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
