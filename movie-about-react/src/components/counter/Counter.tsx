import React, { useState, useEffect } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const targetCount = 19500000;
        const increment = Math.ceil(targetCount / 100);

        const timer = setInterval(() => {
            setCount((prevCount) => {
                const newCount = prevCount + increment;
                return newCount >= targetCount ? targetCount : newCount;
            });
        }, 10);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div style={{
                color: '#000',
                fontSize: '2rem',
                fontWeight: 'bold',
                letterSpacing: '3px',
                fontFamily: 'sans-serif',
                marginTop: '4rem',

            }}
            >{count}
            </div>
            <div style={{
                color: '#000',
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
            }}>The number of people who visited the cinema in 2020.
            </div>
            <div style={{
                color: '#000',
                fontSize: '1rem',
                fontFamily: 'sans-serif',
            }}>
                Despite a challenging year and restrictions, the cinema industry managed to survive. However, the number of screenings decreased by half.
            </div>
        </div>
    );
}
