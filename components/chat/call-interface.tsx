"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import type { User } from "@/types";

interface CallInterfaceProps {
  user: User;
  callType: "voice" | "video";
  onEndCall: () => void;
}

export function CallInterface({ user, callType, onEndCall }: CallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<"connecting" | "ringing" | "connected">("connecting");

  useEffect(() => {
    // Simulate call connection
    const connectTimer = setTimeout(() => {
      setCallStatus("ringing");
    }, 1000);

    const answerTimer = setTimeout(() => {
      setCallStatus("connected");
    }, 3000);

    return () => {
      clearTimeout(connectTimer);
      clearTimeout(answerTimer);
    };
  }, []);

  useEffect(() => {
    if (callStatus === "connected") {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center p-4"
    >
      {/* Call Info */}
      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary/20">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback className="text-4xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </motion.div>

        <h2 className="text-3xl font-bold mb-2">{user.name || "Unknown User"}</h2>
        
        {callStatus === "connecting" && (
          <p className="text-muted-foreground animate-pulse">Connecting...</p>
        )}
        {callStatus === "ringing" && (
          <p className="text-muted-foreground animate-pulse">Ringing...</p>
        )}
        {callStatus === "connected" && (
          <p className="text-muted-foreground">{formatDuration(callDuration)}</p>
        )}
      </div>

      {/* Video placeholder (for video calls) */}
      {callType === "video" && !isVideoOff && (
        <div className="w-full max-w-2xl aspect-video bg-muted rounded-2xl mb-8 flex items-center justify-center">
          <p className="text-muted-foreground">Video feed will appear here</p>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex items-center gap-4">
        {/* Mute/Unmute */}
        <Button
          size="icon"
          variant={isMuted ? "destructive" : "secondary"}
          className="h-14 w-14 rounded-full"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {/* Video On/Off (for video calls) */}
        {callType === "video" && (
          <Button
            size="icon"
            variant={isVideoOff ? "destructive" : "secondary"}
            className="h-14 w-14 rounded-full"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          </Button>
        )}

        {/* End Call */}
        <Button
          size="icon"
          variant="destructive"
          className="h-16 w-16 rounded-full"
          onClick={onEndCall}
        >
          <PhoneOff className="h-7 w-7" />
        </Button>

        {/* Speaker On/Off */}
        <Button
          size="icon"
          variant={isSpeakerOn ? "secondary" : "outline"}
          className="h-14 w-14 rounded-full"
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
        >
          {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </Button>
      </div>

      {/* Info message */}
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-md">
        This is a demo call interface. For real calls, WebRTC integration is required.
      </p>
    </motion.div>
  );
}
