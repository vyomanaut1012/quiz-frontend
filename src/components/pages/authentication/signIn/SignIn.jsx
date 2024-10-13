import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const [loading, setLoading] = useState(true);

    const Navigate = useNavigate();

    const signinAdmin = async () => {
        setLoading(false);
        const requestData = {
            email: email,
            password: password
        }
        console.log('requestData', requestData);

        try {
            await axios.post('https://quiz-backend-k4e4.onrender.com/signin', requestData).then((response) => {
                console.log('response', response.data);
                if (response.data.resCode == 200) {

                    toast.success(`welcomeback! ${response.data.name}`, {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                    localStorage.setItem('adminID', response.data.adminId);
                    Navigate('/createnewquiz');
                } else if (response.data.resCode == 404) {
                    toast.error('email is not register', {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                } else if (response.data.resCode == 401) {
                    toast.error('wrong password', {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
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
                    <div class="container max-w-screen-lg mx-auto">
                        <div>
                            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div class="text-gray-600">
                                        <p class="font-medium text-lg">Sign in to your account</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div class="lg:col-span-2">
                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                            <div class="md:col-span-4">
                                                <label for="email">Email Address</label>
                                                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" onChange={(e) => { setEmail(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-4">
                                                <label for="address">Password</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Password(8 or more characters)" onChange={(e) => { setPasswod(e.target.value) }} />
                                            </div>


                                            <div class="md:col-span-5 text-right mt-4">
                                                <div class="inline-flex items-end">
                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={() => { signinAdmin() }}>SignIn</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <p class="mt-8">Need an account? <span class="text-blue-500 hover:text-blue-700 font-semibold hover:cursor-pointer " onClick={() => { Navigate('/signup') }}>Create an account</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SignIn;