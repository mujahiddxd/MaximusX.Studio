import { useState } from 'react';
import type { Content } from '../types';
import { Icon } from './Icon';
import './creators.css';

export function Creators({ content }: { content: Content }) {
    const [selected, setSelected] = useState('All');
    const creators = content.creators.filter(creator => creator.visible);
    const categories = [...new Set(creators.map(creator => creator.detail.trim()).filter(Boolean))];
    const active = categories.includes(selected) ? selected : 'All';
    const shown = creators.filter(creator => active === 'All' || creator.detail.trim() === active);

    return <section id="creators" className="creators-section creators-directory">
        <div className="creators-intro">
            <span className="eyebrow">02 / THE PEOPLE BEHIND THE PROJECTS</span>
            <h2>{content.sections.creatorsTitle === 'Good stories take good company.' ? "People I've worked with." : content.sections.creatorsTitle}</h2>
        </div>
        {creators.length > 0 && <div className="creator-filters" role="group" aria-label="Filter collaborators">
            {['All', ...categories].map(category => <button key={category} type="button" aria-pressed={active === category} onClick={() => setSelected(category)}>{category}</button>)}
        </div>}
        <div className="creators-grid">
            {shown.map(creator => {
                const inside = <>
                    <span className="creator-avatar">{creator.avatar ? <img src={creator.avatar} alt="" loading="lazy"/> : creator.name.split(/\s+/).filter(Boolean).map(word => word[0]).slice(0, 2).join('')}</span>
                    <strong>{creator.name}</strong>
                    <span className="creator-detail">{creator.detail}</span>
                    {creator.url && <Icon name="arrow" size={16} className="creator-arrow"/>}
                </>;
                return creator.url ? <a key={creator.id} className="creator-card" href={creator.url} target="_blank" rel="noreferrer">{inside}</a> : <div key={creator.id} className="creator-card">{inside}</div>;
            })}
        </div>
        <p className="creator-result" role="status">{creators.length ? `${shown.length} collaborator${shown.length === 1 ? '' : 's'} shown` : 'Your story could be the next one.'}</p>
        {content.profile.demo && creators.length > 0 && <p className="demo-caption">Illustrative client profiles · actual collaborations coming soon</p>}
    </section>;
}
