# 💬 Modern Chat Application

> A production-ready, real-time chat application built with Next.js 14, featuring a beautiful UI inspired by WhatsApp Web and Discord.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-2d3748)](https://www.prisma.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-010101)](https://socket.io/)

---

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your database URL and secrets

# 3. Initialize database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev
```

Visit **http://localhost:3000** 🚀

**📖 New here? Start with [START-HERE.md](START-HERE.md)**

---

# Modern Chat Application

A production-ready, real-time chat application built with Next.js 14, featuring a beautiful UI inspired by WhatsApp Web and Discord.

## Features

- 🔐 **Authentication**: Email/password + Google OAuth via NextAuth.js
- 💬 **Real-time Messaging**: Instant message delivery using Socket.IO
- 👥 **1-to-1 Chat**: Private conversations between users
- ✅ **Read Indicators**: See when messages are delivered and read
- ⌨️ **Typing Indicators**: Know when someone is typing
- 🟢 **Online Status**: Real-time online/offline indicators
- 😊 **Emoji Support**: Built-in emoji picker
- 🌓 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- ✨ **Smooth Animations**: Framer Motion for polished transitions
- 🎨 **Modern UI**: Clean, minimal design with Tailwind CSS + shadcn/ui

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL + Prisma ORM
- **Real-time**: Socket.IO
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/chatapp"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
chat-app/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── conversations/# Conversation management
│   │   ├── messages/     # Message handling
│   │   └── socket/       # Socket.IO setup
│   ├── chat/             # Chat pages
│   │   ├── [conversationId]/
│   │   └── page.tsx
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── layout.tsx        # Root layout
├── components/
│   ├── chat/             # Chat-specific components
│   │   ├── sidebar.tsx
│   │   ├── chat-header.tsx
│   │   ├── message-bubble.tsx
│   │   ├── message-input.tsx
│   │   └── empty-state.tsx
│   ├── providers/        # Context providers
│   │   ├── theme-provider.tsx
│   │   └── socket-provider.tsx
│   └── ui/               # Reusable UI components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Utility functions
│   └── validations/      # Zod schemas
├── prisma/
│   └── schema.prisma     # Database schema
└── types/                # TypeScript types
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Conversation**: Chat conversations between users
- **Message**: Individual messages with read/delivery status
- **Account/Session**: NextAuth.js authentication tables

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Secure random string
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth secret

## Features to Add

- [ ] Group chats
- [ ] File/image sharing
- [ ] Voice messages
- [ ] Video calls
- [ ] Message search
- [ ] User profiles
- [ ] Push notifications
- [ ] Message reactions
- [ ] Message editing/deletion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
