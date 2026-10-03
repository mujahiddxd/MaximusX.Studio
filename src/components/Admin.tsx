import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { api } from '../api';
import type { AuthStatus, Content, Creator, Draft, Profile, Project } from '../types';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import { Modal } from './Modal';
const tabs: {
    id: string;
    label: string;
    icon: IconName;
    description: string;
}[] = [
    { id: 'profile', label: 'Profile & contact', icon: 'users', description: 'The introduction to you and your work.' },
    { id: 'shorts', label: 'Short videos', icon: 'film', description: 'The stories that stop the scroll.' },
    { id: 'longs', label: 'Long videos', icon: 'play', description: 'Give the bigger stories room to breathe.' },
    { id: 'creators', label: 'Clients & creators', icon: 'users', description: 'The people you create with.' },
    { id: 'contexts', label: 'Creative contexts', icon: 'grid', description: 'Organize your work by creative discipline.' },
    { id: 'settings', label: 'Page copy', icon: 'settings', description: 'Make every heading sound like you.' },
];
function Field({ label, value, onChange, multiline = false, hint, type = 'text', required = false, maxLength = 240 }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    hint?: string;
    type?: string;
    required?: boolean;
    maxLength?: number;
}) {
    return <label className="field"><span>{label}{required && <span className="required"> *</span>}</span>{multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} maxLength={maxLength} required={required}/> : <input type={type} value={value} onChange={e => onChange(e.target.value)} maxLength={maxLength} required={required}/>}{hint && <small>{hint}</small>}</label>;
}
function Toggle({ label, checked, onChange }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return <label className="toggle-field"><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}/><span className="toggle-track"/><span>{label}</span></label>;
}
function ImageField({ label, value, onChange, setUploading }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
    setUploading: (delta: number) => void;
}) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    async function upload(file?: File) {
        if (!file)
            return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
            setError('Choose a JPG, PNG, or WebP under 5 MB.');
            return;
        }
        setBusy(true);
        setUploading(1);
        setError('');
        try {
            const result = await api<{
                url: string;
            }>('/api/admin/upload', { method: 'POST', body: file, headers: { 'Content-Type': file.type } });
            onChange(result.url);
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
            setUploading(-1);
        }
    }
    return <div className="image-field"><div className="image-preview">{value ? <img src={value} alt={`${label} preview`}/> : <Icon name="film" size={28}/>}</div><div><Field label={label} value={value} onChange={onChange} maxLength={2000} hint="HTTPS image URL, or upload a file below."/><label className={`button secondary upload-button ${busy ? 'disabled' : ''}`}><Icon name="upload" size={16}/>{busy ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }}/></label>{error && <p className="field-error" role="alert">{error}</p>}</div></div>;
}
function Panel({ title, note, children }: {
    title: string;
    note?: string;
    children: ReactNode;
}) {
    return <section className="editor-panel"><div className="panel-heading"><h2>{title}</h2>{note && <p>{note}</p>}</div>{children}</section>;
}
function AuthForm({ status, onSuccess }: {
    status: AuthStatus;
    onSuccess: () => void;
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    async function submit(e: FormEvent) {
        e.preventDefault();
        setError('');
        if (status.needsSetup && password !== confirmation) {
            setError('The passwords do not match.');
            return;
        }
        setBusy(true);
        try {
            await api(`/api/auth/${status.needsSetup ? 'setup' : 'login'}`, { method: 'POST', body: JSON.stringify({ username, password }) });
            onSuccess();
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    return <div className="auth-page"><a className="wordmark" href="/">MaximusX.<span className="studio-label">THE STUDIO</span></a><div className="auth-card"><span className="auth-icon"><Icon name="lock" size={24}/></span><span className="eyebrow">YOUR CREATIVE CONTROL ROOM</span><h1>{status.needsSetup ? 'Make yourself at home.' : 'Welcome back.'}</h1><p>{status.needsSetup ? 'Choose your studio login. Your portfolio and edits are saved right here.' : 'A little fine-tuning. A new story. It starts here.'}</p>{status.needsSetup && !status.canSetup ? <div className="notice error">Open this page on localhost to create the administrator before deploying the site.</div> : <form onSubmit={submit}><fieldset disabled={busy}><label className="field"><span>Admin ID</span><input autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} minLength={3} maxLength={80} pattern="[a-zA-Z0-9_.@\-]+" required placeholder="Your studio ID"/></label><label className="field"><span>Password</span><input type="password" autoComplete={status.needsSetup ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} minLength={12} maxLength={200} required placeholder="At least 12 characters"/></label>{status.needsSetup && <label className="field"><span>Confirm password</span><input type="password" autoComplete="new-password" value={confirmation} onChange={e => setConfirmation(e.target.value)} minLength={12} maxLength={200} required placeholder="One more time"/></label>}{error && <p className="notice error" role="alert">{error}</p>}<button className="button primary auth-submit" type="submit">{busy ? 'One moment…' : status.needsSetup ? 'Create studio login' : 'Enter the studio'}<Icon name="arrow" size={18}/></button></fieldset></form>}<a className="auth-back" href="/">← Back to the portfolio</a></div><p className="auth-bottom">A space to shape your next chapter.</p></div>;
}
export default function Admin() {
    const [status, setStatus] = useState<AuthStatus | null>(null);
    const [draft, setDraft] = useState<Draft | null>(null);
    const [saved, setSaved] = useState('');
    const [tab, setTab] = useState('profile');
    const [busy, setBusy] = useState(false);
    const [uploads, setUploads] = useState(0);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [confirm, setConfirm] = useState<{
        title: string;
        text: string;
        action: () => void;
    } | null>(null);
    const dirty = !!draft && JSON.stringify(draft.content) !== saved;
    const locked = busy || uploads > 0;
    async function load() {
        try {
            const auth = await api<AuthStatus>('/api/auth/status');
            setStatus(auth);
            setError('');
            if (auth.authenticated) {
                const data = await api<Draft>('/api/admin/content');
                setDraft(data);
                setSaved(JSON.stringify(data.content));
            }
        }
        catch (e) {
            setError((e as Error).message);
        }
    }
    useEffect(() => {
        document.title = 'Studio admin — MaximusX';
        let cancelled = false;
        api<AuthStatus>('/api/auth/status').then(async (auth) => {
            if (cancelled)
                return;
            setStatus(auth);
            if (auth.authenticated) {
                const data = await api<Draft>('/api/admin/content');
                if (!cancelled) {
                    setDraft(data);
                    setSaved(JSON.stringify(data.content));
                }
            }
        }).catch(e => { if (!cancelled)
            setError((e as Error).message); });
        return () => { cancelled = true; };
    }, []);
    useEffect(() => {
        const warn = (e: BeforeUnloadEvent) => { if (dirty) {
            e.preventDefault();
            e.returnValue = '';
        } };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);
    const update = (change: (content: Content) => Content) => { setDraft(d => d ? { ...d, content: change(d.content) } : d); setMessage(''); };
    const updateProfile = <K extends keyof Profile>(key: K, value: Profile[K]) => update(c => ({ ...c, profile: { ...c.profile, [key]: value } }));
    const updateProject = (id: string, patch: Partial<Project>) => update(c => ({ ...c, projects: c.projects.map(p => p.id === id ? { ...p, ...patch } : p) }));
    const updateCreator = (id: string, patch: Partial<Creator>) => update(c => ({ ...c, creators: c.creators.map(p => p.id === id ? { ...p, ...patch } : p) }));
    const setUploading = (delta: number) => setUploads(n => n + delta);
    async function save(publish: boolean) {
        if (!draft || locked)
            return;
        setBusy(true);
        setError('');
        setMessage('');
        try {
            const result = await api<{
                revision: number;
                publishedAt: string | null;
            }>(publish ? '/api/admin/publish' : '/api/admin/content', { method: 'PUT', body: JSON.stringify({ content: draft.content, revision: draft.revision }) });
            setDraft({ ...draft, ...result });
            setSaved(JSON.stringify(draft.content));
            setMessage(publish ? 'Your portfolio is live with the latest changes.' : 'Draft saved. The live portfolio is unchanged.');
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    async function logout() {
        try {
            await api('/api/auth/logout', { method: 'POST' });
            setStatus({ authenticated: false, needsSetup: false, canSetup: false });
            setDraft(null);
            setMessage('');
            setError('');
        }
        catch (e) {
            setError((e as Error).message);
        }
    }
    function move(collection: 'projects' | 'creators', id: string, direction: number, kind?: string) {
        update(c => {
            const list = [...c[collection]];
            const filtered = list.filter(item => !kind || ('kind' in item && item.kind === kind));
            const position = filtered.findIndex(item => item.id === id);
            const other = filtered[position + direction];
            if (!other)
                return c;
            const from = list.findIndex(item => item.id === id), to = list.findIndex(item => item.id === other.id);
            [list[from], list[to]] = [list[to], list[from]];
            return { ...c, [collection]: list } as Content;
        });
    }
    if (!status || (status.authenticated && !draft))
        return <div className="page-state"><span className="wordmark">MaximusX.</span>{error ? <><p role="alert">{error}</p><button className="button primary" onClick={() => void load()}>Try again</button></> : <p role="status">Opening the studio…</p>}</div>;
    if (!status.authenticated)
        return <AuthForm status={status} onSuccess={() => void load()}/>;
    if (!draft)
        return null;
    const { content } = draft;
    const selectedTab = tabs.find(t => t.id === tab)!;
    const kind = tab === 'shorts' ? 'short' : 'long';
    const visibleProjects = content.projects.filter(p => p.kind === kind);
    return <div className="admin-layout"><aside className="admin-sidebar"><a href="/" className="wordmark">MaximusX.<span className="studio-label">STUDIO MANAGER</span></a><span className="sidebar-caption">YOUR PORTFOLIO</span><nav aria-label="Admin sections">{tabs.map(t => <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => { setTab(t.id); setMessage(''); }}><Icon name={t.icon} size={18}/>{t.label}{['shorts', 'longs', 'creators'].includes(t.id) && <span className="nav-count">{t.id === 'creators' ? content.creators.length : content.projects.filter(p => p.kind === (t.id === 'shorts' ? 'short' : 'long')).length}</span>}</button>)}</nav><div className="sidebar-bottom"><span><span className="status-dot"/> Your studio, your story.</span><button onClick={() => dirty ? setConfirm({ title: 'Leave without saving?', text: 'Your unsaved edits will be lost. Saved drafts will stay in the studio.', action: () => void logout() }) : void logout()}><Icon name="logout" size={17}/> Sign out</button></div></aside>
    <div className="admin-main"><header className="admin-topbar"><span><span className={`status-dot ${dirty ? 'unsaved' : ''}`}/>{uploads ? 'Uploading image…' : dirty ? 'Unsaved changes' : 'All changes saved'}</span><div><a href="/?preview=1" target="_blank" rel="noreferrer" className="button secondary" title="Previews the last saved draft"><Icon name="eye" size={16}/> Preview draft</a><button className="button secondary" disabled={locked || !dirty} onClick={() => void save(false)}>Save draft</button><button className="button primary" disabled={locked} onClick={() => void save(true)}>{busy ? 'Saving…' : 'Publish changes'}<Icon name="arrow" size={16}/></button></div></header>
      <div className="admin-content"><div className="admin-page-heading"><div><span className="eyebrow">THE STUDIO / {String(tabs.indexOf(selectedTab) + 1).padStart(2, '0')}</span><h1>{selectedTab.label}</h1><p>{selectedTab.description}</p></div><a href="/" target="_blank" rel="noreferrer" className="text-link">View live site <Icon name="arrow" size={16}/></a></div>
        {error && <div className="notice error" role="alert">{error}<button className="text-link" onClick={() => setConfirm({ title: 'Reload saved content?', text: 'Unsaved edits in this tab will be discarded.', action: () => void load() })}>Reload saved version</button></div>}{message && <div className="notice success" role="status"><Icon name="check" size={18}/>{message}</div>}
        <fieldset className="editor-fields" disabled={busy}>
        {tab === 'profile' && <><Panel title="A proper introduction" note="Give visitors a feel for the person behind the work."><div className="form-grid"><Field label="Studio name" value={content.profile.name} onChange={v => updateProfile('name', v)} required/><Field label="Your first name" value={content.profile.firstName} onChange={v => updateProfile('firstName', v)} required/><div className="span-two"><Field label="Role / introduction" value={content.profile.role} onChange={v => updateProfile('role', v)} required/></div><div className="span-two"><Field label="Main headline" value={content.profile.headline} onChange={v => updateProfile('headline', v)} multiline required hint="Use a line break to shape the headline."/></div><div className="span-two"><Field label="Biography" value={content.profile.bio} onChange={v => updateProfile('bio', v)} multiline maxLength={2400}/></div></div><ImageField label="Profile image" value={content.profile.avatar} onChange={v => updateProfile('avatar', v)} setUploading={setUploading}/></Panel><Panel title="Availability & location"><div className="form-grid"><Field label="Availability message" value={content.profile.availability} onChange={v => updateProfile('availability', v)} required/><Field label="Location" value={content.profile.location} onChange={v => updateProfile('location', v)} required/></div><Toggle label="Available for new projects" checked={content.profile.available} onChange={v => updateProfile('available', v)}/></Panel><Panel title="Let’s keep in touch" note="Empty contact fields are hidden from the public site."><div className="form-grid"><Field label="Email address" value={content.profile.email} onChange={v => updateProfile('email', v)} type="email" maxLength={254}/><Field label="Phone number" value={content.profile.phone} onChange={v => updateProfile('phone', v)} type="tel" maxLength={30}/><Field label="WhatsApp number" value={content.profile.whatsapp} onChange={v => updateProfile('whatsapp', v)} hint="Include country code, e.g. +919876543210." maxLength={20}/><Field label="X profile URL" value={content.profile.xUrl} onChange={v => updateProfile('xUrl', v)} type="url" maxLength={2000}/></div></Panel><Panel title="Sample content labels" note="Keep this on until you have replaced the example work and client profiles with your own."><Toggle label="Show sample content labels" checked={content.profile.demo} onChange={v => updateProfile('demo', v)}/></Panel></>}
        {['shorts', 'longs'].includes(tab) && <><div className="collection-toolbar"><span>{visibleProjects.length} {kind === 'short' ? 'short-form' : 'long-form'} projects</span><button className="button secondary" onClick={() => update(c => ({ ...c, projects: [...c.projects, { id: crypto.randomUUID(), kind, title: 'Untitled project', description: '', category: '', thumbnail: '', duration: '', videoUrl: '', context: c.contexts[0].id, visible: false }] }))}><Icon name="plus" size={17}/> Add video</button></div>{visibleProjects.map((project, index) => <section className="editor-panel project-editor" key={project.id}><div className="item-heading"><span className="item-number">{String(index + 1).padStart(2, '0')}</span><h2>{project.title.replace(/\n/g, ' ')}</h2><div className="item-tools"><button className="icon-button" aria-label={`Move ${project.title} up`} disabled={index === 0} onClick={() => move('projects', project.id, -1, kind)}><Icon name="up" size={18}/></button><button className="icon-button" aria-label={`Move ${project.title} down`} disabled={index === visibleProjects.length - 1} onClick={() => move('projects', project.id, 1, kind)}><Icon name="down" size={18}/></button><button className="icon-button danger" aria-label={`Delete ${project.title}`} onClick={() => setConfirm({ title: 'Remove this project?', text: 'It will be removed from this draft. Publish to update the live portfolio.', action: () => update(c => ({ ...c, projects: c.projects.filter(p => p.id !== project.id) })) })}><Icon name="trash" size={17}/></button></div></div><ImageField label="Thumbnail" value={project.thumbnail} onChange={v => updateProject(project.id, { thumbnail: v })} setUploading={setUploading}/><div className="form-grid"><Field label="Project title" multiline value={project.title} onChange={v => updateProject(project.id, { title: v })} maxLength={160} required/><Field label="Category" value={project.category} onChange={v => updateProject(project.id, { category: v })} maxLength={100}/><div className="span-two"><Field label="Description" value={project.description} onChange={v => updateProject(project.id, { description: v })} multiline maxLength={2400}/></div><div className="span-two"><Field label="Video URL" value={project.videoUrl} onChange={v => updateProject(project.id, { videoUrl: v })} type="url" maxLength={2000} hint="YouTube, Vimeo, or a direct HTTPS MP4/WebM link. Leave empty for a project preview."/></div><Field label="Duration" value={project.duration} onChange={v => updateProject(project.id, { duration: v })} maxLength={20} hint="For example, 00:45 or 12:08."/><label className="field"><span>Creative context</span><select value={project.context} onChange={e => updateProject(project.id, { context: e.target.value })}>{content.contexts.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}</select></label></div><Toggle label="Visible on the portfolio" checked={project.visible} onChange={v => updateProject(project.id, { visible: v })}/></section>)}{!visibleProjects.length && <div className="editor-empty"><Icon name="film" size={36}/><h2>Start with a story.</h2><p>Add your first video to this collection.</p></div>}</>}
        {tab === 'creators' && <><div className="collection-toolbar"><span>{content.creators.length} client profiles</span><button className="button secondary" onClick={() => update(c => ({ ...c, creators: [...c.creators, { id: crypto.randomUUID(), name: 'New creator', detail: '', avatar: '', url: '', visible: false }] }))}><Icon name="plus" size={17}/> Add creator</button></div>{content.creators.map((creator, index) => <section className="editor-panel" key={creator.id}><div className="item-heading"><h2>{creator.name}</h2><div className="item-tools"><button className="icon-button" aria-label={`Move ${creator.name} up`} disabled={index === 0} onClick={() => move('creators', creator.id, -1)}><Icon name="up"/></button><button className="icon-button" aria-label={`Move ${creator.name} down`} disabled={index === content.creators.length - 1} onClick={() => move('creators', creator.id, 1)}><Icon name="down"/></button><button className="icon-button danger" aria-label={`Delete ${creator.name}`} onClick={() => setConfirm({ title: 'Remove this creator?', text: 'This profile will be removed from the draft.', action: () => update(c => ({ ...c, creators: c.creators.filter(p => p.id !== creator.id) })) })}><Icon name="trash" size={17}/></button></div></div><ImageField label="Creator image" value={creator.avatar} onChange={v => updateCreator(creator.id, { avatar: v })} setUploading={setUploading}/><div className="form-grid"><Field label="Creator / brand name" value={creator.name} onChange={v => updateCreator(creator.id, { name: v })} required maxLength={100}/><Field label="Short detail" value={creator.detail} onChange={v => updateCreator(creator.id, { detail: v })} maxLength={120}/><div className="span-two"><Field label="Profile URL" value={creator.url} onChange={v => updateCreator(creator.id, { url: v })} type="url" maxLength={2000}/></div></div><Toggle label="Visible on the portfolio" checked={creator.visible} onChange={v => updateCreator(creator.id, { visible: v })}/></section>)}</>}
        {tab === 'contexts' && <><div className="collection-toolbar"><span>Available in the bottom navigation switcher</span><button className="button secondary" disabled={content.contexts.length >= 12} onClick={() => update(c => ({ ...c, contexts: [...c.contexts, { id: crypto.randomUUID(), name: 'New discipline', description: '' }] }))}><Icon name="plus" size={17}/> Add context</button></div>{content.contexts.map(context => <Panel key={context.id} title={context.name}><div className="form-grid"><Field label="Context name" value={context.name} onChange={v => update(c => ({ ...c, contexts: c.contexts.map(x => x.id === context.id ? { ...x, name: v } : x) }))} required maxLength={60}/><Field label="Short description" value={context.description} onChange={v => update(c => ({ ...c, contexts: c.contexts.map(x => x.id === context.id ? { ...x, description: v } : x) }))} maxLength={160}/></div><div className="context-admin-footer"><span>{content.projects.filter(p => p.context === context.id).length} projects</span><button className="text-link danger" disabled={content.contexts.length === 1 || content.projects.some(p => p.context === context.id)} onClick={() => setConfirm({ title: 'Remove this context?', text: 'It will no longer appear in the context switcher after publishing.', action: () => update(c => ({ ...c, contexts: c.contexts.filter(x => x.id !== context.id) })) })}>Remove context</button></div><p className="help-text">Move or remove its projects before deleting a context. Keep at least one context.</p></Panel>)}</>}
        {tab === 'settings' && <>{([{ title: 'Short-form section', keys: ['shortTitle', 'shortDescription'] }, { title: 'Creators section', keys: ['creatorsTitle', 'creatorsDescription'] }, { title: 'Long-form section', keys: ['longTitle', 'longDescription'] }, { title: 'Contact section', keys: ['contactTitle', 'contactDescription'] }] as {
        title: string;
        keys: (keyof Content['sections'])[];
    }[]).map(group => <Panel key={group.title} title={group.title}>{group.keys.map((key, index) => <Field key={key} label={index ? 'Description' : 'Heading'} value={content.sections[key]} onChange={v => update(c => ({ ...c, sections: { ...c.sections, [key]: v } }))} multiline required maxLength={600}/>)}</Panel>)}</>}
        </fieldset><div className="admin-footnote"><Icon name="check" size={15}/>{draft.publishedAt ? `Last published ${new Date(draft.publishedAt).toLocaleString()}` : 'Ready when you are. Publish to share your changes.'}</div>
      </div>
    </div>
    {confirm && <Modal title={confirm.title} onClose={() => setConfirm(null)}><p>{confirm.text}</p><div className="modal-actions"><button className="button secondary" onClick={() => setConfirm(null)}>Cancel</button><button className="button danger-button" onClick={() => { confirm.action(); setConfirm(null); }}>Confirm</button></div></Modal>}
  </div>;
}
