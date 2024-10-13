import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';



const PlayQuiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [loading, setLoading] = useState(true);


    const quizId = localStorage.getItem('quizID');
    const Navigate = useNavigate();

    const fetchQuizData = async () => {

        setLoading(false);
        const requestData = { quizId };

        try {
            const response = await axios.post('https://quiz-backend-k4e4.onrender.com/fetchquizdata', requestData);
            if (response.data.resCode === 200) {
                setQuizData(response.data.quizData.quizData);
            } else {
                toast.error('Something went wrong fetching quiz data', {
                    duration: 5000,
                    position: 'top-right',
                    style: {
                        fontSize: '0.8rem',
                        fontFamily: 'Poppins, sans-serif',
                    },
                });
            }
            setLoading(true);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            toast.error('Error fetching quiz data', {
                duration: 5000,
                position: 'top-right',
                style: {
                    fontSize: '0.8rem',
                    fontFamily: 'Poppins, sans-serif',
                },
            });
            setLoading(true);
        }
    };

    const handleOptionChange = (questionId, selectedOption) => {
        const updatedOptions = [...selectedOptions];
        const existingOption = updatedOptions.find((item) => item.questionId === questionId);

        if (existingOption) {
            existingOption.selectedOption = selectedOption;
        } else {
            updatedOptions.push({ questionId, selectedOption });
        }
        setSelectedOptions(updatedOptions);
    };

    const submitQuiz = async () => {

        setLoading(false);

        const requestData = {
            quizId: quizId,
            submissionData: selectedOptions
        }
        console.log('requestData', requestData);

        try {
            const response = await axios.post('https://quiz-backend-k4e4.onrender.com/submission', requestData);
            if (response.data.resCode === 200) {
                localStorage.setItem('score', response.data.score);
                localStorage.setItem('totalQuestions', response.data.totalQuestions);
                Navigate('/score');
            } else {
                toast.error('Something went wrong fetching quiz data', {
                    duration: 5000,
                    position: 'top-right',
                    style: {
                        fontSize: '0.8rem',
                        fontFamily: 'Poppins, sans-serif',
                    },
                });
            }
            setLoading(true);
        } catch (error) {
            console.error('Error during submitting quiz', error);
            toast.error('Error during submitting quiz', {
                duration: 5000,
                position: 'top-right',
                style: {
                    fontSize: '0.8rem',
                    fontFamily: 'Poppins, sans-serif',
                },
            });
            setLoading(true);
        }

    };

    useEffect(() => {
        fetchQuizData();
    }, []);

    return (
        <>
            <Toaster />
            {!loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <TailSpin
                    height="4rem"
                    width="4rem"
                    color="blue"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div> :
                <div className="min-h-screen p-4 bg-gray-100 flex items-center justify-center font-poppins">
                    <div className="container max-w-screen-xl mx-auto">
                        <div>
                            <div className="text-gray-600">
                                <p className="font-medium text-lg text-center font-inter">
                                    Let the Quiz Begin: Are You Up for the Challenge?
                                </p>
                            </div>

                            <div className="grid gap-12 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 mt-8">
                                <div className="">
                                    <div className="bg-white rounded shadow-lg p-2  md:p-4 mb-6 overflow-y-scroll no-scrollbar">
                                        <div className="mt-4">
                                            {quizData.length > 0 &&
                                                quizData.map((item, index) => (
                                                    <div
                                                        key={item.questionId}
                                                        className="bg-white rounded shadow-sm p-4 px-4 md:p-4 mb-6"
                                                    >
                                                        <p>
                                                            <span className="text-red-500">
                                                                Question {index + 1}:
                                                            </span>{' '}
                                                            {item.question}
                                                        </p>

                                                        <div className="mt-4 space-y-3">
                                                            {[item.option1, item.option2, item.option3, item.option4].map(
                                                                (option, optIndex) => (
                                                                    <div className="flex flex-row" key={optIndex}>
                                                                        <input
                                                                            type="radio"
                                                                            id={`option-${optIndex}-${index}`}
                                                                            name={`question-${index}`}
                                                                            value={option}
                                                                            className="mr-2"
                                                                            checked={
                                                                                selectedOptions.find(
                                                                                    (opt) =>
                                                                                        opt.questionId === item.questionId
                                                                                )?.selectedOption === option
                                                                            }
                                                                            onChange={() =>
                                                                                handleOptionChange(item.questionId, option)
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor={`option-${optIndex}-${index}`}
                                                                            className="text-gray-700"
                                                                        >
                                                                            {option}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-3 text-right mt-8">
                                        <div className="inline-flex items-end">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                                onClick={submitQuiz}
                                            >
                                                Submit Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PlayQuiz;
