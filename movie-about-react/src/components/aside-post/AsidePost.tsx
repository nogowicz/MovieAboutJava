import { PostType } from '../post/Post';
import { formatDate } from '../../utils/date';
import { useState, useEffect } from 'react';
import { CSSProperties } from 'styled-components';

export default function AsidePost(post: PostType) {
    const { title, content, anonymous, date, addedBy } = post;
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

    return (
        <div style={{
            width: isWideScreen ? '200px' : '',
            ...root
        }}>
            <h3>{title}</h3>
            {anonymous ? <p style={{ fontSize: 14 }}>Anonymous</p> :
                <p style={{ fontSize: 14 }}>{addedBy}</p>}
            <p>{content}</p>
            <p style={{ fontSize: 14 }}>{formatDate(date)}</p>
        </div>
    );
}


const root: CSSProperties = {
    marginBottom: 20,
    wordWrap: 'break-word',
};