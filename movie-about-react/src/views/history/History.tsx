import { useState, useEffect } from 'react';
import { CSSProperties } from 'styled-components';
import Aside from '../../components/aside';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';

export default function History() {
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
                <main style={container}>
                    <section style={{
                        ...section,
                        flexDirection: isWideScreen ? 'row' : 'column',
                    }}>
                        <div>
                            <h1 style={title}>History of Cinema</h1>
                            <div style={textContainer}>
                                <h2 style={subtitleStyle}>From the beginning...</h2>
                                Cinema is the illusion of motion created by capturing a vast number of photographic images and then rapidly projecting them onto a screen.
                                Initially born out of scientific endeavors in the 19th century, cinema has evolved into a medium of mass entertainment and communication.
                                Today, it is a multibillion-dollar industry.
                                In 1891, the Edison Company successfully demonstrated a prototype of the Kinetoscope, which allowed an individual to view moving images.
                                The first public demonstration of the Kinetoscope took place in 1893. By 1894, the Kinetoscope achieved commercial success, and public parlors offering people the experience of this incredible device began to appear worldwide.
                                The Lumière brothers were the first to present projected moving images to a paying audience in December 1895 in Paris, France.
                                They used their own invention called the Cinématographe, which combined a camera, projector, and film printer into one device.
                                Initially, films were very short, sometimes only a few minutes or even less.
                                They were shown at fairgrounds, music halls, or wherever a screen could be set up and the room darkened.
                                The subjects included local scenes and activities, views of foreign countries, short comedies, and newsworthy events.
                                <br /><br />
                                Films were accompanied by lectures, music, and a significant audience participation.
                                Although they didn't have synchronized dialogue, they were not truly "silent" as they are sometimes referred to.
                                By 1914, several national film industries had emerged. During this time, Europe, Russia, and Scandinavia were the dominant regions in the industry, with America being much less significant.
                                Films became longer, and storytelling became the dominant form.
                                As more people paid to watch movies, the industry that developed around them was ready to invest more money in their production, distribution, and exhibition.
                                This led to the establishment of large studios and the construction of dedicated theaters.
                                The First World War had a significant impact on the European film industry, while the American industry gained prominence.
                                The first 30 years of cinema were characterized by the development and consolidation of the industrial base, the establishment of narrative form, and technological refinement.
                                <h2 style={subtitleStyle}>The advent of color</h2>

                                Color was first introduced to black-and-white films through manual techniques such as hand coloring, tinting, toning, and stenciling.
                                In 1906, color separation principles were used to create "natural color" moving pictures through the British process known as Kinemacolor, which was publicly presented for the first time in 1909.
                                Kinemacolor was primarily used for documentary films, such as the epic "With Our King and Queen Through India" (also known as "The Delhi Durbar") from 1912, which lasted over 2 hours in total.

                                <h2 style={subtitleStyle}>How cinema competes with television?</h2>
                                The introduction of television in America led to a series of technical experiments aimed at maintaining public interest in cinema.
                                In 1952, the Cinerama process premiered, utilizing three projectors and a wide, deeply curved screen along with multi-track surround sound.
                                It had a very wide aspect ratio of 2.59:1, giving viewers a greater sense of immersion and proved to be immensely popular.
                                However, Cinerama was technically complex and therefore expensive to produce and exhibit.
                                Wide-screen cinema did not become widely adopted by the industry until the invention of CinemaScope in 1953 and Todd-AO in 1955.
                                Both processes used a single projector for presentation.
                                CinemaScope "squeezed" images onto 35mm film, which were then expanded horizontally by the projector lens to fit the screen. Todd-AO utilized 70mm film stock.
                                By the late 1950s, these innovations effectively changed the shape of the cinema screen, with aspect ratios of 2.35:1 or 1.66:1 becoming the standard.
                                Stereo sound, which had been experimented with in the 1940s, also became part of the new widescreen experience.
                                Specialized large-format systems utilizing 70mm film were also developed.
                                The most successful of these is IMAX, which as of 2020 has over 1500 screens worldwide.
                                For many years, IMAX cinemas primarily screened specially made films in unique 2D or 3D formats, but recently they have shown popular mainstream movies digitally remastered in the IMAX format, often with additional scenes or 3D effects.

                                <h2 style={subtitleStyle}>What's next?</h2>
                                Over the past 20 years, film production has been profoundly transformed by rapidly advancing digital technology.
                                Most mainstream productions are now shot in digital formats, and subsequent processes such as editing and special effects are conducted on computers.
                                Cinemas have invested in digital projection equipment capable of delivering images on the screen that can rival the sharpness, detail, and brightness of traditional film projection.
                                Only a few more specialized cinemas have retained film projection equipment.
                                In recent years, there has been a resurgence of interest in 3D features, driven by the availability of digital technology.
                                Whether this will be more than a short-term phenomenon (like previous attempts at 3D in the 1950s and 1980s) remains to be seen, although the trend toward 3D production has brought greater investments and industry engagement than before.
                            </div>
                        </div>
                    </section>
                    <Aside />
                </main>
                <Footer />
            </div >
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
    textAlign: 'center'

};

const title: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '2em',
    color: '#000'
};

const textContainer: CSSProperties = {
    color: '#000',
    fontFamily: 'sans-serif',
    fontSize: '1em',
    textAlign: 'justify'

};

const subtitleStyle: CSSProperties = {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
}