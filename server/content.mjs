const project = (id, kind, title, description, category, thumbnail, duration) => ({
    id, kind, title, description, category, thumbnail, duration, videoUrl: '', context: 'video-editing', visible: true,
});
export const initialContent = {
    profile: {
        name: 'MaximusX', firstName: 'Mizan', role: 'Independent video editor & visual storyteller',
        headline: 'Every frame.\nA little more feeling.',
        bio: 'I turn raw footage into stories worth staying for. Thoughtful edits, a strong sense of rhythm, and the details that make your content feel unmistakably you.',
        avatar: '/avatar.jpg', available: true, availability: 'Available for new projects', location: 'Based in India · Working everywhere',
        email: '', phone: '', whatsapp: '', xUrl: '', demo: true,
    },
    sections: {
        shortTitle: 'Small screen. Big impression.', shortDescription: 'A few seconds to stop the scroll. A story that stays a little longer.',
        creatorsTitle: 'Good stories take good company.', creatorsDescription: 'A space for the creators and brands behind the work.',
        longTitle: 'Room for the whole story.', longDescription: 'Longer films. Deeper narratives. The same attention to every frame.',
        contactTitle: 'Let’s make something\nworth watching.', contactDescription: 'Have a story in mind? Tell me a little about it. I’d love to help bring it to life.',
    },
    contexts: [{ id: 'video-editing', name: 'Video editing', description: 'Stories, shaped in the edit.' }],
    projects: [
        project('short-1', 'short', 'Somewhere,\nbeyond the ordinary.', 'A change of pace. A different perspective. An atmospheric travel edit built around movement, natural sound, and the feeling of getting away.', 'Travel & lifestyle', '/short_1.jpg', '00:45'),
        project('short-2', 'short', 'Made to\nmake an entrance.', 'A product story told through precise cuts, considered sound design, and a little anticipation. Every detail gets its moment.', 'Product & commercial', '/short_2.jpg', '00:30'),
        project('short-3', 'short', 'Feel every\nsingle beat.', 'The energy of a live performance, distilled into a fast-moving visual story. Rhythm-led transitions meet immersive sound.', 'Music & culture', '/short_3.jpg', '00:55'),
        project('long-1', 'long', 'The art of getting lost', 'An unhurried journey through unfamiliar places. An example of cinematic travel storytelling, from the opening frame to the final fade.', 'Travel film', '/short_1.jpg', '08:24'),
        project('long-2', 'long', 'Behind the idea', 'A closer look at the details behind a product. An example of a brand film with a clear narrative and a considered visual language.', 'Brand story', '/short_2.jpg', '04:12'),
        project('long-3', 'long', 'After the lights go down', 'A story about the moments on stage and everything in between. An example of an artist documentary edit.', 'Music documentary', '/short_3.jpg', '12:08'),
    ],
    creators: [
        { id: 'client-1', name: 'North Studio', detail: 'Travel & lifestyle', avatar: '', url: '', visible: true },
        { id: 'client-2', name: 'Aether', detail: 'Product & design', avatar: '', url: '', visible: true },
        { id: 'client-3', name: 'Offbeat', detail: 'Music & culture', avatar: '', url: '', visible: true },
        { id: 'client-4', name: 'Frame Collective', detail: 'Independent creators', avatar: '', url: '', visible: true },
    ],
};
function string(value, label, max = 1000) {
    if (typeof value !== 'string' || value.length > max)
        throw new Error(`${label} must be text under ${max} characters.`);
    return value.trim();
}
function required(value, label, max = 160) {
    const result = string(value, label, max);
    if (!result)
        throw new Error(`${label} is required.`);
    return result;
}
function boolean(value, label) {
    if (typeof value !== 'boolean')
        throw new Error(`${label} must be true or false.`);
    return value;
}
function url(value, label, local = false) {
    const result = string(value, label, 2000);
    if (!result)
        return '';
    if (local && /^\/(?:uploads\/[a-f0-9-]+\.(?:jpg|png|webp)|(?:avatar|short_[123])\.jpg)$/.test(result))
        return result;
    try {
        if (new URL(result).protocol === 'https:')
            return result;
    }
    catch { /* Return a useful validation error below. */ }
    throw new Error(`${label} must be a complete HTTPS URL${local ? ' or an uploaded image' : ''}.`);
}
function collection(value, label, max) {
    if (!Array.isArray(value) || value.length > max)
        throw new Error(`${label} must contain at most ${max} items.`);
    const ids = new Set();
    for (const item of value) {
        if (!item || typeof item !== 'object' || !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) || ids.has(item.id))
            throw new Error(`${label} contains an invalid or duplicate ID.`);
        ids.add(item.id);
    }
    return value;
}
export function validateContent(input) {
    if (!input?.profile || !input.sections)
        throw new Error('Profile and section details are required.');
    const p = input.profile;
    const profile = {};
    for (const key of ['name', 'firstName', 'role', 'headline', 'availability', 'location'])
        profile[key] = required(p[key], key, 240);
    profile.bio = string(p.bio, 'Biography', 2400);
    profile.avatar = url(p.avatar, 'Profile image', true);
    profile.available = boolean(p.available, 'Availability');
    profile.demo = boolean(p.demo, 'Sample content label');
    profile.email = string(p.email, 'Email', 254);
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
        throw new Error('Enter a valid email address.');
    profile.phone = string(p.phone, 'Phone', 30);
    if (profile.phone && !/^\+?[\d ()-]{6,30}$/.test(profile.phone))
        throw new Error('Enter a valid phone number.');
    profile.whatsapp = string(p.whatsapp, 'WhatsApp', 20);
    if (profile.whatsapp && !/^\+?\d{7,15}$/.test(profile.whatsapp))
        throw new Error('WhatsApp needs a country code and 7–15 digits.');
    profile.xUrl = url(p.xUrl, 'X profile');
    const sections = {};
    for (const key of Object.keys(initialContent.sections))
        sections[key] = required(input.sections[key], key, 600);
    const contexts = collection(input.contexts, 'Contexts', 12).map(c => ({ id: c.id, name: required(c.name, 'Context name', 60), description: string(c.description, 'Context description', 160) }));
    if (!contexts.length)
        throw new Error('Keep at least one portfolio context.');
    const projects = collection(input.projects, 'Projects', 100).map(p => {
        if (!['short', 'long'].includes(p.kind) || !contexts.some(c => c.id === p.context))
            throw new Error('Every project needs a valid format and context.');
        return { id: p.id, kind: p.kind, context: p.context, title: required(p.title, 'Project title'), description: string(p.description, 'Project description', 2400), category: string(p.category, 'Category', 100), duration: string(p.duration, 'Duration', 20), thumbnail: url(p.thumbnail, 'Thumbnail', true), videoUrl: url(p.videoUrl, 'Video link'), visible: boolean(p.visible, 'Project visibility') };
    });
    const creators = collection(input.creators, 'Creators', 60).map(c => ({ id: c.id, name: required(c.name, 'Creator name', 100), detail: string(c.detail, 'Creator details', 120), avatar: url(c.avatar, 'Creator photo', true), url: url(c.url, 'Creator link'), visible: boolean(c.visible, 'Creator visibility') }));
    return { profile, sections, contexts, projects, creators };
}
export function publicContent(content) {
    return { ...content, projects: content.projects.filter(p => p.visible), creators: content.creators.filter(c => c.visible) };
}
