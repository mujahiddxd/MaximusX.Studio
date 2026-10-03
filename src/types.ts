export interface Profile {
    name: string;
    firstName: string;
    role: string;
    headline: string;
    bio: string;
    avatar: string;
    available: boolean;
    availability: string;
    location: string;
    email: string;
    phone: string;
    whatsapp: string;
    xUrl: string;
    demo: boolean;
}
export interface Project {
    id: string;
    kind: 'short' | 'long';
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    duration: string;
    videoUrl: string;
    context: string;
    visible: boolean;
}
export interface Creator {
    id: string;
    name: string;
    detail: string;
    avatar: string;
    url: string;
    visible: boolean;
}
export interface Context {
    id: string;
    name: string;
    description: string;
}
export interface Content {
    profile: Profile;
    sections: {
        shortTitle: string;
        shortDescription: string;
        creatorsTitle: string;
        creatorsDescription: string;
        longTitle: string;
        longDescription: string;
        contactTitle: string;
        contactDescription: string;
    };
    contexts: Context[];
    projects: Project[];
    creators: Creator[];
}
export interface Draft {
    content: Content;
    revision: number;
    publishedAt: string | null;
}
export interface AuthStatus {
    authenticated: boolean;
    needsSetup: boolean;
    canSetup: boolean;
}
