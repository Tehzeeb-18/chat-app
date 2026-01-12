"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Plus, X, Image as ImageIcon, FileText, Video, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (content: string, fileData?: { url: string; type: string; name: string; size: number }) => void;
  onTyping?: (isTyping: boolean) => void;
  disabled?: boolean;
}

const EMOJI_LIST = [
  "😊", "😂", "🤣", "❤️", "😍", "😘", "👍", "👏", "🙏", "💯",
  "🔥", "✨", "🎉", "💪", "👌", "🙌", "😎", "🤔", "😢", "😭",
  "😡", "🥰", "😇", "🤗", "🤩", "😴", "🤤", "😋", "🤪", "😜"
];

export function MessageInput({
  onSendMessage,
  onTyping,
  disabled,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (onTyping) {
      onTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 1000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max size is 10MB");
        return;
      }
      setSelectedFile(file);
      setShowFileMenu(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFile) {
      // Upload file first
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onSendMessage(message.trim() || selectedFile.name, {
            url: data.url,
            type: selectedFile.type,
            name: selectedFile.name,
            size: selectedFile.size,
          });
          setSelectedFile(null);
          setMessage("");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    } else if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
    
    if (onTyping) onTyping(false);
    inputRef.current?.focus();
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />;
    if (file.type.startsWith("audio/")) return <Music className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {selectedFile && (
        <div className="mb-3 p-2 bg-muted rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getFileIcon(selectedFile)}
            <span className="text-sm truncate">{selectedFile.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setSelectedFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowFileMenu(!showFileMenu)}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {showFileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-2 p-2 bg-popover border border-border rounded-xl shadow-2xl min-w-[200px]"
              >
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Photos</span>
                </button>
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium">Videos</span>
                </button>
                <button
                  type="button"
                  onClick={() => documentInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left"
                >
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Documents</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={imageInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*"
        />
        <input
          ref={videoInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="video/*"
        />
        <input
          ref={documentInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
        />

        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <Smile className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {showEmoji && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-2 p-2 md:p-3 bg-popover border border-border rounded-xl shadow-2xl grid grid-cols-5 md:grid-cols-6 gap-1 md:gap-2 max-h-64 overflow-y-auto"
                style={{ width: '240px', maxWidth: '90vw' }}
              >
                {EMOJI_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl md:text-3xl hover:bg-accent rounded-lg p-1 md:p-2 transition-all hover:scale-110 active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Input
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={disabled || isUploading}
          className="flex-1"
          autoComplete="off"
        />

        <Button
          type="submit"
          disabled={(!message.trim() && !selectedFile) || disabled || isUploading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
