# MaximusX — Freelancing Profile Design Specification

## 1. Product Overview

**Product:** MaximusX Freelancing Profile  
**Primary use:** Personal portfolio/profile for a freelance video editor  
**Design direction:** Dark, compact, creator-focused, mobile-first  
**Target viewport:** Mobile-first, centered on larger screens  
**Maximum content width:** `480px`

The interface should feel like a creator profile rather than a conventional corporate portfolio. The hierarchy is:

1. Profile / identity
2. Short-form video work
3. Clients / creators worked with
4. Long-form video work
5. Contact actions
6. Persistent bottom navigation

---

# 2. Design Principles

### Teal dominates
Teal is the structural color. Use it for containers, borders, navigation, section surfaces, and major framing elements.

### Gold earns attention
Gold is reserved for important actions, CTAs, key labels, play controls, and selected/high-priority information.

### Cyan speaks
Cyan is used primarily for headings, interactive text, handles, and readable UI emphasis.

### Minimal visual noise
Avoid unnecessary shadows, excessive gradients, decorative effects, or dense UI chrome.

### Alternating layouts
Alternate the position of thumbnails/previews between odd and even cards to create visual movement.

### Mobile-first
All layouts, spacing, typography, and controls must work comfortably with one-thumb interaction.

### Touch targets
Interactive controls should have a minimum target size of `44px × 44px`.

---

# 3. Color System

| Role | Name | Hex | Approx. Usage |
|---|---|---:|---:|
| Primary | Teal | `#15A4BC` | 15% |
| Accent | Gold | `#D29543` | 55% |
| Highlight | Cyan | `#70CCD3` | 10% |
| Base | Dark Teal | `#0F7082` | 10% |
| Detail | Golden Brown | `#B06D27` | 20% |

> **Usage note:** The values above add up to 110%, so treat them as rough visual prominence rather than strict percentage allocation. For an exact 100% distribution, normalize them during implementation.

## Supporting Text Colors

| Purpose | Color |
|---|---:|
| Body / muted text | `#7AB8C2` |
| Primary dark text on gold | `#0F2024` |
| White / icon emphasis | `#FFFFFF` |
| Secondary white | `rgba(255,255,255,0.50)` |

## Border System

Cyan should **not** be used as the default border color. Keep Cyan primarily for text and small interactive highlights.

| Usage | Border Color |
|---|---|
| Main card/container border | `#15A4BC` Teal |
| Subtle divider / secondary border | `#B06D27` Golden Brown |
| Dark surface separation | `rgba(21,164,188,0.35)` |
| Active/focus indicator | `#D29543` Gold |
| Cyan | **No default borders** |

### Border Rules

- Cards and containers use **Teal** borders.
- Golden Brown is reserved for subtle separators, detail strokes, and secondary accents.
- Gold is used for focus states, active indicators, and important actions.
- Cyan is primarily an information/highlight color, not a structural border color.
- Avoid bright Cyan outlines around multiple components because they compete with content hierarchy.
- Keep border contrast controlled on the dark background.

## Color Rules

- `#15A4BC` = structure and framing.
- `#D29543` = primary action, CTA, selected state, and key emphasis.
- `#70CCD3` = headings, handles, and interactive text.
- `#0F7082` = deep page/surface background.
- `#B06D27` = subtle dividers, detail strokes, and secondary borders.
- Do not use Cyan as a default card/container border.
- Do not use Gold as a large decorative border system.
- Keep the overall interface dark and content-focused.

---

# 4. Typography

## Font Families

### Display / Name
**Space Grotesk**
- Weight: `700`
- Size: `24px`

### Section Titles
**DM Mono**
- Weight: `600`
- Size: `11px`
- Transform: `uppercase`
- Letter spacing: `0.08em`
- Color: `#D29543`

### Card Headings
**Space Grotesk**
- Weight: `600`
- Size: `13–14px`
- Color: `#70CCD3`

### Body
**Space Grotesk**
- Weight: `400`
- Size: `12–13.5px`
- Color: `#7AB8C2`

