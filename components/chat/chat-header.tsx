"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, Ban, Flag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@/types";

interface ChatHeaderProps {
  user: User;
  isOnline?: boolean;
  isTyping?: boolean;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
}

export function ChatHeader({ user, isOnline, isTyping, onVoiceCall, onVideoCall }: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBlock = () => {
    if (confirm(`Are you sure you want to block ${user.name}? You won't receive messages from them.`)) {
      alert("Block feature - Coming soon! This will prevent messages from this user.");
      setShowMenu(false);
    }
  };

  const handleReport = () => {
    if (confirm(`Report ${user.name} for inappropriate behavior?`)) {
      alert("Report feature - Coming soon! This will notify administrators.");
      setShowMenu(false);
    }
  };

  return (
    <div className="h-16 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
          )}
        </div>
        <div>
          <h2 className="font-semibold">{user.name || "Unknown User"}</h2>
          <p className="text-xs text-muted-foreground">
            {isTyping ? "typing..." : isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onVoiceCall}
          title="Voice call"
          className="hover:bg-accent"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onVideoCall}
          title="Video call"
          className="hover:bg-accent"
        >
          <Video className="h-5 w-5" />
        </Button>
        
        {/* More options menu */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-accent"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {showMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowMenu(false)}
                />
                
                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 p-2 bg-popover border border-border rounded-xl shadow-2xl min-w-[200px] z-50"
                >
                  <button
                    onClick={handleBlock}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left text-destructive"
                  >
                    <Ban className="h-4 w-4" />
                    <span className="text-sm font-medium">Block User</span>
                  </button>
                  <button
                    onClick={handleReport}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left text-destructive"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm font-medium">Report User</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
