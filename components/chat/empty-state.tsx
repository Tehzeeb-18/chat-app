"use client";

import { MessageSquare } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to Chat</h2>
        <p className="text-muted-foreground max-w-md">
          Select a conversation from the sidebar to start messaging, or create a
          new conversation to get started.
        </p>
      </div>
    </div>
  );
}
