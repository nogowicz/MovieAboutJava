import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CSSProperties } from 'styled-components';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from './validationSchema';
import Navbar from '../../../components/navbar';

interface RegistrationInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type ErrorsType = {
    [key: string]: "email" | "username" | "password";
};

const errorsTable: ErrorsType = {
    "An error occurred while checking the username.": "username",
    "Username is already taken.": "username",
    "An error occurred while checking the email.": "email",
    "Email is already taken.": "email",
    "An error occurred while hashing the password.": "password",
    "An error occurred while registering the user.": "username"
};


export default function Registration() {
    const [isButtonHovered, setButtonHovered] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegistrationInputs>({
        resolver: yupResolver(registrationSchema),
    });

    const onSubmit = async (data: RegistrationInputs) => {
        try {
            await axios.post("http://localhost:8080/api/auth/signup", data);
            navigate("/");
        } catch (error: unknown) {
            if (error && error instanceof AxiosError) {
                if (error.response) {
                    setError(errorsTable[error.response.data], { message: error.response.data });
                    console.log(error)
                } else {
                    setError("username", { message: "An error occurred. Please try again later." });
                    setError("password", { message: "An error occurred. Please try again later." });
                    setError("confirmPassword", { message: "An error occurred. Please try again later." });
                    setError("email", { message: "An error occurred. Please try again later." });
                }
            }
        }
    };

    return (
        <>
            <Navbar mode="unauth" />
            <div style={formContainerStyle}>
                <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                    <h1 style={formHeadingStyle}>Sign Up</h1>
                    <div style={fieldStyle}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            style={{
                                ...inputStyle,
                                ...(errors.username ? errorInputStyle : {}),
                            }}
                            id="username"
                            {...register("username")}
                        />
                        {errors.username && (
                            <span style={errorTextStyle}>{errors.username.message}</span>
                        )}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="email">Email:</label>
                        <input
                            style={{
                                ...inputStyle,
                                ...(errors.email ? errorInputStyle : {}),
                            }}
                            id="email"
                            {...register("email", {
                            })}
                        />
                        {errors.email && (
                            <span style={errorTextStyle}>{errors.email.message}</span>
                        )}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            style={{
                                ...inputStyle,
                                ...(errors.password ? errorInputStyle : {}),
                            }}
                            id="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <span style={errorTextStyle}>{errors.password.message}</span>
                        )}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input
                            type="password"
                            style={{
                                ...inputStyle,
                                ...(errors.confirmPassword ? errorInputStyle : {}),
                            }}
                            id="confirmPassword"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span style={errorTextStyle}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={
                            isButtonHovered
                                ? { ...buttonStyle, ...buttonHoverStyle }
                                : { ...buttonStyle }
                        }
                        onMouseEnter={() => setButtonHovered(true)}
                        onMouseLeave={() => setButtonHovered(false)}
                    >
                        Sign Up
                    </button>

                    <div style={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        marginBottom: -20,
                    }}>Already have an account?</div>
                    <div
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate("/login")}
                    >Sign In Here!</div>
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
    gap: 20
};

const formHeadingStyle: CSSProperties = {
    color: '#000',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold'
};

const fieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    color: '#000',
    fontWeight: 'bold'
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
    transition: 'background 0.25s, border-color 0.25s, color 0.25s'
};

const errorInputStyle: CSSProperties = {
    border: '1px solid red'
};

const errorTextStyle: CSSProperties = {
    color: 'red',
    fontSize: '0.9em'
};

const buttonStyle: CSSProperties = {
    backgroundColor: '#000',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: '600',
    fontSize: '1.1em',
    padding: '15px 16px',
    color: '#fff',
    borderRadius: 10,
    border: 'none'
};

const buttonHoverStyle: CSSProperties = {
    backgroundColor: '#66f'
};
