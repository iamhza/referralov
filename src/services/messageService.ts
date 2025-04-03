
import { supabase } from "@/integrations/supabase/client";
import { Message, MessageFormData } from "@/types/message";
import { toast } from "@/hooks/use-toast";

export const messageService = {
  /**
   * Get messages for a specific referral
   */
  async getMessages(referralId: number): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('referral_id', referralId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error loading messages",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Message[];
    } catch (error) {
      console.error("Unexpected error in getMessages:", error);
      return [];
    }
  },

  /**
   * Send a new message
   */
  async sendMessage(messageData: MessageFormData): Promise<Message | null> {
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to send messages",
          variant: "destructive",
        });
        return null;
      }

      const { data, error } = await supabase
        .from('messages')
        .insert({
          referral_id: messageData.referral_id,
          sender_id: session.user.id,
          recipient_id: messageData.recipient_id,
          content: messageData.content,
        })
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Error sending message",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      return data as Message;
    } catch (error) {
      console.error("Unexpected error in sendMessage:", error);
      return null;
    }
  },

  /**
   * Mark messages as read
   */
  async markAsRead(messageIds: string[]): Promise<boolean> {
    if (!messageIds.length) return true;
    
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', messageIds);

      if (error) {
        console.error("Error marking messages as read:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Unexpected error in markAsRead:", error);
      return false;
    }
  },

  /**
   * Get unread message count for the current user
   */
  async getUnreadCount(): Promise<number> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return 0;
      }

      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', session.user.id)
        .eq('read', false);

      if (error) {
        console.error("Error fetching unread count:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error in getUnreadCount:", error);
      return 0;
    }
  }
};