### Tags / Handles
**DM Mono**
- Weight: `400–500`
- Size: `10–12px`

## Typography Rules

- Section labels may use uppercase.
- Avoid all-caps for normal content.
- Keep line lengths short on mobile.
- Use strong contrast for the creator name.
- Body copy should remain muted and secondary.
- Do not use more than the defined font families.

---

# 5. Global Layout

```text
Viewport
┌───────────────────────────────────────┐
│                                       │
│          max-width: 480px             │
│          centered content             │
│                                       │
│  16px ┃                        ┃ 16px │
│       ┃      PAGE CONTENT      ┃       │
│                                       │
└───────────────────────────────────────┘
```

## Layout Tokens

```css
--page-max-width: 480px;
--page-padding: 16px;
--section-gap: 24px;
--card-radius: 12px;
--button-radius: 8px;
--tag-radius: 8px;
--pill-radius: 20px;
--card-border-width: 1.5px;
```

## Background

Use:

```css
background: #0F7082;
```

or a visually equivalent deep dark teal surface.

The background must remain substantially darker than the primary cards and header.

---

# 6. Page Structure

```text
MaximusX Profile
│
├── Header / Profile
│   ├── Avatar
│   ├── Name
│   ├── Handle
│   ├── Bio
│   └── Stats
│
├── Short Videos
│   ├── Short Video 1
│   ├── Short Video 2
│   └── Short Video 3
│
├── Worked With
│   └── Horizontal creator/client list
│
├── Long Videos
│   ├── Long Video 1
│   ├── Long Video 2
│   └── Long Video 3
│
├── Contact
│   ├── X Account
│   └── Phone Number
│
└── Bottom Navigation
```

---

# 7. Header / Profile Card

## Structure

```text
┌─────────────────────────────────────┐
│  [Avatar]  MaximusX                 │
│            @handle                  │
│                                     │
│  Short profile / bio text           │
│                                     │
│  Stat       Stat       Stat         │
└─────────────────────────────────────┘
```

## Visual Specification

- Background: `linear-gradient(#0F7082 → #15A4BC)`
- Border: `1.5px solid #15A4BC`
- Border radius: `12px`
- Padding: `16px`
- Position: `relative`
- Overflow: `hidden`

### Avatar

- Size: `56px`
- Shape: circular
- Background: `#D29543`
- Border: `3px solid #15A4BC`

### Decorative Circle

- Position: top-right
- Size: `160px`
- Color: `rgba(112,204,211,0.15)`
- Shape: circle
- Must remain subtle.

### Creator Name

```text
MaximusX
```

- Space Grotesk
- `24px`
- `700`
- Primary/high-contrast text

### Handle

Example:

```text
@maximusx
```

- DM Mono
- `10–12px`
- Color: `#70CCD3`

### Bio

Use concise descriptive copy.

- Space Grotesk
- `12–13.5px`
- Color: `#7AB8C2`

### Stats

Recommended structure:

```text
Projects · Clients · Experience
```

Use Gold for the primary number/value.

---

# 8. Section Title

Every major content group uses the same title pattern.

```text
SHORT VIDEOS ─────────────────────────
```

## Specification

- Font: DM Mono
- Weight: `600`
- Size: `11px`
- Uppercase
- Letter spacing: `0.08em`
- Color: `#D29543`

### Trailing Line

- Height: `1px`
- Gradient: Gold → transparent
- Align vertically with title.

Example:

```css
background: linear-gradient(
  90deg,
  #D29543,
  transparent
);
```

---

# 9. Short Video Cards

Short videos use alternating layouts.

## Odd Card

```text
┌─────────────┬──────────────────────────────┐
│             │ Title                        │
│   Thumb     │ Description                  │
│             │                              │
└─────────────┴──────────────────────────────┘
```

## Even Card

```text
┌──────────────────────────────┬─────────────┐
│ Title                        │             │
│ Description                  │   Thumb     │
│                              │             │
└──────────────────────────────┴─────────────┘
```

## Card Specification

