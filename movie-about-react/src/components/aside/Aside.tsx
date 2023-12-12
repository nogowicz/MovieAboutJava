import { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PostType } from '../post/Post';
import AsidePost from '../aside-post';



export default function Aside() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const navigation = useNavigate();


    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestPosts = sortedPosts.slice(0, 2);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/posts/postsWithComments');
            setPosts(response.data);
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div style={asideStyles} onClick={() => navigation('/posts')}>
                <h2>All Posts</h2>
                <div>It's empty here. Add first post!</div>
            </div>
        );
    }


    return (
        <div style={asideStyles} onClick={() => navigation('/posts')}>
            <h2 style={{ marginBottom: 20 }}>Latest Posts</h2>
            {latestPosts.map((post) => (
                <AsidePost key={post.id} {...post} />
            ))}
        </div>
    );
}

const asideStyles: CSSProperties = {
    flexBasis: '16em',
    padding: '1em',
    backgroundColor: '#66f',
    color: '#000',
    borderRadius: '1em',
    minWidth: '250px',
    cursor: 'pointer'
};