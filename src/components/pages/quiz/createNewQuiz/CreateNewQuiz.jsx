import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const CreateNewQuiz = () => {

    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);


    const Navigate = useNavigate();

    const handleQuizData = () => {
        if (question != '' && option1 != '' && option2 != '' && option3 != '' && option4 != '' && correctOption != '') {

            const newQuizEntry = {
                questionId: uuidv4(),
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correctOption: correctOption
            };
            console.log('data', newQuizEntry);
            setQuizData(prevQuizData => [...prevQuizData, newQuizEntry]);

            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setCorrectOption('');

        }

    }

    const handleRemove = (questionId) => {
        const filterData = quizData.filter(item => item.questionId !== questionId);
        setQuizData(filterData);
    }

    const addQuiz = async () => {

        setLoading(false);
        const requestData = {
            quizData: quizData
        }
        console.log('data', quizData);
        try {
            console.log('data', quizData);
            await axios.post('https://quiz-backend-k4e4.onrender.com/createnewquiz', requestData).then((response) => {
                console.log('response', response.data);
                if (response.data.resCode == 200) {

                    toast.success(`quiz created successfully`, {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                    localStorage.setItem('quizID', response.data.quizId);
                    Navigate('/playquiz');
                } else {
                    toast.error('somthing going wrong', {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                }
                setLoading(true);
            });
        }
        catch (error) {
            console.error('something going wrong');
        }
    }

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
                <div class="min-h-screen p-4 bg-gray-100 flex items-center justify-center font-inter">
                    <div class="container max-w-screen-xl mx-auto">
                        <div>
                            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Create your Quiz</p>
                                    <p>Design Your Quiz Unleash Your Creativity!</p>
                                </div>

                                <div class="grid gap-12 gap-y-2 text-sm grid-cols-1 lg:grid-cols-12 mt-8">

                                    <div class="lg:col-span-4">
                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-1">

                                            <div class="md:col-span-3">
                                                <label for="question">Question</label>
                                                <input type="text" name="question" id="question" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={question} onChange={(e) => { setQuestion(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Option 1</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={option1} onChange={(e) => { setOption1(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Option 2</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={option2} onChange={(e) => { setOption2(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Option 3</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={option3} onChange={(e) => { setOption3(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Option 4</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={option4} onChange={(e) => { setOption4(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Select correct option</label>
                                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={correctOption} onChange={(e) => { setCorrectOption(e.target.value) }}>
                                                    <option value=""></option>
                                                    <option value={option1}>option 1</option>
                                                    <option value={option2}>option 2</option>
                                                    <option value={option3}>option 3</option>
                                                    <option value={option4}>option 4</option>
                                                </select>
                                            </div>

                                            <div class="md:col-span-3 text-right mt-4">
                                                <div class="inline-flex items-end">
                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => { handleQuizData() }} disabled={!(question != '' && option1 != '' && option2 != '' && option3 != '' && option4 != '' && correctOption != '')}>Add Question</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="lg:col-span-8">
                                        <p class="font-medium text-lg">Preview</p>
                                        <div class="bg-white rounded shadow-lg p-2  md:p-4 mb-6 h-[70vh] overflow-y-scroll no-scrollbar">

                                            {quizData.length != 0 && quizData.map((item, index) => {
                                                return (
                                                    <div class="bg-white rounded shadow-sm p-4 px-4 md:p-4 mb-6" key={index}>
                                                        <p class=" text-red-500 text-end hover:cursor-pointer" onClick={() => { handleRemove(item.questionId) }}>remove</p>
                                                        <p><span class=" text-red-500">Question {index + 1}</span>: {item.question}</p>
                                                        <p>option 1: <span class=" text-gray-700">{item.option1}</span></p>
                                                        <p>option 2: <span class=" text-gray-700">{item.option2}</span></p>
                                                        <p>option 3: <span class=" text-gray-700">{item.option3}</span></p>
                                                        <p>option 4: <span class=" text-gray-700">{item.option4}</span></p>
                                                        <p class=" mt-3"> <span class="text-green-400">correct option</span>: {item.correctOption}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div class="md:col-span-3 text-right mt-8">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => { addQuiz() }} disabled={!(quizData.length != 0)}>Create Quiz</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateNewQuiz;