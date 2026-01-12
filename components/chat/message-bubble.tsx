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

  // Get the correct user for the avatar
  // message.sender is always the person who sent this specific message
  const avatarUser = message.sender;
  const isImage = message.type === "image" || message.fileMimeType?.startsWith("image/");
  const isFile = message.type === "file" || (message.fileUrl && !isImage);

  // Debug: Log avatar info
  console.log('Message bubble:', {
    isSent,
    senderName: message.sender?.name,
    senderImage: message.sender?.image?.substring(0, 50),
    receiverName: message.receiver?.name,
    receiverImage: message.receiver?.image?.substring(0, 50),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex mb-4 gap-2",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      {/* Profile picture for received messages */}
      {!isSent && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={avatarUser?.image || undefined} alt={avatarUser?.name || "User"} />
          <AvatarFallback className="text-xs">
            {getInitials(avatarUser?.name || null)}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[70%] rounded-2xl shadow-sm",
          isSent
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border"
        )}
      >
        {/* Image attachment with download button */}
        {isImage && message.fileUrl && (
          <div className="relative group bg-muted/10 min-h-[120px] max-w-full">
            <img
              src={message.fileUrl}
              alt={message.fileName || "Image"}
              className="w-full h-auto max-h-[300px] object-contain cursor-pointer"
              onClick={() => {
                const newWindow = window.open();
                if (newWindow) {
                  newWindow.document.write(`
                    <html>
                      <head><title>${message.fileName || 'Image'}</title></head>
                      <body style="margin:0;display:flex;justify-content:center;align-items:center;background:#000;">
                        <img src="${message.fileUrl}" style="max-width:100%;max-height:100vh;object-fit:contain;" />
                      </body>
                    </html>
                  `);
                }
              }}
              loading="lazy"
              onError={(e) => {
                console.error('Image failed to load');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.error-message')) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error-message flex flex-col items-center justify-center p-6 text-muted-foreground';
                  errorDiv.innerHTML = `
                    <svg class="h-10 w-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-xs">Image not available</p>
                  `;
                  parent.appendChild(errorDiv);
                }
              }}
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-7 w-7 rounded-full shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(message.fileUrl!, message.fileName || 'image.jpg');
                }}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* File attachment */}
        {isFile && message.fileUrl && (
          <div className="flex items-center gap-2 p-2.5">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{message.fileName}</p>
              <p className="text-xs opacity-70">
                {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : "File"}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 flex-shrink-0"
              onClick={() => handleDownload(message.fileUrl!, message.fileName || 'file')}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* Text content */}
        {message.content && (
          <div className="px-3 py-2">
            <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          </div>
        )}

        {/* Timestamp and read receipts */}
        <div
          className={cn(
            "flex items-center gap-1 px-3 pb-1.5 text-xs",
            isSent ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
          )}
        >
          <span>{formatMessageTime(message.createdAt)}</span>
          {isSent && (
            <span className="ml-1 flex items-center">
              {message.read ? (
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" strokeWidth={2.5} />
              ) : message.delivered ? (
                <CheckCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              )}
            </span>
          )}
        </div>
      </div>

      {/* Profile picture for sent messages */}
      {isSent && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={avatarUser?.image || undefined} alt={avatarUser?.name || "User"} />
          <AvatarFallback className="text-xs">
            {getInitials(avatarUser?.name || null)}
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
