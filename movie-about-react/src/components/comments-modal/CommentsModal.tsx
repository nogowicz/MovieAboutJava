import { yupResolver } from '@hookform/resolvers/yup';
import { CSSProperties, useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Inputs } from '../../views/add-post/AddPost';
import { schema } from './validationSchema';
import { usePosts } from '../../hooks/usePosts';

type CommentsModalProps = {
    show: boolean;
    onClose: () => void;
    postId: number | null;
};



export default function CommentsModal({ show, onClose, postId }: CommentsModalProps) {
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const [isButtonHovered, setButtonHovered] = useState(false);
    const { addComment } = usePosts();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const updatedData = {
                ...data,
                postId: postId,
                addedBy: username,
                createdAt: new Date().toISOString()
            };
            addComment(updatedData);
            onClose();
            reset();


            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setError("content", { message: error.response.data });
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


    return (
        <>
            {show && (
                <div style={root}>
                    <div style={container}>
                        <div style={upperContainer}>
                            <h2 style={{ color: '#000' }}>Add Comment</h2>
                            <FaTimes
                                size={25}
                                onClick={onClose}
                                style={closeButtonStyle}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <textarea
                                    placeholder='Add new comment'
                                    rows={4}
                                    {...register('content')}
                                    style={{
                                        ...textArea,
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

const root: CSSProperties = {
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
};

const container: CSSProperties = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    margin: 20,
    minWidth: '80%',
    maxHeight: '90%'
};

const upperContainer: CSSProperties = {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
};

const textArea: CSSProperties = {
    marginBottom: '1rem',
    resize: 'none',
    flex: 1,
    display: 'flex',
    width: '100%',
    padding: 20,
    color: '#000',
    fontSize: 14,
    borderRadius: 10,
};
const closeButtonStyle: CSSProperties = {
    color: '#000',
    cursor: 'pointer',
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

