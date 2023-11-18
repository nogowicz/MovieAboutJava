import Slider from '../../components/slider';

import ForestGump from '../../assets/images/forestgump.jpg';
import GodFather from '../../assets/images/godfather.jpg';
import HarryPotter from '../../assets/images/harrypotter.jpg';
import Incepcja from '../../assets/images/incepcja.jpg';
import Matrix from '../../assets/images/matrix.jpg';
import MrocznyRycerz from '../../assets/images/mrocznyrycerz.jpg';
import PowrotDoPrzeszlosci from '../../assets/images/powrotdoprzyszlosci.jpg';
import PulpFiction from '../../assets/images/pulpfiction.jpg';
import Shawshank from '../../assets/images/shawsshank.jpg';
import Counter from '../../components/counter';
import Aside from '../../components/aside';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { useState, useEffect } from 'react';

export default function Home() {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1200);
    const [isSliderBig, setIsSliderBig] = useState(window.innerWidth > 900);
    const [isSliderSmall, setIsSliderSmall] = useState(window.innerWidth > 550);

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth > 1200);
            setIsSliderBig(window.innerWidth > 900);
            setIsSliderSmall(window.innerWidth > 550);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const slides = [
        { url: ForestGump },
        { url: GodFather },
        { url: HarryPotter },
        { url: Incepcja },
        { url: Matrix },
        { url: MrocznyRycerz },
        { url: PowrotDoPrzeszlosci },
        { url: PulpFiction },
        { url: Shawshank },
    ];



    const containerStyles = {
        width: isSliderBig ? "800px" : isSliderSmall ? "450px" : "350px",
        height: isSliderBig ? "500px" : isSliderSmall ? "300px" : "220px",
        margin: "0 auto",
    };
    return (
        <>
            <Navbar mode='auth' />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <main style={{
                    flex: 1,
                    flexDirection: isWideScreen ? 'row' : 'column',
                    display: 'flex',
                    padding: '1rem',
                    justifyContent: 'center',
                    gap: 20,
                }}>
                    <section style={{
                        flexGrow: 1,
                        background: '#eceef3',
                        borderRadius: '1em',
                        padding: '2em',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center'

                    }}>
                        <div>
                            <h1 style={{
                                textAlign: 'center',
                                fontFamily: 'sans-serif',
                                fontSize: '2em',
                                color: '#000'
                            }}
                            >

                                What interesting is happening in the world of cinema?
                            </h1>

                            <div style={{
                                color: '#000',
                                textAlign: 'center',
                                fontFamily: 'sans-serif',
                                fontSize: '1em'

                            }}>

                                In the era of heavy internet streaming, it may seem like cinema is outdated.<br /><br />

                                Nothing could be further from the truth!
                                The film industry is still alive and well.
                                Moreover, the heightened standard of quality through intense competition makes the cinematic experience even more incredible.<br /><br />
                                With this website, you will find the perfect movie for yourself.
                                Reviews from esteemed film critics and regular cinema enthusiasts, along with promotional photos, can all be found in one place, right here on this website.<br /><br />

                            </div>
                        </div>
                        <div style={containerStyles}>
                            <Slider slides={slides} />
                        </div>
                        <Counter />
                    </section>
                    <Aside />
                </main>
                <Footer />
            </div >
        </>
    );
}
