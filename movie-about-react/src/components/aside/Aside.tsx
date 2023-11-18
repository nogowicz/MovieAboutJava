import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface Post {
    id: number;
    title: string;
    date: Date;
    content: string;
    anonymous: boolean;
    mediaType: 'movie' | 'series';
    addedBy: string;
    commentCount: number;
    comments: any;
}

export const formatDate = (dateString: Date | string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
export default function Aside() {
    const [posts, setPosts] = useState<Post[]>([]);
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

    useEffect(() => {
        fetchPosts();
    }, []);




    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    };

    if (posts.length === 0) {
        return (
            <div
                style={asideStyles}
                onClick={() => navigation('/posts')}
            >
                <h2>All Posts</h2>
                <div>It's empty here. Add first post!</div>
            </div>
        );
    }

    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const latestPosts = sortedPosts.slice(0, 2);

    return (
        <div
            style={asideStyles}
            onClick={() => navigation('/posts')}
        >
            <h2
                style={{
                    marginBottom: 20,
                }}
            >Latest Posts</h2>

            {latestPosts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        marginBottom: 20,
                        width: isWideScreen ? '200px' : '',
                        wordWrap: 'break-word',
                    }}
                >
                    <h3>{post.title}</h3>
                    {post.anonymous ? <p
                        style={{
                            fontSize: 14,
                        }}
                    >Anonymous</p> : <p
                        style={{
                            fontSize: 14,
                        }}
                    >{post.addedBy}</p>}
                    <p>{post.content}</p>
                    <p
                        style={{
                            fontSize: 14,
                        }}
                    >{formatDate(post.date)}</p>
                </div>
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