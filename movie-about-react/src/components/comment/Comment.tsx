import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatDate } from '../aside/Aside';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import jwt_decode from 'jwt-decode';
import { PostType } from '../post/Post';

export type CommentType = {
    id: number;
    postId: number;
    content: string;
    addedBy: string;
    createdAt: string;
};

type CommentProps = {
    comment: CommentType;
    showModal: boolean;
    setPosts: Dispatch<SetStateAction<PostType[]>>;
    posts: PostType[];
};

type DecodedToken = {
    sub: string;
    username: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
};


export default function Comment({ comment, showModal, setPosts, posts }: CommentProps) {
    const { id, postId, content, addedBy, createdAt } = comment;
    const [showCommentOptions, setShowCommentOptions] = useState<number | null>(null);
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const token = authUser()?.token || '';
    const [userRole, setUserRole] = useState<string>('');

    const canEdit = addedBy === username || userRole === "ROLE_ADMIN";

    const renderCommentOptions = () => {
        const handleOptionsClick = (commentId: number) => {
            console.log(showCommentOptions)
            if (showCommentOptions === commentId) {
                setShowCommentOptions(null);
            } else {
                if (!showModal)
                    setShowCommentOptions(commentId);
            }
        };

        return (
            <div style={optionsContainer} >
                <div style={{
                    ...optionsButton,
                    cursor: showModal ? 'default' : 'pointer'
                }}
                    onClick={() => { handleOptionsClick(id) }}
                >
                    <span style={optionsIcon}>&#8230;</span>
                </div>
                {showCommentOptions === id && (
                    <ul style={optionsList}>
                        <li style={deleteOption} onClick={() => handleDeleteComment(id, postId)}>
                            Delete
                        </li>
                    </ul>
                )}
            </div>
        );
    };

    const handleDeleteComment = async (commentId: number, postId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
            setPosts(posts.map((post) => {
                if (post.id === postId) {
                    post.comments = post.comments.filter((comment: CommentType) => comment.id !== commentId);
                }
                return post;
            }));
        } catch (error) {
            console.error('Error while deleting comment:', error);
        }
    };

    const getUserRoles = () => {
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
    };

    useEffect(() => {
        getUserRoles();
    }, []);

    return (
        <div style={root}>
            {canEdit && renderCommentOptions()}
            <p style={contentText}>{content}</p>
            <p style={{ color: '#999' }}>Author: {addedBy}</p>
            <p style={{ color: '#999' }}>Date: {formatDate(createdAt)}</p>
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

const root: CSSProperties = {
    margin: '0.5rem auto',
    padding: '0.5rem',
    borderRadius: '0.5em',
    background: '#f7f7f7',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    color: '#333',
    maxWidth: '100%',
    width: '1500px',
    wordWrap: 'break-word',
};

const contentText: CSSProperties = { color: '#666', marginBottom: '0.5em' };