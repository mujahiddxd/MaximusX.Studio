import { useEffect, useState } from 'react';
import type { Content, Project } from '../types';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import { Modal } from './Modal';
import { Creators } from './Creators';
function playerSource(link: string): {
    type: 'iframe' | 'video' | 'external';
    src: string;
} {
    try {
        const url = new URL(link);
        const host = url.hostname.replace(/^www\./, '');
        const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com', 'm.youtube.com'].includes(host) ? url.searchParams.get('v') || url.pathname.split('/')[2] : '';
        if (id && /^[\w-]{11}$/.test(id))
            return { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` };
        if (host === 'vimeo.com' && /^\/\d+$/.test(url.pathname))
            return { type: 'iframe', src: `https://player.vimeo.com/video${url.pathname}?autoplay=1` };
        if (/\.(mp4|webm)$/i.test(url.pathname))
            return { type: 'video', src: link };
    }
    catch { /* Empty and unknown sources have a clear fallback. */ }
    return { type: 'external', src: link };
}
function VideoDialog({ project, onClose }: {
    project: Project;
    onClose: () => void;
}) {
    const source = playerSource(project.videoUrl);
    return <Modal title={project.title.replace(/\n/g, ' ')} onClose={onClose} className={`video-modal ${project.kind}`}>
    {source.type === 'iframe' && <iframe className="video-player" src={source.src} title={project.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/>}
    {source.type === 'video' && <video className="video-player" src={source.src} controls autoPlay playsInline/>}
    {source.type === 'external' && <div className="video-placeholder"><Icon name="film" size={40}/><h3>{source.src ? 'Watch the full project' : 'A glimpse of what’s possible.'}</h3><p>{source.src ? 'This video opens on its original platform.' : 'This is a sample project. The full film will be available once the studio adds a video link.'}</p>{source.src && <a className="button primary" href={source.src} target="_blank" rel="noreferrer">Open video <Icon name="arrow"/></a>}</div>}
    <p className="video-caption">{project.description}</p>
    {source.src && source.type !== 'external' && <a className="text-link" href={project.videoUrl} target="_blank" rel="noreferrer">Having trouble playing? Open original <Icon name="arrow" size={16}/></a>}
  </Modal>;
}
function ProjectMedia({ project, onPlay }: {
    project: Project;
    onPlay: () => void;
}) {
    return <button className={`project-media ${project.kind}-media`} onClick={onPlay} aria-label={`${project.videoUrl ? 'Play' : 'Preview'} ${project.title.replace(/\n/g, ' ')}`}>
    {project.thumbnail ? <img src={project.thumbnail} alt="" loading="lazy" onError={e => { e.currentTarget.style.visibility = 'hidden'; }}/> : <span className="media-fallback"><Icon name="film" size={52}/></span>}
    <span className="media-shade"/><span className="media-format">{project.kind === 'short' ? 'SHORT FILM' : 'FEATURED FILM'}</span>
    <span className="play-circle"><Icon name="play" size={22}/></span>
    <span className="media-bottom"><span>{project.videoUrl ? 'Watch film' : 'Preview project'}</span><span>{project.duration || (project.kind === 'short' ? '9:16' : '16:9')}</span></span>
  </button>;
}
function ContactCard({ name, icon, href, tone }: { name: string; icon: IconName; href: string; tone: string }) {
    const content = <><span className={`contact-card-icon ${tone}`}><Icon name={icon} size={25}/></span><span className="contact-card-bottom"><strong>{name}</strong><span>{href ? <Icon name="arrow" size={18}/> : 'Coming soon'}</span></span></>;
    return href ? <a className="contact-card" href={href} target="_blank" rel="noreferrer" aria-label={`Contact on ${name}`}>{content}</a> : <div className="contact-card unavailable" aria-label={`${name} contact link coming soon`}>{content}</div>;
}
export default function Portfolio({ content, preview = false }: {
    content: Content;
    preview?: boolean;
}) {
    const { profile, sections } = content;
    const [context, setContext] = useState(content.contexts[0]?.id || '');
    const [switcher, setSwitcher] = useState(false);
    const [playing, setPlaying] = useState<Project | null>(null);
    const [activeSection, setActiveSection] = useState('home');
    const current = content.contexts.find(c => c.id === context) || content.contexts[0];
    const projects = content.projects.filter(p => p.context === current?.id && p.visible);
    const shorts = projects.filter(p => p.kind === 'short');
    const longs = projects.filter(p => p.kind === 'long');
    const whatsapp = profile.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` : '';
    const discord = profile.discordUrl || '';
    useEffect(() => {
        document.title = `${profile.name} — Video editor & visual storyteller`;
        const observer = new IntersectionObserver(entries => { for (const entry of entries)
            if (entry.isIntersecting)
                setActiveSection(entry.target.id); }, { rootMargin: '-15% 0px -55% 0px' });
        document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
        const headingObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    headingObserver.unobserve(entry.target);
                }
            }
        }, { threshold: 0.2, rootMargin: '0px 0px -12% 0px' });
        document.querySelectorAll('.section-reveal').forEach(heading => headingObserver.observe(heading));
        return () => {
            observer.disconnect();
            headingObserver.disconnect();
        };
    }, [profile.name, context]);
    return <>
    <a className="skip-link" href="#main">Skip to content</a>
    {preview && <div className="preview-banner"><Icon name="eye" size={16}/> Draft preview — only visible to you <a href="/chudaan">Back to editor <Icon name="arrow" size={14}/></a></div>}
    <header className="site-header"><div className="header-inner"><a className="wordmark" href="#home">{profile.name}<span className="wordmark-dot">.</span><span className="studio-label">EDITING STUDIO</span></a><nav className="desktop-nav" aria-label="Main navigation"><a href="#shorts">Selected work</a><a href="#creators">Collaborations</a><a href="#contact">Let’s talk <Icon name="arrow" size={16}/></a></nav><a className="mobile-contact" href="#contact" aria-label="Get in touch"><Icon name="arrow"/></a></div></header>
    <main id="main" className="portfolio-container">
      <section id="home" className="hero-section"><div className="hero-topline"><span className="eyebrow">INDEPENDENT SPIRIT. INTENTIONAL EDITS.</span><span className={`availability ${profile.available ? '' : 'unavailable'}`}><i />{profile.available ? profile.availability : 'Currently booked'}</span></div>
        <div className="hero-content"><div className="hero-copy"><div className="intro-line"><img src={profile.avatar || '/avatar.jpg'} alt={profile.firstName}/><span>Hello, I’m {profile.firstName}.<span>{profile.role}</span></span></div><h1>{profile.headline}</h1><p className="hero-bio">{profile.bio}</p><div className="hero-actions"><a className="button primary" href="#shorts">Explore my work <Icon name="arrowDown" size={17}/></a><span className="location">{profile.location}</span></div></div><div className="hero-art" aria-label="A selection of portfolio images"><div className="hero-photo hero-photo-back"><img src={shorts[1]?.thumbnail || '/short_2.jpg'} alt=""/></div><div className="hero-photo hero-photo-main"><img src={shorts[0]?.thumbnail || '/short_1.jpg'} alt="Coastal landscape from the selected work"/><span className="hero-photo-note"><Icon name="film" size={16}/> A different point of view.</span></div><span className="art-caption">THE DETAILS MAKE THE DIFFERENCE.</span></div></div>
        <div className="hero-discipline"><div className="hero-discipline-copy"><strong>{current?.name || 'Video editing'}</strong><p>Storytelling · Sound design · Color & rhythm</p></div><a href="#shorts" aria-label="Scroll to selected work"><Icon name="arrowDown" size={22}/></a></div>
      </section>
      <section id="shorts" className="work-section"><div className="section-heading"><div><span className="eyebrow">01 / SHORT-FORM STORIES</span><h2 className="section-reveal">{sections.shortTitle}</h2></div><p>{sections.shortDescription}</p></div>{profile.demo && <div className="sample-note"><span /> A preview of the studio — sample projects & imagery</div>}
        <div className="short-list">{shorts.map((project, index) => <article key={project.id} className={`short-row ${index % 2 ? 'reverse' : ''}`}><div className="project-copy"><span className="project-index">{String(index + 1).padStart(2, '0')}<span />{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags"><span>Vertical story</span>{project.duration && <span>{project.duration}</span>}</div><button className="text-link" onClick={() => setPlaying(project)}>{project.videoUrl ? 'Watch the story' : 'Explore the project'} <Icon name="arrow" size={18}/></button></div><ProjectMedia project={project} onPlay={() => setPlaying(project)}/></article>)}</div>
        {!shorts.length && <div className="empty-collection"><Icon name="film" size={30}/><h3>A new story is taking shape.</h3><p>Selected short-form work will appear here soon.</p></div>}
      </section>
      <Creators content={content}/>
      <section id="films" className="films-section"><div className="section-heading"><div><span className="eyebrow">03 / THE LONGER CUT</span><h2 className="section-reveal">{sections.longTitle}</h2></div><p>{sections.longDescription}</p></div><div className="long-list">{longs.map((project, index) => <article key={project.id} className={`long-row ${index % 2 ? 'reverse' : ''}`}><ProjectMedia project={project} onPlay={() => setPlaying(project)}/><div className="long-copy"><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><button className="text-link" onClick={() => setPlaying(project)}>{project.videoUrl ? 'Watch film' : 'Explore project'} <Icon name="arrow" size={17}/></button></div></article>)}</div>{!longs.length && <div className="empty-collection"><Icon name="film" size={30}/><h3>There’s more to the story.</h3><p>Long-form projects will appear here soon.</p></div>}</section>
      <section id="contact" className="contact-section"><div className="contact-intro"><span className="eyebrow">CONTACT / 04</span><h2>{sections.contactTitle === 'Let’s make something\nworth watching.' ? 'Let’s connect.' : sections.contactTitle}</h2><p>{sections.contactDescription === 'Have a story in mind? Tell me a little about it. I’d love to help bring it to life.' ? 'Have an idea? Let’s talk about it.' : sections.contactDescription}</p></div><div className="contact-card-grid"><ContactCard name="WhatsApp" icon="whatsapp" href={whatsapp} tone="whatsapp"/><ContactCard name="Discord" icon="discord" href={discord} tone="discord"/><ContactCard name="X / Twitter" icon="x" href={profile.xUrl} tone="x"/></div></section>
      <footer className="site-footer"><div className="footer-content"><a className="wordmark" href="#home">{profile.name}.</a><span>© {new Date().getFullYear()} · Made with intention.</span><a href="/chudaan" className="studio-login">Studio access <Icon name="arrow" size={13}/></a></div><div className="footer-watermark" aria-hidden="true">MAXIMUSX</div></footer>
    </main>
    <nav className="bottom-dock" aria-label="Quick navigation"><a href="#home" className={activeSection === 'home' ? 'active' : ''} aria-label="Home"><Icon name="home"/><span>Home</span></a><a href="#shorts" className={activeSection === 'shorts' ? 'active' : ''} aria-label="Short videos"><Icon name="film"/><span>Shorts</span></a><button className="context-trigger" onClick={() => setSwitcher(true)} aria-label={`Switch portfolio context: ${current?.name}`} aria-haspopup="dialog"><Icon name="grid" size={21}/></button><a href="#films" className={activeSection === 'films' ? 'active' : ''} aria-label="Long films"><Icon name="play"/><span>Films</span></a><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} aria-label="Contact"><Icon name="mail"/><span>Contact</span></a></nav>
    {switcher && <Modal title="A different point of view." onClose={() => setSwitcher(false)}><p className="muted">Explore the studio’s creative disciplines.</p><div className="context-options">{content.contexts.map(c => <button key={c.id} className={`context-option ${c.id === current?.id ? 'selected' : ''}`} onClick={() => { setContext(c.id); setSwitcher(false); document.getElementById('shorts')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="context-icon"><Icon name="film"/></span><span><strong>{c.name}</strong><small>{c.description}</small></span>{c.id === current?.id ? <Icon name="check" size={18}/> : <Icon name="arrow" size={18}/>}</button>)}</div></Modal>}
    {playing && <VideoDialog project={playing} onClose={() => setPlaying(null)}/>}
  </>;
}
