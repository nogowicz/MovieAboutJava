import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { Post, formatDate } from '../../components/aside/Aside';
import { useAuthUser } from 'react-auth-kit';
import Modal from '../../components/modal';
import jwt_decode from 'jwt-decode';
import CommentsModal from '../../components/comments-modal';



export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [activeTab, setActiveTab] = useState('all');
    const [showPostOptions, setShowPostsOptions] = useState<number | null>(null);
    const [showCommentOptions, setShowCommentOptions] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const token = authUser()?.token || '';
    const [userRole, setUserRole] = useState<string>('');
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);


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

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/posts/postsWithComments');
            setPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const filteredPosts = activeTab === 'all' ? posts : posts.filter((post) => post.mediaType.includes(activeTab));

    const handleDeletePost = async (postId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error while deleting post:', error);
        }
    };

    const handleDeleteComment = async (commentId: number, postId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
            setPosts(posts.map((post) => {
                if (post.id === postId) {
                    post.comments = post.comments.filter((comment: any) => comment.id !== commentId);
                }
                return post;
            }));
        } catch (error) {
            console.error('Error while deleting comment:', error);
        }
    };

    const handleEditPost = (postId: number) => {
        setShowModal(true);
        setShowPostsOptions(null);
        setSelectedPostId(postId);
    };

    const handleCommentsModal = (postId: number) => {
        setShowCommentsModal(true);
        setSelectedPostId(postId);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeCommentsModal = () => {
        setShowCommentsModal(false);
    };

    useEffect(() => {
        fetchPosts();
        getUserRoles();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [showModal, showCommentsModal]);



    const renderOptions = (post: Post) => {
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
            <div
                style={{
                    position: 'relative',
                    marginBottom: '1rem',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        background: 'inherit',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => { handleOptionsClick(post.id) }
                    }>
                    <span
                        style={{
                            color: '#000',
                            fontSize: '2rem',
                            rotate: '90deg',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: -50,
                            marginTop: -10,
                            display: 'flex',
                        }}
                    >
                        &#8230;
                    </span>
                </div>
                {showPostOptions === post.id && (
                    <ul
                        style={{
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
                        }}
                    >
                        <li
                            style={{
                                cursor: 'pointer',
                                color: '#333',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: '#FF0000',
                            }}
                            onClick={() => handleDeletePost(post.id)}
                        >
                            Delete
                        </li>
                        <li
                            style={{
                                cursor: 'pointer',
                                color: '#333',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: '#eee',
                            }}
                            onClick={() => handleEditPost(post.id)}
                        >
                            Edit
                        </li>
                    </ul>
                )}
            </div>
        );
    };

    const renderCommentOptions = (comment: any) => {
        const handleOptionsClick = (commentId: number) => {
            if (showCommentOptions === commentId) {
                setShowCommentOptions(null);
            } else {
                setShowCommentOptions(commentId);
            }
        };

        return (
            <div
                style={{
                    position: 'relative',
                    marginBottom: '1rem',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        background: 'inherit',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => { handleOptionsClick(comment.id) }
                    }>
                    <span
                        style={{
                            color: '#000',
                            fontSize: '2rem',
                            rotate: '90deg',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: -50,
                            marginTop: -10,
                            display: 'flex',
                        }}
                    >
                        &#8230;
                    </span>
                </div>
                {showCommentOptions === comment.id && (
                    <ul
                        style={{
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
                        }}
                    >
                        <li
                            style={{
                                cursor: 'pointer',
                                color: '#333',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: '#FF0000',
                            }}
                            onClick={() => handleDeleteComment(comment.id, comment.postId)}
                        >
                            Delete
                        </li>

                    </ul>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbar mode='auth' />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: 50 }}>
                <Modal show={showModal} onClose={closeModal} postId={selectedPostId} />
                <CommentsModal show={showCommentsModal} onClose={closeCommentsModal} postId={selectedPostId} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                backgroundColor: activeTab === 'all' ? '#333' : '#eee',
                                color: activeTab === 'all' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('all')}
                        >
                            All
                        </button>
                        <button
                            style={{
                                backgroundColor: activeTab === 'movie' ? '#333' : '#eee',
                                color: activeTab === 'movie' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('movie')}
                        >
                            Movies
                        </button>
                        <button
                            style={{
                                backgroundColor: activeTab === 'series' ? '#333' : '#eee',
                                color: activeTab === 'series' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('series')}
                        >
                            TV Shows
                        </button>
                    </div>
                </div>
                <main
                    style={{
                        flex: 1,
                        display: 'flex',
                        padding: '1rem',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <section
                        style={{
                            background: '#eceef3',
                            borderRadius: '1em',
                            padding: '2em',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            maxWidth: '100%',
                            width: '1700px',
                            wordWrap: 'break-word',
                        }}
                    >
                        {filteredPosts.length === 0 && <div style={{
                            color: '#000',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                        }}>It's empty here. Add first post!</div>}

                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                style={{
                                    margin: '1rem auto',
                                    padding: '1rem',
                                    borderRadius: '0.5em',
                                    background: '#fff',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    color: '#333',
                                    maxWidth: '100%',
                                    width: '1700px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {(post.addedBy === username || userRole === "ROLE_ADMIN") && renderOptions(post)}
                                <h2 style={{ color: '#000', fontSize: '1.5em', marginBottom: '0.5em' }}>{post.title}</h2>
                                <p style={{ color: '#666', marginBottom: '0.5em' }}>{post.content}</p>
                                <p style={{ color: '#999' }}>Author: {post.anonymous ? 'Anonymous' : post.addedBy}</p>
                                <p style={{ color: '#999' }}>Date: {formatDate(post.date)}</p>
                                <p
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                    onClick={() => handleCommentsModal(post.id)}
                                >Add Comment</p>
                                <div>
                                    {post.comments.map((comment: any) => (
                                        <div
                                            key={comment.id}
                                            style={{
                                                margin: '0.5rem auto',
                                                padding: '0.5rem',
                                                borderRadius: '0.5em',
                                                background: '#f7f7f7',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                color: '#333',
                                                maxWidth: '100%',
                                                width: '1500px',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {(comment.addedBy === username || userRole === "ROLE_ADMIN") && renderCommentOptions(comment)}
                                            <p style={{ color: '#666', marginBottom: '0.5em' }}>{comment.content}</p>
                                            <p style={{ color: '#999' }}>Author: {comment.addedBy}</p>
                                            <p style={{ color: '#999' }}>Date: {formatDate(comment.createdAt)}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}


                    </section>
                </main>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                backgroundColor: activeTab === 'all' ? '#333' : '#eee',
                                color: activeTab === 'all' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('all')}
                        >
                            All
                        </button>
                        <button
                            style={{
                                backgroundColor: activeTab === 'movie' ? '#333' : '#eee',
                                color: activeTab === 'movie' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('movie')}
                        >
                            Movies
                        </button>
                        <button
                            style={{
                                backgroundColor: activeTab === 'series' ? '#333' : '#eee',
                                color: activeTab === 'series' ? '#fff' : '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                            }}
                            onClick={() => handleTabClick('series')}
                        >
                            TV Shows
                        </button>
                    </div>
                </div>
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

