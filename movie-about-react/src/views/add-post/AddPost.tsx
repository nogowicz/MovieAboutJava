import { useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';
import Aside from '../../components/aside';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import AddPostForm from '../../components/add-post-form';

export type Inputs = {
    title: string;
    date: string;
    content: string;
    anonymous: boolean;
    mediaType: string;
    addedBy: string;
};



export default function AddPost() {
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
        <>
            <Navbar mode='auth' />
            <div style={root}>
                <main style={{
                    ...container,
                    flexDirection: isWideScreen ? 'row' : 'column',
                }}>
                    <section style={section}>
                        <div>
                            <h1 style={title}>Add Entry</h1>
                            <AddPostForm />
                        </div>
                    </section>
                    <Aside />
                </main>
                <Footer />
            </div>
        </>
    );
}

const root: CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh' };

const container: CSSProperties = {
    flex: 1,
    display: 'flex',
    padding: '1rem',
    justifyContent: 'center',
    gap: 20,
};

const section: CSSProperties = {
    flexGrow: 1,
    background: '#eceef3',
    borderRadius: '1em',
    padding: '2em',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
};

const title: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '2em',
    color: '#000'
};