- Border: `1.5px solid #15A4BC`
- Border radius: `12px`
- Overflow: `hidden`
- Display: CSS grid
- Gap: `12px`
- Minimum height: approximately `92–110px`

### Thumbnail

- Width: `70px`
- Aspect ratio: visually compact portrait/preview
- Odd cards: Teal surface
- Even cards: Dark Teal surface
- Preserve image aspect ratio.
- Use `object-fit: cover`.

### Play Icon

- Position: bottom-right of thumbnail
- Small circular play indicator
- Color: `rgba(255,255,255,0.60)`

### Text Area

- Heading: Cyan
- Description: muted teal-grey
- Keep description to 2–4 lines.

## Alternation Logic

```text
Card 1 → thumbnail left
Card 2 → thumbnail right
Card 3 → thumbnail left
Card 4 → thumbnail right
```

---

# 10. Worked With Banner

The Worked With area is a horizontally scrollable creator/client strip.

```text
┌────────────────────────────────────────────────┐
│ [01] [02] [03]                                 |
| Name Name Name                                 |
| [04] [05]    →                                 │
│ Name Name                                      │
└────────────────────────────────────────────────┘
```

## Container

- Background: diagonal gradient
- Start: `#15A4BC`
- End: `#0F7082`
- Border: `1.5px solid #15A4BC`
- Border radius: `12px`
- Horizontal overflow: enabled
- Scrollbar: hidden

### Creator Chips

```text
┌────────┐
│ avatar │
│  name  │
└────────┘
```

- Deep/dark background
- Border: `1px solid rgba(112,204,211,0.30)`
- Radius: `8px`
- Compact spacing
- Avatar or brand mark above/alongside name

### Interaction

- Horizontal swipe on mobile
- No visible scrollbar
- Maintain consistent chip widths
- Do not wrap onto a second row.

---

# 11. Long Video Cards

Long-form work uses a two-column split.

## Odd Card

```text
┌────────────────┬────────────────────────────┐
│                │ TITLE                      │
│  Video Preview │ Description                │
│       ▶        │ Tags                       │
│                │                            │
└────────────────┴────────────────────────────┘
```

## Even Card

```text
┌────────────────────────────┬────────────────┐
│ TITLE                      │                │
│ Description                │ Video Preview  │
│ Tags                       │       ▶        │
│                            │                │
└────────────────────────────┴────────────────┘
```

## Specification

- Display: CSS grid
- Columns: `1fr 1fr`
- Border: `1.5px solid #15A4BC`
- Border radius: `12px`
- Overflow: hidden
- No external shadow

### Preview Panel

- Teal/deep-teal gradient
- Gold circular play button
- Centered preview icon
- Use thumbnail imagery where available.

### Play Button

- Circular
- Gold fill: `#D29543`
- Dark play icon
- Minimum interaction size: `44px`

### Tags

Gold treatment:

```text
[EDITING] [REELS] [YOUTUBE]
```

- Background: approximately `15% Gold opacity`
- Border: approximately `40% Gold`
- Text: Gold
- Font: DM Mono
- Size: `10–12px`
- Radius: `8px`

---

# 12. Contact Buttons

Two horizontally aligned contact actions.

```text
┌────────────────────┐  ┌────────────────────┐
│    X Account       │  │   Phone Number     │
└────────────────────┘  └────────────────────┘
```

## Primary Button

**X Account**

- Background: `#D29543`
- Text: dark teal
- Border: none
- Radius: `8px`

## Secondary Button

**Phone Number**

- Background: transparent
- Border: `2px solid #15A4BC`
- Text: `#70CCD3`
- Radius: `8px`

## Interaction

- Minimum height: `44px`
- Full-width within each grid column
- Hover: slightly increase brightness
- Active/tap: slight scale-down feedback
- Focus: visible keyboard focus ring

---

# 13. Skill Pills

For technologies/services/skills:

```text
[ Video Editing ] [ Motion Graphics ] [ Reels ]
```

## Specification

