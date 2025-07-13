import React, { useEffect, useState } from "react";

const ItemAnalysis = ({ AllItems, completedItems }) => {
    const [itemAnalysis, setItemAnalysis] = useState([]);

    // Function to calculate item analysis (Difficulty, Discrimination)
    const calculateItemAnalysis = () => {
        const analysisResults = AllItems.map(item => {
            const completedItem = completedItems.find(i => i.id === item.id);
            const correct = completedItem ? completedItem.MyScore > 0 : false;
            
            // Calculate Difficulty: (correctAnswers / totalAnswers) * 100
            const difficulty = correct ? 1 : 0;

            // Simple Discrimination Logic: If difficulty > 50%, we consider it 'Good'
            const discrimination = difficulty > 0.5 ? "Good" : "Poor";

            return {
                id: item.id,
                question: item.Question,
                difficulty,
                discrimination,
                incorrectAnswers: completedItem && !correct ? 1 : 0
            };
        });

        setItemAnalysis(analysisResults);
    };

    useEffect(() => {
        if (completedItems.length > 0) {
            calculateItemAnalysis();
        }
    }, [completedItems]);

    return (
        <div className="bg-white text-center mt-8 p-8 border border-gray-200 rounded-lg">
            <h2 className="text-xl mb-4">Item Analysis</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Question</th>
                            <th className="border px-4 py-2">Difficulty (%)</th>
                            <th className="border px-4 py-2">Discrimination</th>
                            <th className="border px-4 py-2">Incorrect Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemAnalysis.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.question}</td>
                                <td className="border px-4 py-2">
                                    {(item.difficulty * 100).toFixed(2)}%
                                </td>
                                <td className="border px-4 py-2">{item.discrimination}</td>
                                <td className="border px-4 py-2">{item.incorrectAnswers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemAnalysis;
