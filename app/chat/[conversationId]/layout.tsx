import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SidebarWrapper } from "@/components/chat/sidebar-wrapper";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ConversationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { conversationId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Get unread counts for each conversation
  const formattedConversations = await Promise.all(
    conversations.map(async (conv) => {
      const unreadCount = await prisma.message.count({
        where: {
          conversationId: conv.id,
          receiverId: session.user.id,
          read: false,
        },
      });

      return {
        ...conv,
        lastMessage: conv.messages[0] || null,
        unreadCount,
      };
    })
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - ONLY on desktop, NEVER on mobile */}
      <div className="hidden md:flex flex-shrink-0">
        <SidebarWrapper
          initialConversations={formattedConversations}
          currentUserId={session.user.id}
          activeConversationId={params.conversationId}
        />
      </div>
      {/* Chat area - full screen on mobile */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