- Background: `rgba(21,164,188,0.15)`
- Border: `1px solid #15A4BC`
- Text: `#70CCD3`
- Border radius: `20px`
- Font: DM Mono
- Size: `10–12px`
- Horizontal padding: `10–12px`
- Vertical padding: `6–8px`

Do not use skill pills as primary buttons.

---

# 14. Bottom Navigation

The bottom navigation is fixed to the viewport.

```text
┌─────────────────────────────────────┐
│   👤        🎬        💬        ⭐  │
└─────────────────────────────────────┘
```

## Visual Specification

- Position: fixed
- Bottom: `0`
- Width: `100%`
- Max content width: `480px`
- Height: approximately `64–72px`
- Background:

```css
linear-gradient(
  90deg,
  #0F7082,
  #15A4BC,
  #0F7082
);
```

- Border-top: `2px solid #B06D27`

### Active Item

- Gold icon/circle
- Gold indicator dot below
- Full opacity
- Stronger visual weight

### Inactive Item

- White
- Approximately `50% opacity`

### Navigation Items

Suggested mapping:

```text
Profile
Videos
Messages / Contact
Featured / Highlights
```

Use icons consistently; avoid mixing unrelated icon styles.

---

# 15. Spacing System

Use a compact spacing scale.

| Token | Value |
|---|---:|
| `xs` | `4px` |
| `sm` | `8px` |
| `md` | `12px` |
| `lg` | `16px` |
| `xl` | `24px` |
| `2xl` | `32px` |

## Primary Rules

- Page horizontal padding: `16px`
- Section-to-section gap: `24px`
- Card internal padding: `12–16px`
- Small element gap: `8px`
- Heading-to-body gap: `6–8px`

Avoid arbitrary spacing values unless required by image alignment.

---

# 16. Border & Radius System

| Component | Radius | Border |
|---|---:|---:|
| Cards | `12px` | `1.5px Teal` |
| Header | `12px` | `1.5px Teal` |
| Buttons | `8px` | `0–2px` |
| Tags | `8px` | `1px` |
| Skill pills | `20px` | `1px Teal` |
| Avatar | `50%` | `3px Teal` |

No excessive rounded containers.

---

# 17. Interaction States

Every interactive element must have at least:

### Default
Normal visual state.

### Hover
Used on desktop:
- Slight brightness increase
- No large movement
- No heavy glow

### Active
Used on click/tap:
- Slight scale reduction
- Clear pressed state

### Focus
For keyboard accessibility:
- Visible Gold/Cyan focus outline
- Do not remove native keyboard focus without replacement

### Disabled
- Reduce opacity
- Disable pointer interaction
- Preserve layout size

---

# 18. Video Interaction

Videos should be represented by thumbnails first.

### Short Videos

Tap/click:
```text
Thumbnail → Open/play short video
```

### Long Videos

Tap/click:
```text
Preview → Play/open full video
```

Do not autoplay multiple videos on page load.

Use lazy loading for videos/images below the first viewport.

---

# 19. Responsive Behavior

## Mobile: `≤ 480px`

Primary target.

- Single-column page flow
- Two-column long-video cards
- Compact typography
- Horizontal creator/client scrolling
- Fixed bottom navigation
- `16px` page padding

## Tablet / Desktop: `> 480px`

- Keep content centered.
- Maximum width remains `480px`.
- Do not stretch the portfolio to full desktop width.
- Maintain mobile composition.
- Side margins increase automatically.

Example:

```css
.profile-page {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px;
}
```

---

# 20. Accessibility

## Contrast
Text must remain readable against dark teal surfaces.

## Semantic HTML

Recommended structure:

```html
<header>
<main>
<section>
<article>
<nav>
<footer>
```

## Images

Every meaningful image should have descriptive `alt` text.

Decorative images should use:

```html
alt=""
```

## Keyboard Navigation

All buttons, links, navigation items, and video controls must be keyboard accessible.

## Motion

Avoid large animations.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

and reduce/disable non-essential transitions.

---

# 21. Performance

