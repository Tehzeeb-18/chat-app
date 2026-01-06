# UI Structure & Design System

## Color Palette

### Light Mode
- **Background**: White (#FFFFFF)
- **Card**: White (#FFFFFF)
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#F3F4F6)
- **Muted**: Light Gray (#9CA3AF)
- **Border**: Light Gray (#E5E7EB)

### Dark Mode
- **Background**: Dark Blue (#0F172A)
- **Card**: Dark Blue (#1E293B)
- **Primary**: Light Blue (#60A5FA)
- **Secondary**: Dark Gray (#334155)
- **Muted**: Gray (#64748B)
- **Border**: Dark Gray (#334155)

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     Root Layout                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Theme Provider                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Session Provider                       │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │        Socket Provider                    │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │         Page Content                │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Page Layouts

### Login/Register Page

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                    ┌─────────────────┐                       │
│                    │   Logo Icon     │                       │
│                    └─────────────────┘                       │
│                                                               │
│                    Welcome Back                              │
│                Sign in to continue                           │
│                                                               │
│              ┌─────────────────────────┐                     │
│              │  Email Input            │                     │
│              └─────────────────────────┘                     │
│                                                               │
│              ┌─────────────────────────┐                     │
│              │  Password Input         │                     │
│              └─────────────────────────┘                     │
│                                                               │
│              ┌─────────────────────────┐                     │
│              │    Sign In Button       │                     │
│              └─────────────────────────┘                     │
│                                                               │
│              ─────── Or continue with ───────                │
│                                                               │
│              ┌─────────────────────────┐                     │
│              │    Google Button        │                     │
│              └─────────────────────────┘                     │
│                                                               │
│              Don't have an account? Sign up                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Chat Page (Main Layout)

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (320px)      │         Chat Area                   │
│ ┌─────────────────┐   │  ┌──────────────────────────────┐   │
│ │  Messages       │   │  │  Chat Header                 │   │
│ │  [🌙] [Logout]  │   │  │  ┌────┐ John Doe            │   │
│ └─────────────────┘   │  │  │ JD │ ● online            │   │
│                       │  │  └────┘ [📞] [📹] [⋮]       │   │
│ ┌─────────────────┐   │  └──────────────────────────────┘   │
│ │ 🔍 Search...    │   │                                      │
│ └─────────────────┘   │  ┌──────────────────────────────┐   │
│                       │  │                              │   │
│ ┌─────────────────┐   │  │      Hello! How are you?    │   │
│ │ ┌──┐ John Doe   │   │  │                         10:30│   │
│ │ │JD│ Hey there! │   │  │                              │   │
│ │ └──┘ 2m ago     │   │  │  ┌──────────────────────┐   │   │
│ └─────────────────┘   │  │  │ I'm good, thanks!    │   │   │
│                       │  │  │ How about you?       │   │   │
│ ┌─────────────────┐   │  │  │              10:31 ✓✓│   │   │
│ │ ┌──┐ Jane Smith │   │  │  └──────────────────────┘   │   │
│ │ │JS│ See you!   │   │  │                              │   │
│ │ └──┘ 1h ago     │   │  │      Great! Working on...   │   │
│ └─────────────────┘   │  │                         10:32│   │
│                       │  │                              │   │
│ ┌─────────────────┐   │  └──────────────────────────────┘   │
│ │ ┌──┐ Mike Brown │   │                                      │
│ │ │MB│ Thanks!    │   │  ┌──────────────────────────────┐   │
│ │ └──┘ Yesterday  │   │  │ 😊 Type a message...  [Send]│   │
│ └─────────────────┘   │  └──────────────────────────────┘   │
│                       │                                      │
└─────────────────────────────────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar              │         Chat Area                   │
│                       │                                      │
│                       │                                      │
│                       │         ┌────────┐                  │
│                       │         │   💬   │                  │
│                       │         └────────┘                  │
│                       │                                      │
│                       │      Welcome to Chat                │
│                       │                                      │
│                       │   Select a conversation from        │
│                       │   the sidebar to start messaging    │
│                       │                                      │
│                       │                                      │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Sidebar Component
- **Header**: Title, theme toggle, logout button
- **Search Bar**: Filter conversations
- **Conversation List**: Scrollable list of chats
  - Avatar (with online indicator)
  - Name
  - Last message preview
  - Timestamp
  - Unread indicator (blue dot)

### Chat Header Component
- **User Info**: Avatar, name, online status
- **Actions**: Call, video call, more options buttons

### Message Bubble Component
- **Sent Messages** (right-aligned):
  - Blue background
  - White text
  - Timestamp
  - Delivery status (✓ sent, ✓✓ delivered, ✓✓ blue = read)
  
- **Received Messages** (left-aligned):
  - Gray background
  - Dark text
  - Timestamp

### Message Input Component
- **Emoji Button**: Opens emoji picker
- **Text Input**: Auto-expanding input field
- **Send Button**: Disabled when empty

### Emoji Picker
- Grid of common emojis
- Appears above input
- Smooth animation

## Animations

### Message Animations
```css
/* Sent messages slide in from right */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Received messages slide in from left */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Typing Indicator
- Three animated dots
- Appears in chat header
- "typing..." text

### Hover Effects
- Conversation items: Light background on hover
- Buttons: Slight scale and color change
- Input focus: Ring effect

## Responsive Breakpoints

### Mobile (< 768px)
- Sidebar takes full width
- Chat view takes full width
- Toggle between sidebar and chat
- Simplified header

### Tablet (768px - 1024px)
- Sidebar: 280px
- Chat area: Remaining space
- All features visible

### Desktop (> 1024px)
- Sidebar: 320px
- Chat area: Remaining space
- Optimal spacing and padding

## Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Fallback**: system-ui, -apple-system

### Font Sizes
- **Heading 1**: 2rem (32px)
- **Heading 2**: 1.5rem (24px)
- **Body**: 0.875rem (14px)
- **Small**: 0.75rem (12px)
- **Tiny**: 0.625rem (10px)

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing System

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## Border Radius

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)
- **full**: 9999px (circle)

## Shadows

### Light Mode
- **sm**: 0 1px 2px rgba(0, 0, 0, 0.05)
- **md**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **lg**: 0 10px 15px rgba(0, 0, 0, 0.1)
- **xl**: 0 20px 25px rgba(0, 0, 0, 0.15)

### Dark Mode
- **sm**: 0 1px 2px rgba(0, 0, 0, 0.3)
- **md**: 0 4px 6px rgba(0, 0, 0, 0.4)
- **lg**: 0 10px 15px rgba(0, 0, 0, 0.5)
- **xl**: 0 20px 25px rgba(0, 0, 0, 0.6)

## Icons

All icons from **Lucide React**:
- MessageSquare (logo)
- Search (search bar)
- Send (send button)
- Smile (emoji picker)
- Phone (call button)
- Video (video call)
- MoreVertical (more options)
- Moon/Sun (theme toggle)
- LogOut (logout)
- Check/CheckCheck (read receipts)

## Accessibility

- **Keyboard Navigation**: Full support
- **Screen Readers**: ARIA labels on all interactive elements
- **Focus Indicators**: Visible focus rings
- **Color Contrast**: WCAG AA compliant
- **Alt Text**: All images have descriptive alt text

## Performance

- **Lazy Loading**: Messages load on scroll
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Route-based splitting
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large message lists (future enhancement)
