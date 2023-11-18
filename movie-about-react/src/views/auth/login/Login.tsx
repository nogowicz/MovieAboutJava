import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from './validationSchema';
import { CSSProperties } from 'styled-components';
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import Navbar from '../../../components/navbar';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../utils/api';

interface Inputs {
    username: string;
    password: string;
}



export default function Login() {
    const [isButtonHovered, setButtonHovered] = useState(false);
    const navigate = useNavigate();
    const signIn = useSignIn();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: Inputs) => {
        try {
            const response = await login(data);

            // signIn({
            //     token: response.token,
            //     expiresIn: response.expiresIn,
            //     tokenType: response.tokenType,
            //     authState: {
            //         username: data.username,
            //     }
            // });
            // navigate("/");
            console.log(data);
        } catch (error: any) {
            if (error && error instanceof AxiosError) {
                if (error.response) {
                    setError("username", { message: error.response.data });
                    setError("password", { message: error.response.data });
                    console.log(error)
                } else {
                    setError("username", { message: "An error occurred. Please try again later." });
                    setError("password", { message: "An error occurred. Please try again later." });
                }
            }
        }
    };

    return (
        <>
            <Navbar mode='unauth' />
            <div style={formContainerStyle}>
                <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                    <h1 style={{ color: '#000', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>Sign In</h1>
                    <div style={fieldStyle}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            style={{
                                ...inputStyle,
                                ...(errors.username ? errorInputStyle : {})
                            }}
                            id="username"
                            {...register('username', { required: 'To pole jest wymagane' })}
                        />
                        {errors.username && <span style={errorTextStyle}>{errors.username.message}</span>}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            style={{
                                ...inputStyle,
                                ...(errors.password ? errorInputStyle : {})
                            }}
                            id="password"
                            {...register('password', { required: 'To pole jest wymagane' })}
                        />
                        {errors.password && <span style={errorTextStyle}>{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        style={isButtonHovered ? { ...buttonStyle, ...buttonHoverStyle } : { ...buttonStyle }}
                        onMouseEnter={() => setButtonHovered(true)}
                        onMouseLeave={() => setButtonHovered(false)}
                    >
                        Sign In
                    </button>
                    <div style={{ color: '#000', textAlign: 'center', fontSize: '1.2rem', marginBottom: -20 }}>
                        Don't have an account yet?
                    </div>
                    <div
                        style={{ color: '#000', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => navigate("/register")}
                    >
                        Sign up Here!
                    </div>
                </form>
            </div>
        </>
    );
}

const formContainerStyle: CSSProperties = {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
};

const formStyle: CSSProperties = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '400px',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '10px',
    background: '#eceef3',
    gap: 20,
};

const fieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    color: '#000',
    fontWeight: 'bold',
};

const inputStyle: CSSProperties = {
    WebkitAppearance: 'none',
    backgroundColor: '#f9f9f9',
    border: '1px solid #dddddd',
    color: '#000',
    maxWidth: '425px',
    width: '100%',
    padding: '0.8em',
    fontSize: '0.9em',
    fontFamily: 'Source Sans Pro, sans-serif',
    borderRadius: 10,
    outline: 'none',
    transition: 'background 0.25s, border-color 0.25s, color 0.25s',
};

const errorInputStyle: CSSProperties = {
    border: '1px solid red',
};

const errorTextStyle: CSSProperties = {
    color: 'red',
    fontSize: '0.9em',
};

const buttonStyle: CSSProperties = {
    backgroundColor: '#000',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: '600',
    fontSize: '1.1em',
    padding: '15px 16px',
    color: '#fff',
    borderRadius: 10,
    border: 'none',
};

const buttonHoverStyle: CSSProperties = {
    backgroundColor: '#66f',
};
