import { yupResolver } from '@hookform/resolvers/yup';
import Aside from '../../components/aside';
import Footer from '../../components/footer';
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from './validationSchema';
import { CSSProperties } from 'styled-components';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import axios, { AxiosError } from 'axios';
import { useAuthUser, } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export type Inputs = {
    title: string;
    date: string;
    content: string;
    anonymous: boolean;
    mediaType: string;
    addedBy: string;
};



export default function AddPost() {
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const navigation = useNavigate();
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1200);

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth > 1200);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data)
            const response = await axios.post("http://localhost:8080/api/posts", data)
            console.log("Response: ", response);
            navigation('/posts');


        } catch (error: any) {
            if (error.response) {
                setError("title", { message: error.response.data });
                setError("date", { message: error.response.data });
                setError("content", { message: error.response.data });
                console.log(error)
            } else {
                setError("title", { message: "An error occurred. Please try again later." });
                setError("date", { message: "An error occurred. Please try again later." });
                setError("content", { message: "An error occurred. Please try again later." });
            }
        }
    };

    const [isButtonHovered, setButtonHovered] = useState(false);
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxChecked(e.target.checked);
    };

    return (
        <>
            <Navbar mode='auth' />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <main style={{
                    flex: 1,
                    flexDirection: isWideScreen ? 'row' : 'column',
                    display: 'flex',
                    padding: '1rem',
                    justifyContent: 'center',
                    gap: 20,
                }}>
                    <section style={{
                        flexGrow: 1,
                        background: '#eceef3',
                        borderRadius: '1em',
                        padding: '2em',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                    }}>
                        <div>
                            <h1 style={{
                                textAlign: 'center',
                                fontFamily: 'sans-serif',
                                fontSize: '2em',
                                color: '#000'
                            }}>
                                Add Entry
                            </h1>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                style={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    gap: 50,
                                    maxWidth: '425px'
                                }}
                            >
                                <label style={labelStyle}>
                                    Title:
                                    <input
                                        maxLength={100}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.title ? errorInputStyle : {})
                                        }}
                                        type="text" {...register('title')}
                                        placeholder='Title (max. 100 characters)'
                                    />
                                    {errors.title && <span style={errorTextStyle}>{errors.title.message}</span>}
                                </label>

                                <label style={labelStyle}>
                                    Date:
                                    <input
                                        style={{
                                            ...inputStyle,
                                            ...(errors.date ? errorInputStyle : {}),
                                            maxWidth: '250px'
                                        }}
                                        type="date" {...register('date')}
                                        defaultValue={new Date().toISOString().split('T')[0]}

                                    />
                                    {errors.date && <span style={errorTextStyle}>{errors.date.message}</span>}
                                </label>

                                <label style={labelStyle}>
                                    Content:
                                    <textarea
                                        placeholder='Content (max. 500 characters)'
                                        style={{
                                            ...inputStyle,
                                            ...(errors.content ? errorInputStyle : {}),
                                            minHeight: '200px',
                                            minWidth: '425px',
                                        }}
                                        {...register('content')} />
                                    {errors.content && <span style={errorTextStyle}>{errors.content.message}</span>}
                                </label>


                                <label style={labelStyle}>
                                    Media Type:
                                    <div style={{ position: 'relative', maxWidth: '100px' }}>
                                        <select
                                            style={{
                                                ...inputStyle,
                                                ...(errors.mediaType ? errorInputStyle : {}),
                                                paddingRight: '2.5em',
                                            }}
                                            {...register('mediaType')}
                                        >
                                            <option value="movie">Movie</option>
                                            <option value="series">Series</option>
                                        </select>
                                        <span
                                            className="select-arrow"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.8em',
                                                transform: 'translateY(-50%)',
                                                pointerEvents: 'none',
                                                borderLeft: '0.4em solid transparent',
                                                borderRight: '0.4em solid transparent',
                                                borderTop: '0.4em solid #000',
                                            }}
                                        ></span>
                                    </div>
                                </label>

                                <label style={{
                                    ...labelStyle,
                                    flexDirection: 'row',
                                    gap: 20,
                                }}>
                                    Anonymous:
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            style={{
                                                ...inputStyle,
                                                ...(errors.anonymous ? errorInputStyle : {}),
                                                height: 0,
                                                width: 0,
                                            }}
                                            type="checkbox"
                                            {...register('anonymous')}
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span
                                            className="checkbox-icon"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '0.5em',
                                                transform: 'translateY(-50%)',
                                                display: 'inline-block',
                                                height: '2em',
                                                borderRadius: '3px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {isCheckboxChecked ? '✔' : ''}
                                        </span>
                                    </div>
                                </label>

                                <input
                                    type="hidden"
                                    {...register('addedBy')}
                                    defaultValue={username}
                                />

                                <button
                                    type="submit"
                                    style={
                                        isButtonHovered ?
                                            {
                                                ...buttonStyle,
                                                ...buttonHoverStyle
                                            } : {
                                                ...buttonStyle
                                            }}
                                    onMouseEnter={() => setButtonHovered(true)}
                                    onMouseLeave={() => setButtonHovered(false)}
                                >Submit</button>
                            </form>
                        </div>
                    </section>
                    <Aside />
                </main>
                <Footer />
            </div>
        </>
    );
}

const labelStyle: CSSProperties = {
    color: '#000',
    fontWeight: '600',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: 10,
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
    fontFamily: "Source Sans Pro, sans-serif",
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
    fontFamily: "Source Sans Pro, sans-serif",
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
