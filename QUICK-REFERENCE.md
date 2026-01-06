# Quick Reference Guide

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio (GUI)
npx prisma migrate dev  # Create migration
npx prisma db seed   # Seed database (if configured)
```

### Deployment
```bash
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
vercel env pull      # Pull environment variables
```

## Project Structure Quick Reference

```
chat-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── conversations/# Conversation API
│   │   ├── messages/     # Message API
│   │   └── socket/       # Socket.IO setup
│   ├── chat/             # Chat pages
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
│
├── components/            # React components
│   ├── chat/             # Chat components
│   │   ├── sidebar.tsx
│   │   ├── chat-header.tsx
│   │   ├── message-bubble.tsx
│   │   ├── message-input.tsx
│   │   └── empty-state.tsx
│   ├── providers/        # Context providers
│   │   ├── theme-provider.tsx
│   │   ├── socket-provider.tsx
│   │   └── session-provider.tsx
│   └── ui/               # UI components (shadcn)
│       ├── button.tsx
│       ├── input.tsx
│       ├── avatar.tsx
│       └── skeleton.tsx
│
├── lib/                   # Utilities
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Helper functions
│   └── validations/      # Zod schemas
│
├── prisma/               # Database
│   └── schema.prisma     # Database schema
│
├── types/                # TypeScript types
│   ├── index.ts
│   ├── socket.ts
│   └── next-auth.d.ts
│
└── public/               # Static files
```

## Key Files Explained

### `app/layout.tsx`
Root layout with providers (Theme, Session)

### `app/chat/layout.tsx`
Chat layout with Socket provider

### `lib/auth.ts`
NextAuth configuration with credentials and Google OAuth

### `prisma/schema.prisma`
Database schema with User, Conversation, Message models

### `components/providers/socket-provider.tsx`
Socket.IO client setup and context

### `app/api/socket/io/route.ts`
Socket.IO server setup

## Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# Optional
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `POST /api/register` - Register new user

### Conversations
- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Create conversation

### Messages
- `GET /api/messages/[conversationId]` - Get messages
- `POST /api/messages` - Send message

## Socket.IO Events

### Client → Server
- `join-conversation` - Join conversation room
- `leave-conversation` - Leave conversation room
- `send-message` - Send new message
- `typing` - User typing status

### Server → Client
- `new-message` - New message received
- `typing` - User typing notification

## Database Models

### User
```prisma
id, name, email, password, image, createdAt, updatedAt
```

### Conversation
```prisma
id, createdAt, updatedAt, participants[], messages[]
```

### Message
```prisma
id, content, createdAt, read, delivered
senderId, receiverId, conversationId
```

## Common Tasks

### Add New User (Manual)
```typescript
const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("password", 12),
  },
});
```

### Create Conversation
```typescript
const conversation = await prisma.conversation.create({
  data: {
    participants: {
      connect: [{ id: userId1 }, { id: userId2 }],
    },
  },
});
```

### Send Message
```typescript
const message = await prisma.message.create({
  data: {
    content: "Hello!",
    senderId: userId,
    receiverId: otherUserId,
    conversationId: convId,
  },
});
```

## Styling

### Tailwind Classes
```tsx
// Container
className="flex items-center justify-between p-4"

// Button
className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"

// Card
className="bg-card border border-border rounded-xl shadow-lg p-6"

// Text
className="text-lg font-semibold text-foreground"
```

### Custom CSS Variables
```css
--background
--foreground
--primary
--secondary
--muted
--border
--radius
```

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Reset Database
```bash
npx prisma db push --force-reset
```

### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works (if configured)
- [ ] Can create conversation
- [ ] Can send message
- [ ] Messages appear in real-time
- [ ] Typing indicator works
- [ ] Read receipts work
- [ ] Dark mode toggle works
- [ ] Responsive on mobile
- [ ] Logout works

## Performance Tips

1. **Optimize Images**: Use Next.js Image component
2. **Lazy Load**: Implement pagination for messages
3. **Memoize**: Use React.memo for expensive components
4. **Debounce**: Debounce typing indicators
5. **Index**: Add database indexes for queries
6. **Cache**: Implement Redis for sessions (production)

## Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enabled (production)
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation with Zod
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention (React escaping)
- [ ] CSRF protection (NextAuth)

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Socket.IO Docs](https://socket.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

## Support

For issues or questions:
1. Check documentation files
2. Review error logs
3. Check browser console
4. Review Prisma Studio for data issues
5. Check Socket.IO connection in Network tab
