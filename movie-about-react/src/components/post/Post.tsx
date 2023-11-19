import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { CSSProperties } from 'styled-components';
import { CommentType, DecodedToken } from '../comment/Comment';
import Comment from '../comment';
import { formatDate } from '../../utils/date';

export interface PostType {
    id: number;
    title: string;
    date: Date;
    content: string;
    anonymous: boolean;
    mediaType: 'movie' | 'series';
    addedBy: string;
    commentCount: number;
    comments: CommentType[];
}

type PostProps = {
    post: PostType;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    showModal: boolean;
    setSelectedPostId: Dispatch<SetStateAction<number | null>>;
    setPosts: Dispatch<SetStateAction<PostType[]>>;
    posts: PostType[];
    handleCommentsModal: (postId: number) => void;
    setShowPostsOptions: Dispatch<SetStateAction<number | null>>;
    showPostOptions: number | null;
    handleEditPost: (postId: number) => void;
}

export default function Post({
    post,
    showModal,
    setPosts,
    posts,
    handleCommentsModal,
    showPostOptions,
    setShowPostsOptions,
    handleEditPost
}: PostProps) {
    const { id, title, date, content, anonymous, addedBy, comments } = post;
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const token = authUser()?.token || '';
    const [userRole, setUserRole] = useState<string>('');

    const canEdit = addedBy === username || userRole === "ROLE_ADMIN";

    const handleDeletePost = async (postId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error while deleting post:', error);
        }
    };

    const getUserRoles = useCallback(() => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
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
    }, [token]);

    useEffect(() => {
        getUserRoles();
    }, [getUserRoles]);


    const renderOptions = () => {
        const handleOptionsClick = (postId: number) => {
            if (showPostOptions === postId) {
                setShowPostsOptions(null);
            } else {
                if (!showModal) {
                    setShowPostsOptions(postId);
                }
            }
        };

        return (
            <div style={optionsContainer}>
                <div style={{
                    ...optionsButton,
                    cursor: showModal ? 'default' : 'pointer'
                }}
                    onClick={() => { handleOptionsClick(id) }}>
                    <span style={optionsIcon}>&#8230;</span>
                </div>
                {showPostOptions === id && (
                    <ul style={optionsList}>
                        <li style={deleteOption} onClick={() => handleDeletePost(id)}>Delete</li>
                        <li style={editOption} onClick={() => handleEditPost(id)}>Edit</li>
                    </ul>
                )}
            </div>
        );
    };


    return (
        <div style={root}>
            {canEdit && renderOptions()}
            <h2 style={titleText}>{title}</h2>
            <p style={contentText}>{content}</p>
            <p style={{ color: '#999' }}>Author: {anonymous ? 'Anonymous' : addedBy}</p>
            <p style={{ color: '#999' }}>Date: {formatDate(date)}</p>
            <p style={addCommentButton} onClick={() => handleCommentsModal(id)}>Add Comment</p>
            <div>
                {comments.map((comment: CommentType) => (
                    <Comment
                        key={comment.id}
                        showModal={showModal}
                        comment={comment}
                        setPosts={setPosts}
                        posts={posts}
                    />
                ))}
            </div>
        </div>
    );
}


const optionsContainer: CSSProperties = {
    position: 'relative',
    marginBottom: '1rem',
};

const optionsButton: CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    background: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const optionsIcon: CSSProperties = {
    color: '#000',
    fontSize: '2rem',
    transform: 'rotate(90deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -50,
    marginTop: -10,
    display: 'flex',
};

const optionsList: CSSProperties = {
    position: 'absolute',
    top: '2rem',
    right: '0.5rem',
    background: '#fff',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    listStyle: 'none',
};

const deleteOption: CSSProperties = {
    cursor: 'pointer',
    color: '#333',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    background: '#FF0000',
};

const editOption: CSSProperties = {
    cursor: 'pointer',
    color: '#333',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    background: '#eee',
};

const root: CSSProperties = {
    margin: '1rem auto',
    padding: '1rem',
    borderRadius: '0.5em',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#333',
    maxWidth: '100%',
    width: '1700px',
    wordWrap: 'break-word',
};

const titleText: CSSProperties = { color: '#000', fontSize: '1.5em', marginBottom: '0.5em' };

const contentText: CSSProperties = { color: '#666', marginBottom: '0.5em' };

const addCommentButton: CSSProperties = {
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
    marginBottom: 10,
};