"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MessageInput } from "@/components/chat/message-input";
import { CallInterface } from "@/components/chat/call-interface";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message, User } from "@/types";

export default function ConversationPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCall, setActiveCall] = useState<"voice" | "video" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = params.conversationId as string;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const messagesRes = await fetch(`/api/messages/${conversationId}`);
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
        
        // Mark messages as read
        const unreadMessages = messagesData.filter(
          (msg: Message) => !msg.read && msg.receiverId === session?.user?.id
        );
        
        if (unreadMessages.length > 0) {
          // Mark as read in background
          fetch(`/api/messages/${conversationId}/read`, {
            method: 'POST',
          }).catch(console.error);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (!conversationId || !session?.user?.id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch messages
        await fetchMessages();

        // Fetch conversation to get other user
        const convRes = await fetch(`/api/conversations`);
        const conversations = await convRes.json();
        const currentConv = conversations.find(
          (c: any) => c.id === conversationId
        );

        if (currentConv) {
          const other = currentConv.participants.find(
            (p: User) => p.id !== session.user.id
          );
          setOtherUser(other);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Poll for new messages every 2 seconds
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [conversationId, session?.user?.id]);

  const handleSendMessage = async (content: string, fileData?: { url: string; type: string; name: string; size: number }) => {
    if (!session?.user?.id || !otherUser) return;

    try {
      const messageData: any = {
        content,
        conversationId,
        receiverId: otherUser.id,
      };

      if (fileData) {
        messageData.type = fileData.type.startsWith("image/") ? "image" : "file";
        messageData.fileUrl = fileData.url;
        messageData.fileName = fileData.name;
        messageData.fileSize = fileData.size;
        messageData.fileMimeType = fileData.type;
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prev) => [...prev, newMessage]);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleVoiceCall = () => {
    setActiveCall("voice");
  };

  const handleVideoCall = () => {
    setActiveCall("video");
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  if (activeCall && otherUser) {
    return <CallInterface user={otherUser} callType={activeCall} onEndCall={handleEndCall} />;
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col h-screen">
        <div className="h-16 border-b border-border bg-card px-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
            >
              <Skeleton className="h-16 w-64 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!otherUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader 
        user={otherUser} 
        isOnline={true} 
        isTyping={false}
        onVoiceCall={handleVoiceCall}
        onVideoCall={handleVideoCall}
      />

      <div className="flex-1 overflow-y-auto p-4 bg-background">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={message.senderId === session?.user?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={false}
      />
    </div>
  );
}
