import { CSSProperties } from "react";

type FilterButtonsProps = {
    activeTab: 'all' | 'movie' | 'series';
    handleTabClick: (tab: 'all' | 'movie' | 'series') => void;
};

export default function FilterButtons({ activeTab, handleTabClick }: FilterButtonsProps) {
    return (
        <div style={container}>
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
    );
}

const filterButton: CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '0.5rem',
};

const container: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
};
