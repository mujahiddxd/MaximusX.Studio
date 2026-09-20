import React, { useState, useEffect } from "react";
import avatarImg from "../assets/avatar.jpg";
import short1Thumb from "../assets/short_1.jpg";
import short2Thumb from "../assets/short_2.jpg";
import short3Thumb from "../assets/short_3.jpg";

// ─── Creative Contexts Data Specification ───────────────────────────

export interface ShortItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  aspect: string;
  thumbnailGradient?: string;
  thumbnailImage?: string;
  videoUrl: string;
  duration?: string;
}

export interface LongItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  thumbnailGradient: string;
  videoUrl: string;
}

export interface CreatorItem {
  id: string;
  name: string;
  subs: string;
  color: string;
  initials: string;
  profileUrl: string;
  avatarUrl?: string;
}

export interface ContextData {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  headline: string;
  bio: string;
  stats: { value: string; label: string }[];
  shortSectionTitle: string;
  shortSectionSub: string;
  shorts: ShortItem[];
  creators: CreatorItem[];
  longSectionTitle: string;
  longSectionSub: string;
  longs: LongItem[];
  skills: string[];
}

export const CONTEXTS_DATA: Record<string, ContextData> = {
  "video-editing": {
    slug: "video-editing",
    name: "Video Editing",
    icon: "🎬",
    tagline: "Professional Video Editor & Storyteller",
    headline: "Crafting High-Retention Visual Narratives For Top Creators & Brands",
    bio: "Specializing in cinematic pacing, dynamic retention hooks, and high-end color grading. Turning raw footage into captivating, viral content that commands attention across YouTube, Reels, and Commercials.",
    stats: [
      { value: "120+", label: "Projects Completed" },
      { value: "25+", label: "Global Clients" },
      { value: "3+ Years", label: "Industry Experience" },
      { value: "100M+", label: "Audience Views" },
    ],
    shortSectionTitle: "Featured Video Showcase",
    shortSectionSub: "Short-form velocity reels, commercial reveals, and high-retention social content.",
    shorts: [
      {
        id: "s1",
        title: "Fast-Paced Travel Velocity",
        desc: "Seamless speed ramping and rhythm-cut sound design tailored for ultra-high engagement.",
        tag: "Velocity Reel",
        aspect: "9:16",
        thumbnailImage: short1Thumb,
        thumbnailGradient: "linear-gradient(135deg, #2b1406 0%, #000000 100%)",
        videoUrl: "https://www.youtube.com/shorts",
        duration: "0:45",
      },
      {
        id: "s2",
        title: "Product Launch Hook",
        desc: "30-second studio reveal optimized for first-3-second retention and brand conversion.",
        tag: "Commercial",
        aspect: "9:16",
        thumbnailImage: short2Thumb,
        thumbnailGradient: "linear-gradient(135deg, #3d1b09 0%, #101920 100%)",
        videoUrl: "https://www.youtube.com/shorts",
        duration: "0:30",
      },
      {
        id: "s3",
        title: "Music Video FX Breakdown",
        desc: "Beat-synchronized transitions, optical glow overlays, and kinetic text integration.",
        tag: "Music Video",
        aspect: "9:16",
        thumbnailImage: short3Thumb,
        thumbnailGradient: "linear-gradient(135deg, #1f3442 0%, #000000 100%)",
        videoUrl: "https://www.youtube.com/shorts",
        duration: "0:55",
      },
    ],
    creators: [
      { id: "c1", name: "Jesser", subs: "18 Million", color: "#3B82F6", initials: "JS", profileUrl: "https://youtube.com/@Jesser" },
      { id: "c2", name: "SypherPK", subs: "7 Million", color: "#EF4444", initials: "SP", profileUrl: "https://youtube.com/@SypherPK" },
      { id: "c3", name: "Socksfor1", subs: "6 Million", color: "#06B6D4", initials: "SF", profileUrl: "https://youtube.com/@Socksfor1" },
      { id: "c4", name: "Beast Reacts", subs: "32 Million", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com/@BeastReacts" },
      { id: "c5", name: "LazarBeam", subs: "21 Million", color: "#F59E0B", initials: "LB", profileUrl: "https://youtube.com/@LazarBeam" },
      { id: "c6", name: "MrBeast", subs: "240 Million", color: "#64748B", initials: "MB", profileUrl: "https://youtube.com/@MrBeast" },
      { id: "c7", name: "Sidemen", subs: "21 Million", color: "#6366F1", initials: "SD", profileUrl: "https://youtube.com/@Sidemen" },
      { id: "c8", name: "Ali-A", subs: "19 Million", color: "#10B981", initials: "AA", profileUrl: "https://youtube.com/@AliA" },
    ],
    longSectionTitle: "Cinematic & Long-Form Productions",
    longSectionSub: "Documentary deep-dives, episodic YouTube series, and premium commercial films.",
    longs: [
      {
        id: "l1",
        title: "Behind The Cut — Feature Documentary",
        desc: "24-minute deep dive into documentary storytelling with multi-cam synchronizations and nuanced grading.",
        tags: ["Documentary", "Long Form", "Color Grade", "4K"],
        thumbnailGradient: "linear-gradient(135deg, #1f3442 0%, #000000 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "l2",
        title: "Creator Series Pilot Episode",
        desc: "18-minute episodic YouTube narrative balancing comedy timing, motion graphics, and sound design.",
        tags: ["YouTube Series", "Pacing", "Sound Design"],
        thumbnailGradient: "linear-gradient(135deg, #381a0b 0%, #101920 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "l3",
        title: "Brand Odyssey Cinematic Film",
        desc: "Atmospheric brand commercial combining dynamic drone perspectives with layered orchestral score.",
        tags: ["Cinematic", "Commercial", "Drone Footage"],
        thumbnailGradient: "linear-gradient(135deg, #253947 0%, #000000 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "Pacing & Retention", "Audio Mastering", "Motion Transitions", "After Effects"],
  },

  "storyboarding": {
    slug: "storyboarding",
    name: "Storyboarding",
    icon: "📋",
    tagline: "Visual Storyboarder & Narrative Designer",
    headline: "Visualizing Scene Dynamics, Camera Flow & Character Blocking",
    bio: "Previsualizing complex sequences for feature films, animated series, and commercial spots. Delivering crystal-clear frame compositions that translate creative vision into actionable production roadmaps.",
    stats: [
      { value: "85+", label: "Boards Produced" },
      { value: "18+", label: "Studio Productions" },
      { value: "3+ Years", label: "Pre-Prod Experience" },
      { value: "100%", label: "On-Time Delivery" },
    ],
    shortSectionTitle: "Storyboard Sequences & Animatics",
    shortSectionSub: "Shot-by-shot frame compositions detailing lighting, camera movement, and pacing.",
    shorts: [
      {
        id: "sb1",
        title: "Action Chase Scene Flow",
        desc: "Sequence breakdown mapping high-speed camera angles and focal perspective transitions.",
        tag: "Action Boards",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #047857 0%, #060e3d 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sb2",
        title: "Emotional Dialogue Beats",
        desc: "Shot composition emphasizing character micro-tensions, eyelines, and intimate focal depths.",
        tag: "Drama",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #4338CA 0%, #0c174f 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sb3",
        title: "Commercial 15s Pitch Arc",
        desc: "Rapid concept panels pitching punchy product features for agency creative directors.",
        tag: "Ad Concept",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #C2410C 0%, #010736 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    creators: [
      { id: "c3", name: "Socksfor1", subs: "Animatics", color: "#3B82F6", initials: "SF", profileUrl: "https://youtube.com" },
      { id: "c1", name: "Jesser", subs: "Skits", color: "#EF4444", initials: "J", profileUrl: "https://youtube.com" },
      { id: "c6", name: "Vox Studios", subs: "Explainers", color: "#10B981", initials: "VX", profileUrl: "https://youtube.com" },
      { id: "c4", name: "Beast Reacts", subs: "Thumbnails", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com" },
    ],
    longSectionTitle: "Full Animatics & Previsualization",
    longSectionSub: "Complete timed animatics and sequence choreography for directors and animation teams.",
    longs: [
      {
        id: "sbl1",
        title: "Sci-Fi Short Film Animatic",
        desc: "12-minute timed animatic with audio guide, lighting callouts, and camera focal notations.",
        tags: ["Animatic", "Director Vision", "Camera Blocking"],
        thumbnailGradient: "linear-gradient(135deg, #1E293B 0%, #060e3d 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sbl2",
        title: "Automotive Commercial Sequence",
        desc: "Frame-by-frame planning highlighting practical crane sweeps and digital environmental blends.",
        tags: ["Commercial", "Pre-Prod", "CG Planning"],
        thumbnailGradient: "linear-gradient(135deg, #374151 0%, #0c174f 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["Storyboarding", "Scene Composition", "Animatics", "Visual Direction", "Character Posing", "Camera Blocking", "Photoshop", "Storyboard Pro"],
  },

  "animation": {
    slug: "animation",
    name: "Animation & VFX",
    icon: "✨",
    tagline: "Motion Designer & 2D Animator",
    headline: "Elevating Content With Seamless Motion Graphics & Visual Effects",
    bio: "Bringing visual identity to life through 2D kinetic typography, animated title sequences, and bespoke visual effects that increase viewer immersion and brand memorability.",
    stats: [
      { value: "65+", label: "Motion Packs" },
      { value: "20+", label: "Brand Identities" },
      { value: "4+ Years", label: "Motion Design" },
      { value: "60 FPS", label: "Fluid Precision" },
    ],
    shortSectionTitle: "Motion FX & Kinetic Highlights",
    shortSectionSub: "Logo morphs, stream packages, and dynamic visual assets.",
    shorts: [
      {
        id: "a1",
        title: "Kinetic Logo Morph",
        desc: "Fluid geometric transition system with secondary elastic dampening and particle physics.",
        tag: "2D Motion",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #6366F1 0%, #060e3d 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "a2",
        title: "Stream Overlay Package",
        desc: "Cyberpunk HUD overlays with reactive audio meters and glowing seamless loopers.",
        tag: "Stream Pack",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #EC4899 0%, #0c174f 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "a3",
        title: "Character Walk-Cycle Loop",
        desc: "Hand-crafted 24fps animation capturing natural weight shifts and secondary hair flow.",
        tag: "Character",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #10B981 0%, #010736 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    creators: [
      { id: "c2", name: "SypherPK", subs: "Intro VFX", color: "#DC2626", initials: "S", profileUrl: "https://youtube.com" },
      { id: "c4", name: "Beast Reacts", subs: "Motion Graphics", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com" },
      { id: "c1", name: "Jesser", subs: "Lower Thirds", color: "#EF4444", initials: "J", profileUrl: "https://youtube.com" },
      { id: "c5", name: "LazarBeam", subs: "Memes & Loops", color: "#F59E0B", initials: "LB", profileUrl: "https://youtube.com" },
    ],
    longSectionTitle: "Full-Length Animated Projects",
    longSectionSub: "Complete animated explainers, channel rebrands, and motion trailers.",
    longs: [
      {
        id: "al1",
        title: "Crypto Platform Product Explainer",
        desc: "Full 3D/2D hybrid explainer breaking down DeFi mechanics with intuitive kinetic visuals.",
        tags: ["Explainer", "FinTech", "Infographic"],
        thumbnailGradient: "linear-gradient(135deg, #059669 0%, #060e3d 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "al2",
        title: "Esports Tournament Intro Sequence",
        desc: "High-octane 3D logo reveal and team matchup sequence featuring volumetric smoke & custom typography.",
        tags: ["Esports", "3D Reveal", "Broadcast"],
        thumbnailGradient: "linear-gradient(135deg, #4F46E5 0%, #0c174f 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["After Effects", "Cinema 4D", "Blender", "Character Animator", "Kinetic Typography", "Rotoscoping", "Particle VFX", "Lottie"],
  },
};

export default function MaximusXPortfolio() {
  const [activeMode, setActiveMode] = useState<string>("video-editing");
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  // Admin state for /chudaan route
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<string>("shorts");

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    }
  };

  const currentContext = CONTEXTS_DATA[activeMode] || CONTEXTS_DATA["video-editing"];

  const handleContextSwitch = (newMode: string) => {
    if (newMode === activeMode) return;
    setIsCrossFading(true);
    setTimeout(() => {
      setActiveMode(newMode);
      setIsCrossFading(false);
    }, 150);
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 16;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId.trim() && adminPassword.trim()) {
      setAdminLoggedIn(true);
    }
  };

  // ─── If on /chudaan: Render Wireframe 2 Admin Panel ─────────────
  if (currentPath.toLowerCase().startsWith("/chudaan")) {
    return (
      <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: 480,
          marginBottom: 20,
          padding: "10px 16px",
          background: "rgba(12, 23, 79, 0.8)",
          border: "1.5px solid var(--border-subtle)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, color: "var(--cream-primary)" }}>
            MaximusX.studio/chudaan
          </span>
          <button
            onClick={() => navigateTo("/")}
            style={{ fontSize: 12, color: "var(--cream-light)", fontWeight: 600 }}
          >
            ← View Portfolio
          </button>
        </div>

        {!adminLoggedIn ? (
          <div style={{
            width: "100%",
            maxWidth: 480,
            background: "var(--bg-surface)",
            border: "2px solid var(--border-active)",
            borderRadius: "16px",
            padding: "40px 32px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)"
          }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: 24,
              fontWeight: 800,
              color: "var(--cream-light)",
              textAlign: "center",
              marginBottom: 28
            }}>
              Enter Credentials:
            </h2>

            <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <input
                  type="text"
                  placeholder="Enter ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    background: "rgba(1, 7, 54, 0.8)",
                    border: "1.5px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 600,
                    outline: "none",
                    textAlign: "center"
                  }}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    background: "rgba(1, 7, 54, 0.8)",
                    border: "1.5px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 600,
                    outline: "none",
                    textAlign: "center"
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 8 }}
              >
                Enter Admin
              </button>
            </form>
          </div>
        ) : (
          <div style={{
            width: "100%",
            maxWidth: 480,
            background: "var(--bg-surface)",
            border: "2px solid var(--cream-primary)",
            borderRadius: "16px",
            padding: "36px 28px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)"
          }}>
            <div style={{
              border: "1.5px solid var(--cream-primary)",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              marginBottom: 24
            }}>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--cream-light)"
              }}>
                Admin Panel
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                onClick={() => setActiveAdminTab("shorts")}
                style={{
                  padding: "18px 16px",
                  background: activeAdminTab === "shorts" ? "var(--cream-primary)" : "rgba(43, 78, 162, 0.2)",
                  border: "1.5px solid var(--border-active)",
                  borderRadius: "8px",
                  color: activeAdminTab === "shorts" ? "#010736" : "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                Edit Short Videos
              </button>

              <button
                onClick={() => setActiveAdminTab("longs")}
                style={{
                  padding: "18px 16px",
                  background: activeAdminTab === "longs" ? "var(--cream-primary)" : "rgba(43, 78, 162, 0.2)",
                  border: "1.5px solid var(--border-active)",
                  borderRadius: "8px",
                  color: activeAdminTab === "longs" ? "#010736" : "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                Edit Long Videos
              </button>

              <button
                onClick={() => setActiveAdminTab("clients")}
                style={{
                  padding: "18px 16px",
                  background: activeAdminTab === "clients" ? "var(--cream-primary)" : "rgba(43, 78, 162, 0.2)",
                  border: "1.5px solid var(--border-active)",
                  borderRadius: "8px",
                  color: activeAdminTab === "clients" ? "#010736" : "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                Client Details
              </button>
            </div>

            <div style={{ marginTop: 28, textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-body)" }}>
                Active: <strong>{activeAdminTab.toUpperCase()}</strong>
              </span>
              <button
                className="btn-secondary"
                style={{ padding: "6px 14px", fontSize: 11 }}
                onClick={() => setAdminLoggedIn(false)}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Public Clean Homepage ────────────────────────────────────────
  return (
    <>
      {/* Sticky Header Navigation */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="brand-dot" />
            MaximusX
          </a>

          <nav className="header-nav-links">
            <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection("showcase"); }}>Showcase</a>
            <a href="#collaborations" onClick={(e) => { e.preventDefault(); scrollToSection("collaborations"); }}>Collaborations</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a>
            <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection("capabilities"); }}>Toolset</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a>
          </nav>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
            className="header-cta-btn"
          >
            Let's Talk →
          </a>
        </div>
      </header>

      <main className="app-container">
        {/* Category Mode Switcher */}
        <div className="filter-strip-wrap">
          <div className="filter-pills" role="tablist">
            {Object.keys(CONTEXTS_DATA).map((key) => {
              const ctx = CONTEXTS_DATA[key];
              const isActive = activeMode === key;
              return (
                <button
                  key={ctx.slug}
                  role="tab"
                  aria-selected={isActive}
                  className={`filter-pill-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleContextSwitch(key)}
                >
                  <span>{ctx.icon}</span>
                  <span>{ctx.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Content */}
        <div className={isCrossFading ? "" : "content-crossfade"}>
          {/* 1. Hero / Profile Section (Minimal, Clean, No Boxed Cards) */}
          <section id="profile" className="profile-hero-minimal">
            <div className="profile-author-header">
              <div className="profile-avatar-clean">
                <img src={avatarImg} alt="MaximusX Studio" className="profile-avatar-img" />
              </div>
              <div className="profile-title-block">
                <h1 className="profile-brand-name">MaximusX Studio</h1>
                <span className="profile-badge-pill">✦ Available for Select Projects</span>
              </div>
            </div>

            <div className="profile-bio-clean">
              <h2 className="profile-greeting">Myself Mizan</h2>
              <p className="profile-tagline-text">
                ✦ {currentContext.tagline}
              </p>
              <p className="profile-headline-text">
                {currentContext.headline}
              </p>
              <p className="profile-body-bio">
                {currentContext.bio}
              </p>

              <div className="profile-actions-inline">
                <button
                  className="btn-primary"
                  onClick={() => scrollToSection("showcase")}
                >
                  Explore Projects ↓
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => scrollToSection("contact")}
                >
                  Let's Talk →
                </button>
              </div>
            </div>
          </section>

          {/* 2. Featured Video Showcase (Alternating Layout, Clean Fluid Rows) */}
          <section id="showcase" className="showcase-minimal-section">
            <div className="plain-section-header">
              <span className="section-label">Selected Works</span>
              <h2 className="section-title">{currentContext.shortSectionTitle}</h2>
              <p className="section-subtitle">{currentContext.shortSectionSub}</p>
            </div>

            <div className="showcase-alternating-wrap">
              {currentContext.shorts.map((item, index) => {
                const isVideoLeft = index % 2 === 1; // 0: text left, video right; 1: video left, text right; 2: text left, video right
                return (
                  <div
                    key={item.id}
                    className={`showcase-flow-row ${isVideoLeft ? "flow-video-left" : "flow-video-right"}`}
                  >
                    {/* Description Block */}
                    <div className="flow-desc-block">
                      <span className="flow-item-tag">0{index + 1} // {item.tag}</span>
                      <h3 className="flow-item-title">{item.title}</h3>
                      <p className="flow-item-text">{item.desc}</p>
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flow-item-cta"
                      >
                        <span>Watch Reel</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>

                    {/* Video Block (Simple YouTube Click-to-Play) */}
                    <div className="flow-video-block">
                      <div
                        className="yt-short-card"
                        onClick={() => window.open(item.videoUrl, "_blank")}
                        role="button"
                        tabIndex={0}
                        aria-label={`Watch ${item.title} on YouTube`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            window.open(item.videoUrl, "_blank");
                          }
                        }}
                      >
                        <img
                          src={item.thumbnailImage || short1Thumb}
                          alt={item.title}
                          className="yt-short-thumb"
                          loading="lazy"
                        />
                        <div className="yt-play-overlay">
                          <div className="yt-play-btn" aria-label="Play on YouTube">
                            <svg viewBox="0 0 68 48" className="yt-play-svg">
                              <path
                                className="yt-play-bg"
                                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                              />
                              <path d="M45 24L27 14v20" fill="#ffffff" />
                            </svg>
                          </div>
                        </div>
                        {item.duration && (
                          <span className="yt-duration-badge">{item.duration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Collaborations & Creators (Clean Squircle App-Icon Grid with 40px Spacing) */}
          <section id="collaborations" className="creators-section-clean">
            <div className="creators-heading-wrap">
              <h2 className="creators-section-title">Creators I've Worked With:</h2>
            </div>

            <div className="creators-squircle-grid">
              {currentContext.creators.map((c) => (
                <a
                  key={c.id}
                  href={c.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-squircle-card"
                  title={`View ${c.name}'s channel`}
                >
                  <div
                    className="creator-squircle-box"
                    style={{
                      background: c.color
                        ? `linear-gradient(145deg, ${c.color}f0 0%, ${c.color}b0 100%)`
                        : "linear-gradient(145deg, #2563EB 0%, #1D4ED8 100%)",
                      boxShadow: c.color ? `0 10px 24px ${c.color}35` : "0 10px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.avatarUrl ? (
                      <img src={c.avatarUrl} alt={c.name} className="creator-squircle-img" />
                    ) : (
                      <span className="creator-placeholder-initials-bold">
                        {c.initials}
                      </span>
                    )}
                  </div>
                  <div className="creator-info-block">
                    <span className="creator-name">{c.name}</span>
                    <span className="creator-subs">{c.subs}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 4. Cinematic Long-Form Productions */}
          <section id="features" className="plain-section">
            <div className="plain-section-header">
              <span className="section-label">Deep Dives</span>
              <h2 className="section-title">{currentContext.longSectionTitle}</h2>
              <p className="section-subtitle">{currentContext.longSectionSub}</p>
            </div>

            <div className="long-form-list">
              {currentContext.longs.map((item) => (
                <div key={item.id} className="long-form-row">
                  <div
                    className="long-video-viewport"
                    style={{ background: item.thumbnailGradient }}
                    onClick={() => window.open(item.videoUrl, "_blank")}
                  >
                    <div className="showcase-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="long-form-info">
                    <h3 className="long-form-title">{item.title}</h3>
                    <p className="long-form-desc">{item.desc}</p>
                    <div className="long-form-tags">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="tag-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Capabilities & Toolset */}
          <section id="capabilities" className="plain-section">
            <div className="plain-section-header">
              <span className="section-label">Expertise</span>
              <h2 className="section-title">Capabilities & Technical Toolset</h2>
              <p className="section-subtitle">
                Mastery of industry-standard editing suites, color science, and dynamic audio workflows.
              </p>
            </div>

            <div className="skills-flex-wrap">
              {currentContext.skills.map((skill, index) => (
                <span key={index} className="skill-tag-item">
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 6. Contact & Inquiry Section */}
          <section id="contact" className="plain-section">
            <div className="plain-section-header">
              <span className="section-label">Let's Connect</span>
              <h2 className="section-title">Ready to Elevate Your Next Project?</h2>
              <p className="section-subtitle">
                Available for select freelance commissions, channel retention overhauls, and commercial productions.
              </p>
            </div>

            <div className="contact-plain-strip">
              <a
                href="https://x.com/maximusx"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <span className="contact-link-label">Twitter / X</span>
                  <span className="contact-link-val">@maximusx → Direct Message</span>
                </div>
              </a>

              <a
                href="mailto:contact@maximusx.studio"
                className="contact-link-item"
              >
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="contact-link-label">Email Direct</span>
                  <span className="contact-link-val">contact@maximusx.studio</span>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="contact-link-item"
              >
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="contact-link-label">Direct Line / WhatsApp</span>
                  <span className="contact-link-val">+91 98765 43210</span>
                </div>
              </a>
            </div>
          </section>
        </div>

        {/* Site Footer */}
        <footer className="site-footer">
          <span className="footer-brand">MAXIMUSX.STUDIO</span>
          <span>© {new Date().getFullYear()} All Rights Reserved. Crafted for High-Retention Impact.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ color: "var(--cream-primary)" }}>
            Back to Top ↑
          </a>
        </footer>
      </main>
    </>
  );
}
