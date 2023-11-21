import { CSSProperties, useCallback, useEffect, useState } from 'react'


export default function Slider({ slides }: { slides: { url: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setWindowWidth] = useState(window.innerWidth);


    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
        ...slideStyles,
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [goToNext]);



    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div style={sliderStyles}>
            <div>
                <div onClick={goToPrevious} style={leftArrowStyles}>
                    ❰
                </div>
                <div onClick={goToNext} style={rightArrowStyles}>
                    ❱
                </div>
            </div>
            <div style={slideStylesWidthBackground}></div>
            <div style={dotsContainerStyles}>
                {slides.map((_slide: { url: string }, slideIndex: number) => (
                    <div
                        style={dotStyle}
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
    );
}




const slideStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const rightArrowStyles: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
};

const leftArrowStyles: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
};

const sliderStyles: CSSProperties = {
    position: "relative",
    height: "100%",
};

const dotsContainerStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
};

const dotStyle: CSSProperties = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
    color: '#66f'
};

