import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from 'styled-components';
import { loginSchema } from './validationSchema';
import { useAuth } from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar';

interface Inputs {
    usernameOrEmail: string;
    password: string;
}

export default function Login() {
    const [isButtonHovered, setButtonHovered] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
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
            login(data.usernameOrEmail, data.password);
        } catch (error: unknown) {
            if (error && error instanceof AxiosError) {
                if (error.response) {
                    setError("usernameOrEmail", { message: error.response.data });
                    setError("usernameOrEmail", { message: error.response.data });
                } else {
                    setError("usernameOrEmail", { message: "An error occurred. Please try again later." });
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
                    <h1 style={title}>Sign In</h1>
                    <div style={fieldStyle}>
                        <label htmlFor="usernameOrEmail">Username:</label>
                        <input
                            type="text"
                            style={{
                                ...inputStyle,
                                ...(errors.usernameOrEmail ? errorInputStyle : {})
                            }}
                            id="usernameOrEmail"
                            {...register('usernameOrEmail', { required: 'This field is required' })}
                        />
                        {errors.usernameOrEmail && <span style={errorTextStyle}>{errors.usernameOrEmail.message}</span>}
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
                            {...register('password', { required: 'This field is required' })}
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
                    <div style={subtitle}>
                        Don't have an account yet?
                    </div>
                    <div
                        style={buttonText}
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

const title: CSSProperties = { color: '#000', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' };

const subtitle: CSSProperties = { color: '#000', textAlign: 'center', fontSize: '1.2rem', marginBottom: -20 };

const buttonText: CSSProperties = { color: '#000', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' };