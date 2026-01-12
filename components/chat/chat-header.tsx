"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, Ban, Flag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Mobile back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/chat")}
          className="md:hidden flex-shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
          <AvatarFallback>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-base truncate">{user.name || "Unknown User"}</h2>
          <p className="text-xs text-muted-foreground">
            {isTyping ? "typing..." : isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onVoiceCall}
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onVideoCall}
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowMenu(false)}
                />
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 p-2 bg-popover border rounded-xl shadow-xl min-w-[200px] z-50"
                >
                  <button
                    onClick={handleBlock}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg text-destructive"
                  >
                    <Ban className="h-4 w-4" />
                    <span className="text-sm">Block User</span>
                  </button>
                  <button
                    onClick={handleReport}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg text-destructive"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm">Report User</span>
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
