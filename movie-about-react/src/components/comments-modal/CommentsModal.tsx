import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { schema } from './validationSchema';
import { Inputs } from '../../views/add-post/AddPost';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../aside/Aside';
import jwt_decode from 'jwt-decode';

type CommentsModalProps = {
    show: boolean;
    onClose: () => void;
    postId: number | null;
};



export default function CommentsModal({ show, onClose, postId }: CommentsModalProps) {
    const authUser = useAuthUser();
    const [comments, setComments] = useState<Comment[]>([]);
    const [userRole, setUserRole] = useState<string>('');
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const username = authUser()?.usernameOrEmail || '';
    const token = authUser()?.token || '';
    const [isButtonHovered, setButtonHovered] = useState(false);
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });



    const getUserRoles = () => {
        try {
            const decodedToken: any = jwt_decode(token);
            if (decodedToken && decodedToken.roles) {
                setUserRole(decodedToken.roles[0]);
            } else {
                console.error('No roles info in token');
                return [];
            }
        } catch (error) {
            console.error('Error while decoding token', error);
            return [];
        }
    };



    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        try {
            const updatedData = {
                ...data,
                postId: postId,
                addedBy: username,
                createdAt: new Date().toISOString()
            };
            console.log(updatedData)
            const response = await axios.post(`http://localhost:8080/api/comments`, updatedData)
            console.log("Response: ", response);
            onClose();
            reset();


        } catch (error: any) {
            if (error.response) {
                setError("content", { message: error.response.data });
                console.log(error)
            } else {
                setError("content", { message: "An error occurred. Please try again later." });
            }
        }

    };


    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    useEffect(() => {
        getUserRoles();
    }, []);



    return (
        <>
            {show && (
                <div
                    style={{
                        position: 'fixed',
                        top: 50,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,

                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '0.5rem',
                            margin: 20,
                            minWidth: '80%',
                            maxHeight: '90%'
                        }}
                    >
                        <div
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <h2
                                style={{
                                    color: '#000',
                                }}
                            >
                                Add Comment
                            </h2>

                            <FaTimes
                                size={25}
                                onClick={onClose}
                                style={{
                                    color: '#000',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <textarea
                                    placeholder='Add new comment'
                                    rows={4}

                                    {...register('content')}
                                    style={{
                                        marginBottom: '1rem',
                                        resize: 'none',
                                        flex: 1,
                                        display: 'flex',
                                        width: '100%',
                                        padding: 20,
                                        color: '#000',
                                        fontSize: 14,
                                        borderRadius: 10,
                                        ...(errors.content ? errorInputStyle : {})
                                    }}
                                />
                                {errors.content && (
                                    <p style={errorTextStyle}>{errors.content.message}</p>
                                )}
                            </div>
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
                </div >
            )
            }
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
    cursor: 'pointer',
};

const buttonHoverStyle: CSSProperties = {
    backgroundColor: '#66f',
};