### Images
- Use responsive image sizes.
- Compress thumbnails.
- Use modern formats such as WebP/AVIF where supported.
- Lazy-load below-the-fold images.

### Videos
- Do not preload all videos.
- Use poster thumbnails.
- Load video data only when needed.

### UI
- Avoid heavy shadows and filters.
- Keep the page visually simple.
- Use CSS for simple decorative elements rather than image assets.

---

# 22. Suggested Component Architecture

```text
MaximusProfile
│
├── ProfileHeader
│   ├── Avatar
│   ├── CreatorIdentity
│   ├── Handle
│   ├── Bio
│   └── ProfileStats
│
├── SectionHeader
│
├── ShortVideoSection
│   └── ShortVideoCard[]
│
├── WorkedWithSection
│   └── CreatorChip[]
│
├── LongVideoSection
│   └── LongVideoCard[]
│
├── SkillsSection
│   └── SkillPill[]
│
├── ContactSection
│   ├── PrimaryContactButton
│   └── SecondaryContactButton
│
└── BottomNav
    └── NavItem[]
```

---

# 23. Suggested Data Model

```ts
type Profile = {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  stats: {
    label: string;
    value: string;
  }[];
};

type ShortVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

type Creator = {
  id: string;
  name: string;
  avatar: string;
};

type LongVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  url: string;
};

type Skill = {
  id: string;
  label: string;
};
```

---

# 24. Content Hierarchy

The visual hierarchy should consistently follow:

```text
1. Creator name
2. Section title
3. Video title
4. Important stats / CTA
5. Body description
6. Metadata / tags
```

Do not allow metadata or decorative elements to compete with the creator name or work samples.

---

# 25. Visual Rhythm

The page should visually alternate:

```text
PROFILE
   ↓
SHORT VIDEO → thumb left
   ↓
SHORT VIDEO ← thumb right
   ↓
SHORT VIDEO → thumb left
   ↓
WORKED WITH → horizontal movement
   ↓
LONG VIDEO → preview left
   ↓
LONG VIDEO ← preview right
   ↓
LONG VIDEO → preview left
   ↓
CONTACT → two actions
   ↓

FIXED NAV
```

This is an intentional part of the design and should be preserved during implementation.

---

Yes. The context system should be **CMS/admin-driven**, so the public profile is just a presentation layer. The admin can independently manage the content of each creative context.

# Context Switcher + Admin Panel

## Admin Panel Purpose

The admin panel allows the freelancer to manage all portfolio content without modifying code.

The admin can select a creative context:

```text
Video Editing
Storyboarding
Animation
```

and manage the content associated with that context.

The **same content structure** is reused across contexts, while the actual data changes.

---

## Context Management

```text
Admin Panel
│
├── Video Editing
│   ├── Profile / Context Info
│   ├── Short Videos
│   ├── Long Videos
│   ├── Collaborated Creators
│   ├── Skills
│   └── Stats
│
├── Storyboarding
│   ├── Profile / Context Info
│   ├── Projects
│   ├── Collaborated Creators
│   ├── Skills
│   └── Stats
│
└── Animation
    ├── Profile / Context Info
    ├── Projects / Videos
    ├── Collaborated Creators
    ├── Skills
    └── Stats
```

---

# Short Video Management

For each short video, the admin can:

```text
Title
Description
Thumbnail
Video URL
Display Order
Published / Hidden
```

Example:

```text
Short Video #1

Title:        Gaming Montage
Description:  Fast-paced gaming edit...
Thumbnail:    /image/short-1.webp
Video URL:    ...
Order:        1
Status:       Published
```

Admin actions:

```text
+ Add Short Video
Edit
Delete
Reorder
Publish / Unpublish
```

---

# Long Video Management

Each long-form project contains:

```text
Title
Description
Thumbnail / Preview
Video URL
Tags
Display Order
Published / Hidden
```

Example:

```text
Long Video #1

Title:        Brand Campaign
Description:  Full promotional campaign edit...
Thumbnail:    ...
Video URL:    ...
Tags:         [Commercial] [Color Grading]
Order:        1
Status:       Published
```

