"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import type { Conversation } from "@/types";

interface SidebarWrapperProps {
  initialConversations: Conversation[];
  currentUserId: string;
  activeConversationId?: string;
}

export function SidebarWrapper({
  initialConversations,
  currentUserId,
  activeConversationId,
}: SidebarWrapperProps) {
  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    // Refresh conversations every 10 seconds to update unread counts
    const refreshConversations = async () => {
      try {
        const response = await fetch("/api/conversations");
        if (response.ok) {
          const data = await response.json();
          setConversations(data);
        }
      } catch (error) {
        console.error("Error refreshing conversations:", error);
      }
    };

    const interval = setInterval(refreshConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Sidebar
      conversations={conversations}
      currentUserId={currentUserId}
      activeConversationId={activeConversationId}
    />
  );
}
