import { useState, useEffect, useCallback } from 'react';
import EssayForm from "@/components/ExamForms/EssayForm";
import MultipleChoiceForm from "@/components/ExamForms/MultipleChoiceForm";
import TrueOrFalseForm from "@/components/ExamForms/TrueOrFalseForm";
import IdentificationForm from "@/components/ExamForms/IdentificationForm";
import MultipleResponseForm from "@/components/ExamForms/MultipleResponseForm";
import ItemAnalysis from "@/components/ItemAnalysisForm";

export default function ExamRandomizer() {
    const [allItems] = useState([
        {
            "Type": "Essay",
            "Question": "Tell me about yourself.",
            "Answer": "",
            "TotalScore": 5,
            "MyScore": 0,
            "IsAnswered": false,
            "Duration": 30, 
            "id": "1"
        },
        {
            "Type": "MultipleChoice",
            "Question": "What color is the sky?",
            "Answer": ["Blue", "Green", "Violet", "Yellow"],
            "CorrectAnswer": "Blue",
            "TotalScore": 2,
            "MyScore": 0,
            "IsAnswered": false,
            "Duration": 10, 
            "id": "2"
        },
        {
            "Type": "TrueOrFalse",
            "Question": "Does the wheel of the car rotates?",
            "CorrectAnswer": "True",
            "TotalScore": 1,
            "MyScore": 0,
            "IsAnswered": false,
            "Duration": 10, 
            "id": "3"
        },
        {
            "Type": "Identification",
            "Question": "What is the common color of Apple?",
            "CorrectAnswer": "red",
            "TotalScore": 1,
            "MyScore": 0,
            "IsAnswered": false,
            "Duration": 10, 
            "id": "4"
        },
        {
            "Type": "MultipleResponse",
            "Question": "Which of the given are Animals?",
            "Answer": ["Tiger", "Cat", "Chair", "Dog"],
            "CorrectAnswer": ["Tiger", "Cat", "Dog"],
            "TotalScore": 5,
            "MyScore": 0,
            "IsAnswered": false,
            "Duration": 10, 
            "id": "5"
        }
    ]);

    const [remainingItems, setRemainingItems] = useState([...allItems]);
    const [currentItem, setCurrentItem] = useState(null);
    const [completedItems, setCompletedItems] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [examCompleted, setExamCompleted] = useState(false);

    const selectRandomItem = useCallback(() => {
        if (remainingItems.length === 0) {
            setExamCompleted(true);
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * remainingItems.length);
        const newCurrentItem = remainingItems[randomIndex];
        
        setRemainingItems(prev => prev.filter(item => item.id !== newCurrentItem.id));
        
        return newCurrentItem;
    }, [remainingItems]);

    useEffect(() => {
        if (!currentItem && !examCompleted) {
            const newItem = selectRandomItem();
            if (newItem) {
                setCurrentItem(newItem);
            }
        }
    }, [currentItem, examCompleted, selectRandomItem]);

    const handleScoreChange = useCallback((score) => {
        if (!currentItem) return;

        const updatedItem = {
            ...currentItem,
            MyScore: score,
            IsAnswered: true
        };

        const newCompletedItems = [...completedItems, updatedItem];
        const newTotalScore = totalScore + score;
        const newRemainingItems = remainingItems.filter(item => item.id !== currentItem.id);

        setCompletedItems(newCompletedItems);
        setTotalScore(newTotalScore);
        setRemainingItems(newRemainingItems);

        if (newCompletedItems.length >= allItems.length) {
            setExamCompleted(true);
            setCurrentItem(null);
        } else {
            const nextItem = selectRandomItem();
            setCurrentItem(nextItem);
        }
    }, [currentItem, completedItems, totalScore, remainingItems, allItems.length, selectRandomItem]);

    const restartExam = () => {
        setRemainingItems([...allItems]);
        setCompletedItems([]);
        setTotalScore(0);
        setExamCompleted(false);
        setCurrentItem(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            {!examCompleted && currentItem && (
                <div key={currentItem.id}>
                    {currentItem.Type === "Essay" ? (
                        <EssayForm
                            question={currentItem.Question}
                            totalScore={currentItem.TotalScore}
                            onScoreChange={handleScoreChange}
                            showFeedback={false}
                            timeLimit={currentItem.Duration}
                            onTimeUp={() => handleScoreChange(0)}
                        />
                    ) : currentItem.Type === "MultipleChoice" ? (
                        <MultipleChoiceForm
                            question={currentItem.Question}
                            answers={currentItem.Answer}
                            correctAnswer={currentItem.CorrectAnswer}
                            totalScore={currentItem.TotalScore}
                            onScoreChange={handleScoreChange}
                            showFeedback={false}
                            timeLimit={currentItem.Duration}
                            onTimeUp={() => handleScoreChange(0)}
                        />
                    ) : currentItem.Type === "TrueOrFalse" ? (
                        <TrueOrFalseForm
                            question={currentItem.Question}
                            correctAnswer={currentItem.CorrectAnswer}
                            totalScore={currentItem.TotalScore}
                            onScoreChange={handleScoreChange}
                            showFeedback={false}
                            timeLimit={currentItem.Duration}
                            onTimeUp={() => handleScoreChange(0)}
                        />
                    ) :
                    currentItem.Type === "Identification" ? (
                            <IdentificationForm
                            question={currentItem.Question}
                            correctAnswer={currentItem.CorrectAnswer}
                            totalScore={currentItem.TotalScore}
                            onScoreChange={handleScoreChange}
                            showFeedback={false}
                            timeLimit={currentItem.Duration}
                            onTimeUp={() => handleScoreChange(0)}
                        />
                    ) : 
                    currentItem.Type === "MultipleResponse" ? (
                        <MultipleResponseForm
                        question={currentItem.Question}
                        answers={currentItem.Answer}
                        correctAnswer={currentItem.CorrectAnswer}
                        totalScore={currentItem.TotalScore}
                        onScoreChange={handleScoreChange}
                        showFeedback={false}
                        timeLimit={currentItem.Duration}
                        onTimeUp={() => handleScoreChange(0)}
                    />
                    ) : null}

                </div>
            )}

            {examCompleted && (
                <div className="bg-white text-center mt-8 p-8 border border-gray-200 rounded-lg">
                    <h2 className="text-xl mb-4">Assessment Completed!</h2>
                    <div className="text-3xl font-bold text-blue-800 mb-8">
                        Total Score: {totalScore} / {allItems.reduce((sum, item) => sum + item.TotalScore, 0)}
                    </div>
                    <button
                        onClick={restartExam}
                        className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition-colors"
                    >
                        FINISH
                    </button>
                </div>
            )}

            <div className="bg-white text-center mt-2 p-6 border border-gray-200 rounded-lg">
                <div className="font-semibold mb-2">
                    Progress: {completedItems.length}/{allItems.length} questions answered
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-800 transition-all duration-300"
                        style={{ width: `${(completedItems.length / allItems.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* TYPE TRUE TO SHOW ITEM ANALYSIS */}{false && (
                <ItemAnalysis AllItems={allItems} completedItems={completedItems} />
            )}
        </div>
    );
}