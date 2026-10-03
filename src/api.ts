export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(path, { credentials: 'same-origin', ...options, headers: { ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}), ...options.headers } });
    const data = await response.json().catch(() => ({ error: 'The server could not be reached. Start the site with npm run dev.' }));
    if (!response.ok)
        throw new Error(data.error || 'Something went wrong. Please try again.');
    return data as T;
}
