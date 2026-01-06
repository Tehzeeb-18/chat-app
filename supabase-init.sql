-- Chat App Database Schema for Supabase
-- Run this SQL in Supabase SQL Editor to create all tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP,
    image TEXT,
    password TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    CONSTRAINT accounts_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(provider, "providerAccountId")
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    CONSTRAINT sessions_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    UNIQUE(identifier, token)
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    read BOOLEAN DEFAULT FALSE NOT NULL,
    delivered BOOLEAN DEFAULT FALSE NOT NULL,
    type TEXT DEFAULT 'text' NOT NULL,
    "fileUrl" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "fileMimeType" TEXT,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    CONSTRAINT messages_senderId_fkey FOREIGN KEY ("senderId") REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT messages_receiverId_fkey FOREIGN KEY ("receiverId") REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT messages_conversationId_fkey FOREIGN KEY ("conversationId") REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create junction table for conversation participants
CREATE TABLE IF NOT EXISTS "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE("A", "B")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS messages_conversationId_idx ON messages("conversationId");
CREATE INDEX IF NOT EXISTS messages_senderId_idx ON messages("senderId");
CREATE INDEX IF NOT EXISTS messages_receiverId_idx ON messages("receiverId");
CREATE INDEX IF NOT EXISTS "_ConversationToUser_B_idx" ON "_ConversationToUser"("B");

-- Create function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updatedAt
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON conversations;
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database tables created successfully!' as status;
