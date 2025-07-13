import { useState, useEffect } from 'react';

export default function EssayForm({ 
  question, 
  totalScore, 
  onScoreChange, 
  showFeedback = false,
  timeLimit,
  onTimeUp 
}) {
  const [apiKey] = useState('AIzaSyB1EghHULsnLdtbp0F0ZPa5L04oELEfcbs'); // Replace with your key
  const [answer, setAnswer] = useState('');
  const [answerScore, setAnswerScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
      if (answer.trim() === '') {
        // Don't submit if answer is empty
        setIsSubmitted(true); // Just mark as submitted without calling onScoreChange
      } else {
        // If there's an answer, evaluate it
        evaluateEssay();
      }
    }
  }, [timeExpired, answer, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const evaluateEssay = async () => {
    if (isSubmitted) return;
    
    setIsLoading(true);
    setError('');
    setAnswerScore(null);
    setFeedback('');

    try {
      const prompt = `
      Evaluate this essay (worth ${totalScore} total points) based on:
      1. Accuracy (40%)
      2. Depth of Analysis (30%)
      3. Clarity (20%)
      4. Grammar (10%)

      QUESTION: ${question}
      ESSAY: ${answer}

      Calculate the score out of ${totalScore} points and provide feedback.
      Respond in this EXACT JSON format:
      {
        "answerScore": 0-${totalScore},
        "feedback": "Your detailed feedback here"
      }
      `;

      const result = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        }
      );

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.error?.message || `HTTP Error: ${result.status}`);
      }

      const data = await result.json();
      const responseText = data.candidates[0].content.parts[0].text;
      
      try {
        const evaluation = JSON.parse(responseText.replace(/```json|```/g, ''));
        setAnswerScore(evaluation.answerScore);
        setFeedback(evaluation.feedback);
        onScoreChange(evaluation.answerScore);
        setIsSubmitted(true);
      } catch {
        throw new Error('Failed to parse evaluation response');
      }
    } catch (err) {
      setError(err.message);
      console.error('Evaluation Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto my-8 p-4 sm:p-6 border border-gray-200 rounded-lg">
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
  
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Your Answer:
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isSubmitted}
          className={`w-full min-h-[10rem] p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 ${
            isSubmitted ? 'bg-gray-50' : 'bg-white'
          }`}
        />
      </div>
  
      {!isSubmitted ? (
        <div className="flex justify-between">
          <p/>
          <button
            onClick={evaluateEssay}
            disabled={isLoading || !answer.trim()}
            className={`${
              isLoading || !answer.trim() ? 'bg-gray-400' : 'bg-blue-800'
            } text-white px-4 py-2 rounded-md font-semibold mb-4 hover:bg-blue-900 transition-opacity`}
          >
            {isLoading ? 'Evaluating...' : 'Submit Essay'}
          </button>
        </div>
      ) : (
        <div className="text-green-600 font-bold mb-4">
          {timeExpired && answer.trim() === '' ? 'Time expired (empty answer not submitted)' : 'Essay submitted!'}
        </div>
      )}
  
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
  
      {showFeedback && answerScore !== null && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className={`text-xl sm:text-2xl font-bold ${
              answerScore >= totalScore * 0.8 ? 'text-green-600' : 
              answerScore >= totalScore * 0.5 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              Score: {answerScore}/{totalScore}
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" style={{
              background: `conic-gradient(
                ${answerScore >= totalScore * 0.8 ? '#38a169' : 
                 answerScore >= totalScore * 0.5 ? '#d69e2e' : '#e53e3e'} ${(answerScore/totalScore) * 360}deg, 
                #e2e8f0 0deg
              )`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div className="w-[70%] h-[70%] rounded-full bg-white flex items-center justify-center font-bold">
                {Math.round((answerScore/totalScore)*100)}%
              </div>
            </div>
          </div>
  
          <div>
            <strong className="block mb-2">Feedback:</strong>
            <div className="whitespace-pre-wrap">{feedback}</div>
          </div>
        </div>
      )}
    </div>
  );
}