"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NewConversationDialog } from "@/components/chat/new-conversation-dialog";
import { formatChatTime } from "@/lib/utils";
import { Search, MessageSquarePlus, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import type { Conversation } from "@/types";

interface SidebarProps {
  conversations: Conversation[];
  currentUserId: string;
  activeConversationId?: string;
  isLoading?: boolean;
}

export function Sidebar({
  conversations,
  currentUserId,
  activeConversationId,
  isLoading,
}: SidebarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredConversations = conversations.filter((conv) => {
    const otherUser = conv.participants.find((p) => p.id !== currentUserId);
    return otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleConversationClick = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  const getOtherUser = (conversation: Conversation) => {
    return conversation.participants.find((p) => p.id !== currentUserId);
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/profile")}
              title="Profile settings"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNewConversationOpen(true)}
              title="New conversation"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MessageSquarePlus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-sm text-muted-foreground">
              Start a new conversation to get started
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);
            const lastMessage = conversation.lastMessage;
            const isActive = conversation.id === activeConversationId;
            const unreadCount = conversation.unreadCount || 0;

            return (
              <button
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
                className={`w-full p-4 border-b border-border hover:bg-accent/50 transition-colors text-left ${
                  isActive ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={otherUser?.image || undefined} />
                      <AvatarFallback>
                        {getInitials(otherUser?.name || null)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator - you can add online status logic here */}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold truncate ${unreadCount > 0 ? 'text-foreground' : ''}`}>
                        {otherUser?.name || "Unknown User"}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatChatTime(lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>

                  {unreadCount > 0 && (
                    <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 text-xs font-bold">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* New Conversation Dialog */}
      <NewConversationDialog
        isOpen={isNewConversationOpen}
        onClose={() => setIsNewConversationOpen(false)}
      />
    </div>
  );
}
