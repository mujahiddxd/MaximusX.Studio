import React, { useState, useEffect, useRef } from "react";

// ─── Creative Contexts Data Specification ───────────────────────────

export interface ShortItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  aspect: string;
  thumbnailGradient: string;
  videoUrl: string;
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
  avatarIcon?: string;
  profileUrl: string;
}

export interface ContextData {
  slug: string;
  name: string;
  icon: string;
  bio: string;
  stats: { value: string; label: string }[];
  shortSectionTitle: string;
  shorts: ShortItem[];
  creators: CreatorItem[];
  longSectionTitle: string;
  longs: LongItem[];
  skills: string[];
}

export const CONTEXTS_DATA: Record<string, ContextData> = {
  "video-editing": {
    slug: "video-editing",
    name: "Video Editing",
    icon: "🎬",
    bio: "Cinematic edits, high-retention pacing, and color grading for world-class creators & brands. Turning raw captures into viral narratives.",
    stats: [
      { value: "120+", label: "Projects" },
      { value: "25+", label: "Clients" },
      { value: "3+ Years", label: "Experience" },
    ],
    shortSectionTitle: "SHORT VIDEOS",
    shorts: [
      {
        id: "s1",
        title: "Fast-Paced Travel Velocity",
        desc: "High-energy rhythm cut with seamless speed ramps, punchy sound design, and custom color timing.",
        tag: "VELOCITY REEL",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #1D4ED8 0%, #0F172A 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "s2",
        title: "Product Launch Hook",
        desc: "Punchy 30-second studio reveal designed to maximize first-3-second retention on TikTok and Reels.",
        tag: "COMMERCIAL",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #D97706 0%, #451A03 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "s3",
        title: "Music Video FX Breakdown",
        desc: "Syncopated beat transitions with glow overlays, match cuts, and kinetic typography integration.",
        tag: "MUSIC VIDEO",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #7C3AED 0%, #1E1B4B 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    creators: [
      { id: "c1", name: "Jesser", subs: "5.4M Subs", color: "#EF4444", initials: "J", profileUrl: "https://youtube.com" },
      { id: "c2", name: "SypherPK", subs: "6.8M Subs", color: "#DC2626", initials: "S", profileUrl: "https://youtube.com" },
      { id: "c3", name: "Socksfor1", subs: "5.9M Subs", color: "#3B82F6", initials: "SF", profileUrl: "https://youtube.com" },
      { id: "c4", name: "Beast Reacts", subs: "32M Subs", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com" },
      { id: "c5", name: "LazarBeam", subs: "21M Subs", color: "#F59E0B", initials: "LB", profileUrl: "https://youtube.com" },
      { id: "c6", name: "Ali-A", subs: "18M Subs", color: "#10B981", initials: "AA", profileUrl: "https://youtube.com" },
    ],
    longSectionTitle: "LONG VIDEOS",
    longs: [
      {
        id: "l1",
        title: "Behind The Cut — Feature Documentary",
        desc: "A comprehensive 24-minute deep dive into documentary narrative construction with multi-camera synchronizations.",
        tags: ["DOCUMENTARY", "LONG FORM", "COLOR GRADE", "4K"],
        thumbnailGradient: "linear-gradient(135deg, #0F766E 0%, #042F2E 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "l2",
        title: "Creator Series Pilot Episode",
        desc: "Full 18-minute storytelling arc tailored for episodic YouTube consumption with motion graphic overlays.",
        tags: ["YOUTUBE SERIES", "PACING", "SOUND DESIGN"],
        thumbnailGradient: "linear-gradient(135deg, #BE185D 0%, #4C0519 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "l3",
        title: "Brand Odyssey Cinematic Film",
        desc: "Atmospheric brand commercial combining dynamic drone perspectives with nuanced orchestral score layering.",
        tags: ["CINEMATIC", "COMMERCIAL", "DRONE FOOTAGE"],
        thumbnailGradient: "linear-gradient(135deg, #B45309 0%, #451A03 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "Pacing & Retention", "Audio Mastering", "Motion Transitions"],
  },

  "storyboarding": {
    slug: "storyboarding",
    name: "Storyboarding",
    icon: "📋",
    bio: "Visual narrative previsualization, camera blocking, and scene dynamics for films, animated series, and high-production commercials.",
    stats: [
      { value: "85+", label: "Boards" },
      { value: "18+", label: "Productions" },
      { value: "3+ Years", label: "Experience" },
    ],
    shortSectionTitle: "STORYBOARD PROJECTS",
    shorts: [
      {
        id: "sb1",
        title: "Action Chase Scene Flow",
        desc: "Fast sequence breakdown mapping camera angles and keyframe character perspectives for high-speed chases.",
        tag: "ACTION BOARDS",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #047857 0%, #064E3B 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sb2",
        title: "Emotional Dialogue Beats",
        desc: "Shot composition emphasizing subtle eye lines, claustrophobic focal lengths, and character micro-tensions.",
        tag: "DRAMA",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #4338CA 0%, #1E1B4B 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sb3",
        title: "Commercial 15s Pitch Arc",
        desc: "Rapid conceptual frames communicating product value in a 3-act punch for creative directors.",
        tag: "AD CONCEPT",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #C2410C 0%, #7C2D12 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    creators: [
      { id: "c3", name: "Socksfor1", subs: "Animatics", color: "#3B82F6", initials: "SF", profileUrl: "https://youtube.com" },
      { id: "c1", name: "Jesser", subs: "Skits", color: "#EF4444", initials: "J", profileUrl: "https://youtube.com" },
      { id: "c6", name: "Vox Studios", subs: "Explainer", color: "#10B981", initials: "VX", profileUrl: "https://youtube.com" },
      { id: "c4", name: "Beast Reacts", subs: "Thumbnails", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com" },
    ],
    longSectionTitle: "STORYBOARDING WORK",
    longs: [
      {
        id: "sbl1",
        title: "Sci-Fi Short Film Animatic",
        desc: "Full 12-minute timed animatic with temporary scratch audio, lighting callouts, and camera focal guides.",
        tags: ["ANIMATIC", "DIRECTOR VISION", "CAMERA BLOCKING"],
        thumbnailGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sbl2",
        title: "Automotive Commercial Sequence",
        desc: "Frame-by-frame previsualization highlighting practical crane sweeps and CG environmental transitions.",
        tags: ["COMMERCIAL", "PRE-PROD", "CG PLANNING"],
        thumbnailGradient: "linear-gradient(135deg, #374151 0%, #111827 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "sbl3",
        title: "Fantasy Series Pilot Boards",
        desc: "Complex multi-character combat choreography rendered with expressive gestural depth and perspective.",
        tags: ["EPISODIC", "CHOREOGRAPHY", "PERSPECTIVE"],
        thumbnailGradient: "linear-gradient(135deg, #1F2937 0%, #030712 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["Storyboarding", "Scene Composition", "Animatics", "Visual Direction", "Character Posing", "Camera Blocking", "Photoshop", "Storyboard Pro"],
  },

  "animation": {
    slug: "animation",
    name: "Animation",
    icon: "✨",
    bio: "2D kinetic motion graphics, character animation, and dynamic VFX elements that elevate modern streaming and digital brand presence.",
    stats: [
      { value: "65+", label: "Animations" },
      { value: "20+", label: "Brands" },
      { value: "4+ Years", label: "Experience" },
    ],
    shortSectionTitle: "ANIMATION WORK",
    shorts: [
      {
        id: "a1",
        title: "Kinetic Logo Morph",
        desc: "Fluid geometric transition system with secondary elastic dampening and customized particle physics.",
        tag: "2D MOTION",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #6366F1 0%, #312E81 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "a2",
        title: "Stream Overlay Package",
        desc: "Cyberpunk aesthetic HUD overlays with reactive audio reactive audio meters and glowing loopers.",
        tag: "STREAM PACK",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #EC4899 0%, #831843 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "a3",
        title: "Character Walk-Cycle Loop",
        desc: "Hand-crafted 24fps character loop capturing fluid weight shifts and dynamic secondary hair movement.",
        tag: "CHARACTER",
        aspect: "9:16",
        thumbnailGradient: "linear-gradient(135deg, #10B981 0%, #064E3B 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    creators: [
      { id: "c2", name: "SypherPK", subs: "Intro VFX", color: "#DC2626", initials: "S", profileUrl: "https://youtube.com" },
      { id: "c4", name: "Beast Reacts", subs: "Motion Graphics", color: "#EC4899", initials: "BR", profileUrl: "https://youtube.com" },
      { id: "c1", name: "Jesser", subs: "Lower Thirds", color: "#EF4444", initials: "J", profileUrl: "https://youtube.com" },
      { id: "c5", name: "LazarBeam", subs: "Memes & Loops", color: "#F59E0B", initials: "LB", profileUrl: "https://youtube.com" },
    ],
    longSectionTitle: "ANIMATED PROJECTS",
    longs: [
      {
        id: "al1",
        title: "Explainer Motion Graphic Film",
        desc: "Comprehensive 5-minute vector animation explaining complex decentralized systems through engaging metaphor.",
        tags: ["EXPLAINER", "AFTER EFFECTS", "VECTOR", "KINETIC"],
        thumbnailGradient: "linear-gradient(135deg, #0284C7 0%, #082F49 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "al2",
        title: "Animated Music Video Clip",
        desc: "Full 3-minute cel animation blending frame-by-frame illustration with 3D camera depth parallax.",
        tags: ["CEL ANIMATION", "FRAME BY FRAME", "PARALLAX"],
        thumbnailGradient: "linear-gradient(135deg, #9333EA 0%, #3B0764 100%)",
        videoUrl: "https://youtube.com",
      },
      {
        id: "al3",
        title: "Interactive UI Showcase Loop",
        desc: "Product animation showing future software interfaces with glassmorphic depth and physics-driven micro-interactions.",
        tags: ["UI MOTION", "PROTOTYPE", "3D DEPTH"],
        thumbnailGradient: "linear-gradient(135deg, #D97706 0%, #78350F 100%)",
        videoUrl: "https://youtube.com",
      },
    ],
    skills: ["After Effects", "2D Animation", "Motion Graphics", "Cel Animation", "Character Rigging", "Blender", "Sound FX Sync", "Lottie / Vector"],
  },
};

export default function MaximusXPortfolio() {
  // Navigation & Path state: /chudaan navigates to admin panel
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  const [activeMode, setActiveMode] = useState<string>("video-editing");
  const [activeNav, setActiveNav] = useState<string>("profile");
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Admin state for /chudaan route
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [activeAdminTab, setActiveAdminTab] = useState<string>("shorts");

  // Listen to browser back/forward and path updates
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

  // Context Switcher without page reload or scroll jump
  const handleContextSwitch = (newMode: string) => {
    if (newMode === activeMode) return;
    setIsCrossFading(true);
    setTimeout(() => {
      setActiveMode(newMode);
      setIsCrossFading(false);
    }, 150);
  };

  // IntersectionObserver for Bottom Nav tracking
  useEffect(() => {
    if (currentPath === "/chudaan" || currentPath === "/chudaan/") return;

    const sections = ["profile-section", "shorts-section", "contact-section", "longs-section"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "profile-section") setActiveNav("profile");
            else if (entry.target.id === "shorts-section") setActiveNav("videos");
            else if (entry.target.id === "longs-section") setActiveNav("featured");
            else if (entry.target.id === "contact-section") setActiveNav("contact");
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeMode, currentPath]);

  // Bottom Nav Scroll Handler
  const scrollToSection = (targetId: string, navKey: string) => {
    setActiveNav(navKey);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Worked-with horizontal scroll arrows
  const scrollCreators = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
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
        {/* Top Wireframe URL Bar */}
        <div style={{
          width: "100%",
          maxWidth: 480,
          marginBottom: 20,
          padding: "10px 16px",
          background: "rgba(14, 43, 52, 0.8)",
          border: "1.5px solid var(--border-teal)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, color: "var(--teal-cyan)" }}>
            Maximusx.studio/chudaan
          </span>
          <button
            onClick={() => navigateTo("/")}
            style={{ fontSize: 12, color: "var(--color-gold-light)", fontWeight: 600 }}
          >
            ← View Portfolio
          </button>
        </div>

        {/* Credentials Form Box (Matching Wireframe 2) */}
        {!adminLoggedIn ? (
          <div style={{
            width: "100%",
            maxWidth: 480,
            background: "#0c252d",
            border: "2px solid #15A4BC",
            borderRadius: "var(--radius-md)",
            padding: "40px 32px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)"
          }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: 24,
              fontWeight: 800,
              color: "#F3C766",
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
                    background: "#4A2020",
                    border: "1.5px solid #8B3A3A",
                    borderRadius: "var(--radius-sm)",
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
                    background: "#4A2020",
                    border: "1.5px solid #8B3A3A",
                    borderRadius: "var(--radius-sm)",
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
          /* Admin Panel Options (Matching Wireframe 2) */
          <div style={{
            width: "100%",
            maxWidth: 480,
            background: "#0c252d",
            border: "2px solid #22C55E",
            borderRadius: "var(--radius-md)",
            padding: "36px 28px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)"
          }}>
            <div style={{
              border: "1.5px solid #22C55E",
              borderRadius: "var(--radius-sm)",
              padding: "10px",
              textAlign: "center",
              marginBottom: 24
            }}>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: 26,
                fontWeight: 800,
                color: "#FFFFFF"
              }}>
                Admin Panel
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                onClick={() => setActiveAdminTab("shorts")}
                style={{
                  padding: "20px 16px",
                  background: activeAdminTab === "shorts" ? "#6B2626" : "#4A2020",
                  border: `1.5px solid ${activeAdminTab === "shorts" ? "#D29543" : "#8B3A3A"}`,
                  borderRadius: "var(--radius-sm)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 18,
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
                  padding: "20px 16px",
                  background: activeAdminTab === "longs" ? "#6B2626" : "#4A2020",
                  border: `1.5px solid ${activeAdminTab === "longs" ? "#D29543" : "#8B3A3A"}`,
                  borderRadius: "var(--radius-sm)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 18,
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
                  padding: "20px 16px",
                  background: activeAdminTab === "clients" ? "#6B2626" : "#4A2020",
                  border: `1.5px solid ${activeAdminTab === "clients" ? "#D29543" : "#8B3A3A"}`,
                  borderRadius: "var(--radius-sm)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                Client Details
              </button>
            </div>

            <div style={{ marginTop: 28, textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--teal-cyan)" }}>
                Active Section: <strong>{activeAdminTab.toUpperCase()}</strong>
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

  // ─── Public Portfolio Page (NO visible admin button) ─────────────
  return (
    <div className="app-container">
      {/* 1. Context Switcher Pills */}
      <div className="context-switcher-wrap">
        <div className="context-switcher-pills" role="tablist">
          {Object.keys(CONTEXTS_DATA).map((key) => {
            const ctx = CONTEXTS_DATA[key];
            const isActive = activeMode === key;
            return (
              <button
                key={ctx.slug}
                role="tab"
                aria-selected={isActive}
                className={`context-pill ${isActive ? "active" : ""}`}
                onClick={() => handleContextSwitch(key)}
              >
                <span>{ctx.icon}</span>
                <span>{ctx.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cross-fade Wrapper for Content Swapping */}
      <div className={isCrossFading ? "" : "content-crossfade"}>
        {/* 2. Profile Header (Matching Wireframe: Avatar, MaximusX, Bio, 3 Stats, 2 Buttons) */}
        <header id="profile-section" className="profile-card">
          <div className="profile-card-top">
            <div className="profile-avatar-box">
              <div className="profile-avatar-placeholder">M</div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">MaximusX</h1>
              <span className="profile-handle">@maximusx</span>
            </div>
          </div>

          <div className="profile-bio-box">
            <p className="profile-bio-text">{currentContext.bio}</p>
          </div>

          <div className="profile-stats-row">
            {currentContext.stats.map((st, i) => (
              <div key={i} className="stat-block">
                <span className="stat-value">{st.value}</span>
                <span className="stat-label">{st.label}</span>
              </div>
            ))}
          </div>

          <div className="profile-actions">
            <a
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact-section", "contact");
              }}
              className="btn-primary"
            >
              Contact Me
            </a>
            <a
              href="#shorts-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("shorts-section", "videos");
              }}
              className="btn-secondary"
            >
              View Work ↓
            </a>
          </div>
        </header>

        {/* 3. Section Header + 4. Three Alternating Cards (Short Videos) */}
        <section id="shorts-section" className="section-container">
          <div className="section-heading-bar">
            <h2 className="section-heading-text">{currentContext.shortSectionTitle}</h2>
            <div className="section-heading-line" />
          </div>

          <div className="alternating-shorts-list">
            {/* Short Video 1: Description on LEFT, Video on RIGHT */}
            {currentContext.shorts[0] && (
              <div className="alternating-short-row">
                <div className="short-desc-card slot-text-left">
                  <span className="short-card-number">01 / {currentContext.shorts[0].tag}</span>
                  <h3 className="short-card-title">{currentContext.shorts[0].title}</h3>
                  <p className="short-card-desc">{currentContext.shorts[0].desc}</p>
                </div>
                <div className="slot-media-right">
                  <div
                    className="short-video-frame"
                    style={{ background: currentContext.shorts[0].thumbnailGradient }}
                    onClick={() => window.open(currentContext.shorts[0].videoUrl, "_blank")}
                  >
                    <div className="short-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Short Video 2: Video on LEFT, Description on RIGHT */}
            {currentContext.shorts[1] && (
              <div className="alternating-short-row">
                <div className="slot-media-left">
                  <div
                    className="short-video-frame"
                    style={{ background: currentContext.shorts[1].thumbnailGradient }}
                    onClick={() => window.open(currentContext.shorts[1].videoUrl, "_blank")}
                  >
                    <div className="short-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="short-desc-card slot-text-right">
                  <span className="short-card-number">02 / {currentContext.shorts[1].tag}</span>
                  <h3 className="short-card-title">{currentContext.shorts[1].title}</h3>
                  <p className="short-card-desc">{currentContext.shorts[1].desc}</p>
                </div>
              </div>
            )}

            {/* Short Video 3: Description on LEFT, Video on RIGHT */}
            {currentContext.shorts[2] && (
              <div className="alternating-short-row">
                <div className="short-desc-card slot-text-left">
                  <span className="short-card-number">03 / {currentContext.shorts[2].tag}</span>
                  <h3 className="short-card-title">{currentContext.shorts[2].title}</h3>
                  <p className="short-card-desc">{currentContext.shorts[2].desc}</p>
                </div>
                <div className="slot-media-right">
                  <div
                    className="short-video-frame"
                    style={{ background: currentContext.shorts[2].thumbnailGradient }}
                    onClick={() => window.open(currentContext.shorts[2].videoUrl, "_blank")}
                  >
                    <div className="short-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. Section Header + 6. Horizontal Scrolling Worked-With Strip */}
        <section className="section-container">
          <div className="section-heading-bar">
            <h2 className="section-heading-text">WORKED WITH</h2>
            <div className="section-heading-line" />
          </div>

          <div className="worked-with-box">
            <div className="worked-with-header">
              <span className="worked-with-subtitle">Creators & Channels Collaborated With</span>
              <div className="worked-with-arrows">
                <button
                  className="nav-arrow-btn"
                  onClick={() => scrollCreators("left")}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  className="nav-arrow-btn"
                  onClick={() => scrollCreators("right")}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>

            <div className="creators-scroll-track" ref={scrollRef}>
              {currentContext.creators.map((c) => (
                <a
                  key={c.id}
                  href={c.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="creator-card"
                >
                  <div
                    className="creator-avatar-badge"
                    style={{ background: c.color }}
                  >
                    {c.initials}
                  </div>
                  <span className="creator-name">{c.name}</span>
                  <span className="creator-subs">{c.subs}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Section Header + 8. Three Alternating Preview Cards (Long Videos) */}
        <section id="longs-section" className="section-container">
          <div className="section-heading-bar">
            <h2 className="section-heading-text">{currentContext.longSectionTitle}</h2>
            <div className="section-heading-line" />
          </div>

          <div className="alternating-longs-list">
            {/* Long Video 1: Video on LEFT, Description on RIGHT */}
            {currentContext.longs[0] && (
              <div className="alternating-long-row">
                <div className="slot-media-left">
                  <div
                    className="long-video-frame"
                    style={{ background: currentContext.longs[0].thumbnailGradient }}
                    onClick={() => window.open(currentContext.longs[0].videoUrl, "_blank")}
                  >
                    <div className="long-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="long-desc-card slot-text-right">
                  <h3 className="long-card-title">{currentContext.longs[0].title}</h3>
                  <p className="long-card-desc">{currentContext.longs[0].desc}</p>
                  <div className="long-card-tags">
                    {currentContext.longs[0].tags.map((t, idx) => (
                      <span key={idx} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Long Video 2: Description on LEFT, Video on RIGHT */}
            {currentContext.longs[1] && (
              <div className="alternating-long-row">
                <div className="long-desc-card slot-text-left">
                  <h3 className="long-card-title">{currentContext.longs[1].title}</h3>
                  <p className="long-card-desc">{currentContext.longs[1].desc}</p>
                  <div className="long-card-tags">
                    {currentContext.longs[1].tags.map((t, idx) => (
                      <span key={idx} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="slot-media-right">
                  <div
                    className="long-video-frame"
                    style={{ background: currentContext.longs[1].thumbnailGradient }}
                    onClick={() => window.open(currentContext.longs[1].videoUrl, "_blank")}
                  >
                    <div className="long-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Long Video 3: Video on LEFT, Description on RIGHT */}
            {currentContext.longs[2] && (
              <div className="alternating-long-row">
                <div className="slot-media-left">
                  <div
                    className="long-video-frame"
                    style={{ background: currentContext.longs[2].thumbnailGradient }}
                    onClick={() => window.open(currentContext.longs[2].videoUrl, "_blank")}
                  >
                    <div className="long-video-play-btn" aria-label="Play video">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="long-desc-card slot-text-right">
                  <h3 className="long-card-title">{currentContext.longs[2].title}</h3>
                  <p className="long-card-desc">{currentContext.longs[2].desc}</p>
                  <div className="long-card-tags">
                    {currentContext.longs[2].tags.map((t, idx) => (
                      <span key={idx} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 9. Section Header + SKILLS Pills */}
        <section className="section-container">
          <div className="section-heading-bar">
            <h2 className="section-heading-text">SKILLS</h2>
            <div className="section-heading-line" />
          </div>

          <div className="skills-cloud">
            {currentContext.skills.map((skill, index) => (
              <span key={index} className="skill-pill-item">
                ⚡ {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 10. Section Header + CONTACT (Two cards: X Account & Phone) */}
        <section id="contact-section" className="section-container">
          <div className="section-heading-bar">
            <h2 className="section-heading-text">CONTACT</h2>
            <div className="section-heading-line" />
          </div>

          <div className="contact-cards-grid">
            <a
              href="https://x.com/maximusx"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-card"
            >
              <div className="contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">X Account</span>
                <span className="contact-card-detail">@maximusx → Open X</span>
              </div>
            </a>

            <a
              href="tel:+919876543210"
              className="contact-action-card"
            >
              <div className="contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">Phone Number</span>
                <span className="contact-card-detail">+91 98765 43210 → Call</span>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* 11. Fixed Bottom Navigation with Gold Active Dot */}
      <nav className="floating-bottom-nav" aria-label="Section navigation">
        <button
          className={`nav-pill-btn ${activeNav === "profile" ? "active" : ""}`}
          onClick={() => scrollToSection("profile-section", "profile")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
          <div className="gold-dot" />
        </button>

        <button
          className={`nav-pill-btn ${activeNav === "videos" ? "active" : ""}`}
          onClick={() => scrollToSection("shorts-section", "videos")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
          </svg>
          <span>Videos</span>
          <div className="gold-dot" />
        </button>

        <button
          className={`nav-pill-btn ${activeNav === "featured" ? "active" : ""}`}
          onClick={() => scrollToSection("longs-section", "featured")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>Featured</span>
          <div className="gold-dot" />
        </button>

        <button
          className={`nav-pill-btn ${activeNav === "contact" ? "active" : ""}`}
          onClick={() => scrollToSection("contact-section", "contact")}
        >
          <svg viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>Contact</span>
          <div className="gold-dot" />
        </button>
      </nav>
    </div>
  );
}
