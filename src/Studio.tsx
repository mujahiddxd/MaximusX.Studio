import { useEffect, useState } from 'react';
import { api } from './api';
import type { Content, Draft } from './types';
import Portfolio from './components/Portfolio';
import Admin from './components/Admin';
export default function Studio() {
    const isAdmin = ['/chudaan', '/admin'].includes(window.location.pathname.replace(/\/$/, ''));
    const preview = new URLSearchParams(window.location.search).has('preview');
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        if (isAdmin)
            return;
        let cancelled = false;
        const load = preview ? api<Draft>('/api/admin/content').then(d => d.content) : api<Content>('/api/content');
        load.then(c => { if (!cancelled) {
            setContent(c);
            setError('');
        } }).catch(e => { if (!cancelled)
            setError(e.message); });
        return () => { cancelled = true; };
    }, [isAdmin, preview, attempt]);
    if (isAdmin)
        return <Admin />;
    if (error)
        return <div className="page-state"><span className="wordmark">MaximusX.</span><h1>{preview ? 'Sign in to preview your draft.' : 'The studio is taking a moment.'}</h1><p>{error}</p>{preview ? <a href="/chudaan" className="button primary">Open admin</a> : <button className="button primary" onClick={() => setAttempt(a => a + 1)}>Try again</button>}</div>;
    if (!content)
        return <div className="page-state" role="status"><span className="wordmark">MaximusX.</span><span className="loading-line"/><p>Setting the scene…</p></div>;
    return <Portfolio content={content} preview={preview}/>;
}
