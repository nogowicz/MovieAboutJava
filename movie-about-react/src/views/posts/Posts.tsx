import { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { formatDate } from '../../components/aside/Aside';
import { useAuthUser } from 'react-auth-kit';
import Modal from '../../components/modal';
import jwt_decode from 'jwt-decode';
import CommentsModal from '../../components/comments-modal';
import Post, { PostType } from '../../components/post/Post';
import { CommentType } from '../../components/comment/Comment';


type DecodedToken = {
    sub: string;
    username: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
};


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false)
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const authUser = useAuthUser();
    const username = authUser()?.usernameOrEmail || '';
    const token = authUser()?.token || '';
    const [userRole, setUserRole] = useState<string>('');
    const [showPostOptions, setShowPostsOptions] = useState<number | null>(null);


    const handleEditPost = (postId: number) => {
        setShowModal(true);
        setShowPostsOptions(null);
        setSelectedPostId(postId);
    };



    const getUserRoles = () => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            console.log(decodedToken);
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




    return (
        <>
            <Navbar mode='auth' />
            <div style={root}>
                <Modal show={showModal} onClose={closeModal} postId={selectedPostId} />
                <CommentsModal show={showCommentsModal} onClose={closeCommentsModal} postId={selectedPostId} />
                <div style={conatiner}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button style={{
                            backgroundColor: activeTab === 'all' ? '#333' : '#eee',
                            color: activeTab === 'all' ? '#fff' : '#333',
                            ...filterButton
                        }}
                            onClick={() => handleTabClick('all')}
                        >
                            All
                        </button>
                        <button style={{
                            backgroundColor: activeTab === 'movie' ? '#333' : '#eee',
                            color: activeTab === 'movie' ? '#fff' : '#333',
                            ...filterButton
                        }}
                            onClick={() => handleTabClick('movie')}
                        >
                            Movies
                        </button>
                        <button style={{
                            backgroundColor: activeTab === 'series' ? '#333' : '#eee',
                            color: activeTab === 'series' ? '#fff' : '#333',
                            ...filterButton
                        }}
                            onClick={() => handleTabClick('series')}
                        >
                            TV Shows
                        </button>
                    </div>
                </div>
                <main style={postsContainer}>
                    <section style={sectionContainer}>
                        {filteredPosts.length === 0 && <div style={noPostsContainer}>It's empty here. Add first post!</div>}
                        {filteredPosts.map((post) => (
                            <Post
                                key={post.id}
                                setShowModal={setShowModal}
                                showModal={showModal}
                                setSelectedPostId={setSelectedPostId}
                                post={post}
                                handleCommentsModal={handleCommentsModal}
                                posts={posts}
                                setPosts={setPosts}
                                showPostOptions={showPostOptions}
                                setShowPostsOptions={setShowPostsOptions}
                                handleEditPost={handleEditPost}
                            />
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


const root: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginTop: 50
};

const conatiner: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
};

const filterButton: CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '0.5rem',
};

const postsContainer: CSSProperties = {
    flex: 1,
    display: 'flex',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
};

const sectionContainer: CSSProperties = {
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
};

const noPostsContainer: CSSProperties = {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
};