"use client";

import { motion } from "framer-motion";
import { formatMessageTime } from "@/lib/utils";
import { Check, CheckCheck, FileText, Download, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Message } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
}

export function MessageBubble({ message, isSent }: MessageBubbleProps) {
  const [showImageActions, setShowImageActions] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const user = isSent ? message.sender : message.receiver;
  const isImage = message.type === "image" || message.fileMimeType?.startsWith("image/");
  const isFile = message.type === "file" || (message.fileUrl && !isImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-3 md:mb-4 gap-2",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      {/* Profile picture for received messages (left side) */}
      {!isSent && (
        <Avatar className="h-7 w-7 md:h-8 md:w-8 mt-1 flex-shrink-0">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="text-xs">
            {getInitials(user?.name || null)}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl shadow-md overflow-hidden",
          isSent
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm"
        )}
      >
        {/* Image attachment with download button */}
        {isImage && message.fileUrl && (
          <div 
            className="relative group bg-muted/10"
            onMouseEnter={() => setShowImageActions(true)}
            onMouseLeave={() => setShowImageActions(false)}
          >
            <img
              src={message.fileUrl}
              alt={message.fileName || "Image"}
              className="w-full h-auto max-h-96 object-cover cursor-pointer rounded-t-2xl"
              onClick={() => window.open(message.fileUrl!, '_blank')}
              loading="lazy"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'flex flex-col items-center justify-center p-8 text-muted-foreground';
                  errorDiv.innerHTML = `
                    <svg class="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm">Image failed to load</p>
                    <a href="${message.fileUrl}" target="_blank" class="text-xs text-primary hover:underline mt-2">Open in new tab</a>
                  `;
                  parent.appendChild(errorDiv);
                }
              }}
            />
            {showImageActions && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(message.fileUrl!, message.fileName || 'image.jpg');
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* File attachment */}
        {isFile && message.fileUrl && (
          <div className="flex items-center gap-3 p-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs opacity-70">
                {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : "File"}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => handleDownload(message.fileUrl!, message.fileName || 'file')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Text content */}
        {message.content && (
          <div className="px-4 py-2">
            <p className="text-sm break-words whitespace-pre-wrap leading-relaxed" style={{ fontSize: '15px' }}>
              {message.content}
            </p>
          </div>
        )}

        {/* Timestamp and read receipts */}
        <div
          className={cn(
            "flex items-center gap-1 px-4 pb-2 text-xs",
            isSent ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
          )}
        >
          <span>{formatMessageTime(message.createdAt)}</span>
          {isSent && (
            <span className="ml-1 flex items-center">
              {message.read ? (
                <CheckCheck className="h-4 w-4 text-blue-400" strokeWidth={2.5} />
              ) : message.delivered ? (
                <CheckCheck className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <Check className="h-4 w-4" strokeWidth={2.5} />
              )}
            </span>
          )}
        </div>
      </div>

      {/* Profile picture for sent messages (right side) */}
      {isSent && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="text-xs">
            {getInitials(user?.name || null)}
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
