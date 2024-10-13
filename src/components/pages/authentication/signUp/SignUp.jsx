import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const SignUp = () => {

    const [check, setCheck] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const [loading, setLoading] = useState(true);

    const Navigate = useNavigate();

    const registerAdmin = async (e) => {
        setLoading(false);
        e.preventDefault();
        const requestData = {
            name: name,
            email: email,
            password: password
        }
        console.log('requestData', requestData);
        try {
            await axios.post('https://quiz-backend-k4e4.onrender.com/signup', requestData).then((response) => {
                console.log('response', response.data);
                if (response.data.resMessage != 'exists' && response.data.resCode == 200) {

                    toast.success(`welcome! ${name}`, {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                    localStorage.setItem('adminID', response.data.adminId);
                    Navigate('/createnewquiz');
                } else if (response.data.resMessage == 'exists') {
                    toast.error('Admin already exists!', {
                        duration: 5000,
                        position: 'top-right',
                        style: {
                            fontSize: '0.8rem',
                            fontFamily: 'Poppins, sans-serif',
                        }
                    });
                } else {
                    toast.error('something going wrong', {
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

            setCheck(false);
            setName('');
            setEmail('');
            setPasswod('');
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
                                        <p class="font-medium text-lg">Sign Up to Join the Quiz Quest</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div class="lg:col-span-2">
                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div class="md:col-span-5">
                                                <label for="full_name">Full Name</label>
                                                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => { setName(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="email">Email Address</label>
                                                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" onChange={(e) => { setEmail(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Password</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Password(8 or more characters)" onChange={(e) => { setPasswod(e.target.value) }} />
                                            </div>

                                            <div class="md:col-span-6 mt-4">
                                                <div class="inline-flex items-center">
                                                    <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" onChange={(e) => { setCheck(e.target.checked) }} />
                                                    <label for="billing_same" class="ml-2">Yes, I understand and agree to the Terms of Service , including the User Agreement and Privacy Policy .</label>
                                                </div>
                                            </div>

                                            <div class="md:col-span-5 text-right">
                                                <div class="inline-flex items-end">
                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" disabled={!check} onClick={registerAdmin}>Create my account</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <p class="mt-8">Already have an account? <span onClick={() => { Navigate('/signin') }} class="text-blue-500 hover:text-blue-700 font-semibold hover:cursor-pointer">Log In</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SignUp;