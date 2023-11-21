import { CSSProperties } from 'react';
import { FaTimes } from 'react-icons/fa';
import AddPostForm from '../add-post-form';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    postId: number | null;
};

export default function Modal({ show, onClose, postId }: ModalProps) {

    return (
        <>
            {show && (
                <div style={root}>
                    <div style={container}>
                        <div style={upperContainer}>
                            <h2 style={titleText}>Edit Post</h2>
                            <FaTimes
                                size={25}
                                onClick={onClose}
                                style={closeButton}
                            />
                        </div>
                        <div style={formContainer}>
                            <AddPostForm
                                onClose={onClose}
                                postId={postId}
                                show={show}
                                modify
                            />
                        </div>
                    </div>
                </div>
            )}
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
};

const container: CSSProperties = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
};

const upperContainer: CSSProperties = {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const titleText: CSSProperties = {
    color: '#000',
    marginBottom: 20,
};

const closeButton: CSSProperties = {
    color: '#000',
    cursor: 'pointer',
};

const formContainer: CSSProperties = {
    overflowY: 'auto',
    maxHeight: '690px',
    overflowX: 'hidden',
    padding: 20,
};

