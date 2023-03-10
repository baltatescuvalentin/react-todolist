import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const { signin } = useAuth();

    let navigator = useNavigate();

    function validInputs() {
        return username && password;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setErrorMsg('');
            await signin(username, password);
            navigator('/tasks');
        }
        catch(e) {
            setErrorMsg(e.message || 'Wrong password!');
        }
    }


    return (
        <div className="shadow-2xl border-2 rounded-lg border-red-300 py-5 sm:px-4 px-8 bg-gray-50 w-[500px] sm:w-[350px] mt-16 ml-auto mr-auto">
            <p className="text-4xl font-semibold mb-4 text-gray-700">Sign In!</p>
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="username">
                    Username 
                </label>
                <input type="text" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="username" 
                    required 
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />          
  
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="password">
                    Password
                </label>
                <input type="password" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="password" 
                    required 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <input type="submit" 
                    disabled={validInputs() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white w-full h-10 ${validInputs() && 'hover:cursor-pointer'} ${validInputs() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Sign in!"/> 
            </form>
            <div className="border-b-2 border-black m-4"></div>
            {/* <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Forgot your password?</p>
                <p className="text-xl text-green-400 hover:cursor-pointer" onClick={() => navigator('../resetpassword')}>Reset Password!</p>
            </div> */}
            {/* <div className="border-b-2 border-black m-4"></div> */}
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Don't have an account?</p>
                <p className="text-xl text-green-400 hover:cursor-pointer" onClick={() => navigator('../signup')}>Sign Up!</p>
            </div>
        </div>
    )
}

export default Signin;