import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthUser } from 'react-auth-kit';
import { schema } from '../../views/add-post/validationSchema';
import { Inputs } from '../../views/add-post/AddPost';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

type AddPostFormProps = {
    show?: boolean;
    onClose?: () => void;
    postId?: number | null;
    modify?: boolean
};

export default function AddPostForm({ show, onClose, postId, modify = false }: AddPostFormProps) {
    const [isButtonHovered, setButtonHovered] = useState(false);
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const navigation = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmitAddPost: SubmitHandler<Inputs> = async (data) => {
        try {
            await axios.post("http://localhost:8080/api/posts", data)
            navigation('/posts');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setError("title", { message: error.response.data });
                setError("date", { message: error.response.data });
                setError("content", { message: error.response.data });
            } else {
                setError("title", { message: "An error occurred. Please try again later." });
                setError("date", { message: "An error occurred. Please try again later." });
                setError("content", { message: "An error occurred. Please try again later." });
            }
        }
    };

    const onSubmitEditPost: SubmitHandler<Inputs> = async (data) => {
        try {
            if (postId) {
                const formattedDate = new Date(data.date).toISOString().split('T')[0];
                const updatedData = {
                    ...data,
                    date: formattedDate,
                };
                await axios.put(`http://localhost:8080/api/posts/${postId}`, updatedData);
                if (onClose) {
                    onClose();
                }

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setError("title", { message: error.response.data });
                setError("date", { message: error.response.data });
                setError("content", { message: error.response.data });
            } else {
                setError("title", { message: "An error occurred. Please try again later." });
                setError("date", { message: "An error occurred. Please try again later." });
                setError("content", { message: "An error occurred. Please try again later." });
            }
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxChecked(e.target.checked);
    };

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
            setValue('title', response.data.title);
            setValue('content', response.data.content);
            setValue('mediaType', response.data.mediaType);
            setCheckboxChecked(response.data.anonymous);
        } catch (error) {
            console.error('Error while fetching post:', error);
        }
    }, [postId, setValue]);

    useEffect(() => {
        if (postId !== null && modify) {
            fetchPost();
        }
    }, [fetchPost, postId, setValue, modify]);




    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);


    return (
        <form
            onSubmit={handleSubmit(modify ? onSubmitEditPost : onSubmitAddPost)}
            style={form}
        >
            <label style={labelStyle}>
                Title:
                <input
                    maxLength={100}
                    style={{
                        ...inputStyle,
                        ...(errors.title ? errorInputStyle : {}),
                    }}
                    type="text"
                    {...register('title')}
                    placeholder="Title (max. 100 characters)"
                />
                {errors.title && (
                    <span style={errorTextStyle}>{errors.title.message}</span>
                )}
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
                    placeholder="Content (max. 500 characters)"
                    style={{
                        ...inputStyle,
                        ...(errors.content ? errorInputStyle : {}),
                        minHeight: '200px',
                        minWidth: '425px',
                    }}
                    {...register('content')}
                />
                {errors.content && (
                    <span style={errorTextStyle}>{errors.content.message}</span>
                )}
            </label>

            <label style={labelStyle}>
                Media Type:
                <div style={mediaTypeContainer}>
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
                        style={mediaTypeArrow}
                    ></span>
                </div>
            </label>

            <label
                style={{
                    ...labelStyle,
                    flexDirection: 'row',
                    gap: 20,
                }}
            >
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
                        style={checkboxStyle}
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
                    isButtonHovered
                        ? {
                            ...buttonStyle,
                            ...buttonHoverStyle,
                        }
                        : {
                            ...buttonStyle,
                        }
                }
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
            >
                Submit
            </button>
        </form>
    );
}


const form: CSSProperties = {
    flexDirection: 'column',
    display: 'flex',
    maxWidth: '425px',
};

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

const mediaTypeContainer: CSSProperties = { position: 'relative', maxWidth: '100px' };

const mediaTypeArrow: CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '0.8em',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    borderLeft: '0.4em solid transparent',
    borderRight: '0.4em solid transparent',
    borderTop: '0.4em solid #000',
};

const checkboxStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '0.5em',
    transform: 'translateY(-50%)',
    display: 'inline-block',
    height: '2em',
    borderRadius: '3px',
    textAlign: 'center',
};