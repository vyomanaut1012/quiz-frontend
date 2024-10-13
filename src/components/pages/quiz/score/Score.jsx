import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = () => {

    const score = localStorage.getItem('score');
    const totalQuestions = localStorage.getItem('totalQuestions');

    const Navigate = useNavigate();

    return (
        <>
            <div class="min-h-screen p-4 bg-gray-100 flex items-center justify-center font-inter">
                <div class="container max-w-screen-md mx-auto">
                    <div>
                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2 items-center">
                                <div class="text-gray-600 text-center">
                                    <p class="font-medium text-lg">Quiz completed</p>
                                    <p>You scored...</p>
                                </div>

                                <div class=" text-center">
                                    <div class="grid gap-4 gap-y-2 text-sm">
                                        <p class=" text-8xl font-bold">{score}</p>
                                        <p class=" text-lg  text-gray-500">out of {totalQuestions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="inline-flex items-end">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => { Navigate('/playquiz') }}>Play Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Score;