Admin actions:

```text
+ Add Long Video
Edit
Delete
Reorder
Publish / Unpublish
```

---

# Collaborated Creators / Clients

This should also be **context-specific**.

For example:

```text
Video Editing
→ Creator A
→ Creator B
→ Creator C

Animation
→ Creator D
→ Creator E
```

Each collaboration record can contain:

```text
Creator Name
Profile Image / Logo
Profile URL
Platform
Description
Display Order
Context
```

The admin should be able to:

```text
+ Add Creator
Edit
Delete
Reorder
Assign Context
```

A creator can also belong to **multiple contexts**.

Example:

```text
Creator A
├── Video Editing ✓
└── Animation ✓
```

---

# Skills Management

Skills should also change with context.

### Video Editing

```text
Video Editing
Premiere Pro
After Effects
Color Grading
Motion Graphics
```

### Storyboarding

```text
Storyboarding
Shot Composition
Visual Planning
Scene Direction
```

### Animation

```text
2D Animation
Motion Design
Character Animation
After Effects
```

Admin:

```text
+ Add Skill
Edit
Delete
Reorder
Assign Context
```

---

# Context Information

Each context should have its own metadata.

```text
Context Name
Context Description
Hero Title
Hero Description
Profile Stats
Featured Work
Skills
```

Example:

```text
Context: Video Editing

Title:
Video Editor

Description:
I create fast-paced short-form and
long-form content for creators and brands.

Stats:
120+ Videos
25+ Creators
3+ Years
```

Switching to Storyboarding replaces this information with the Storyboarding-specific data.

---

# Recommended Admin Structure

```text
ADMIN
│
├── Dashboard
│
├── Contexts
│   ├── Video Editing
│   ├── Storyboarding
│   └── Animation
│
├── Portfolio
│   ├── Short Videos
│   ├── Long Videos
│   └── Projects
│
├── Collaborations
│
├── Skills
│
├── Profile
│
├── Contact Information
│
└── Settings
```

The important architectural rule is:

**Do not build separate hardcoded pages for Video Editing, Storyboarding, and Animation.**

Build one reusable profile structure:

```text
Context
   ↓
Context Data
   ↓
Reusable Components
   ↓
Dynamic Public Profile
```

This makes adding a future context such as **Graphic Design, VFX, or Motion Design** possible without redesigning the system.


# 26. Do / Don't

## Do

- Keep the interface dark.
- Let teal define structure.
- Use Gold selectively.
- Alternate card layouts.
- Keep content within `480px`.
- Use compact typography.
- Make videos the primary portfolio content.
- Keep navigation fixed.
- Preserve generous `24px` section spacing.

## Don't

- Do not use large drop shadows.
- Do not overuse gradients.
- Do not use Gold everywhere.
- Do not make every card identical.
- Do not stretch the layout across desktop screens.
- Do not use excessive animation.
- Do not use all-caps for normal content.
- Do not overcrowd the first viewport.

---

# 27. CSS Design Tokens

```css
:root {
  --color-primary: #15A4BC;
  --color-accent: #D29543;
  --color-highlight: #70CCD3;
  --color-base: #0F7082;
  --color-detail: #B06D27;
  --color-body: #7AB8C2;

  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "DM Mono", monospace;

  --page-max-width: 480px;
  --page-padding: 16px;

  --section-gap: 24px;
  --card-radius: 12px;
  --button-radius: 8px;
  --pill-radius: 20px;

  --border-width: 1.5px;
}
```

---

# 28. Final Design Target

The finished page should read visually as:

```text
DARK CREATOR PORTFOLIO
        ↓
TEAL STRUCTURE
        ↓
GOLD ACTIONS
        ↓
CYAN INFORMATION
        ↓
VIDEO-FIRST PORTFOLIO
        ↓
COMPACT MOBILE EXPERIENCE
```

The reference mockup should be treated as the visual composition guide, while this document defines the reusable system, spacing, colors, component behavior, and implementation rules.
