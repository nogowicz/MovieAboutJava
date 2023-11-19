import { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Modal from '../../components/modal';
import CommentsModal from '../../components/comments-modal';
import Post, { PostType } from '../../components/post/Post';
import FilterButtons from '../../components/filter-buttons';

export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'series' | 'movie'>('all');
    const [showModal, setShowModal] = useState(false)
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [showPostOptions, setShowPostsOptions] = useState<number | null>(null);


    const handleEditPost = (postId: number) => {
        setShowModal(true);
        setShowPostsOptions(null);
        setSelectedPostId(postId);
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

    const handleTabClick = (tab: 'all' | 'movie' | 'series') => {
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
                <FilterButtons activeTab={activeTab} handleTabClick={handleTabClick} />
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
                <FilterButtons activeTab={activeTab} handleTabClick={handleTabClick} />
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