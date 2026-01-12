"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Loader2, Camera, Upload } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image too large. Max size is 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
        setMessage("Image uploaded successfully!");
      } else {
        setMessage("Failed to upload image");
      }
    } catch (error) {
      setMessage("An error occurred while uploading");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: imageUrl }),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
        await update(); // Refresh session
        setTimeout(() => router.push("/chat"), 1500);
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/chat">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={imageUrl || undefined} />
                  <AvatarFallback className="text-3xl">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Camera className="h-5 w-5" />
                  )}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload from Gallery"}
              </Button>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={isLoading}
              />
            </div>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.includes("success")
                    ? "bg-green-500/10 text-green-500"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>

          {/* Delete Account Section */}
          <div className="mt-8 pt-8 border-t border-destructive/20">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. All your messages and data will be permanently deleted.
            </p>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              className="w-full"
            >
              Delete Account
            </Button>
          </div>

          {/* Delete Confirmation Dialog */}
          {showDeleteDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-card border rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-destructive mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This action cannot be undone. Please enter your password to confirm.
                </p>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteDialog(false);
                      setDeletePassword("");
                    }}
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      if (!deletePassword) {
                        setMessage("Please enter your password");
                        return;
                      }
                      
                      setIsDeleting(true);
                      try {
                        const response = await fetch("/api/auth/delete-account", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ password: deletePassword }),
                        });

                        if (response.ok) {
                          alert("Account deleted successfully");
                          router.push("/login");
                        } else {
                          const data = await response.json();
                          setMessage(data.error || "Failed to delete account");
                          setShowDeleteDialog(false);
                        }
                      } catch (error) {
                        setMessage("An error occurred");
                        setShowDeleteDialog(false);
                      } finally {
                        setIsDeleting(false);
                        setDeletePassword("");
                      }
                    }}
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Forever"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
