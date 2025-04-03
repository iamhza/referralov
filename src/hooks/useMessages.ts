
import { useState, useEffect, useCallback } from 'react';
import { Message, MessageFormData } from '@/types/message';
import { messageService } from '@/services/messageService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useMessages(referralId?: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Fetch messages for a specific referral
  const fetchMessages = useCallback(async (id?: number) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const messagesData = await messageService.getMessages(id);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error loading messages',
        description: 'Failed to load message history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Send a new message
  const sendMessage = useCallback(async (data: MessageFormData): Promise<boolean> => {
    try {
      const newMessage = await messageService.sendMessage(data);
      
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Message not sent',
        description: 'There was a problem sending your message',
        variant: 'destructive',
      });
      return false;
    }
  }, [toast]);

  // Mark messages as read
  const markMessagesAsRead = useCallback(async () => {
    // Get unread messages that are sent to current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const unreadMessages = messages
      .filter(msg => !msg.read && msg.recipient_id === session.user.id)
      .map(msg => msg.id);
      
    if (unreadMessages.length === 0) return;
    
    const success = await messageService.markAsRead(unreadMessages);
    
    if (success) {
      setMessages(prev => 
        prev.map(msg => 
          unreadMessages.includes(msg.id) ? { ...msg, read: true } : msg
        )
      );
      // Refresh unread count
      fetchUnreadCount();
    }
  }, [messages]);

  // Get unread message count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await messageService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  }, []);

  // Load messages when referral ID changes
  useEffect(() => {
    if (referralId) {
      fetchMessages(referralId);
    }
  }, [referralId, fetchMessages]);

  // Get initial unread count
  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Set up subscription to messages table
  useEffect(() => {
    const subscription = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as Message;
          
          // Only add the message if it's for the current referral
          if (referralId && newMessage.referral_id === referralId) {
            setMessages(prev => [...prev, newMessage]);
          }
          
          // Update unread count if needed
          fetchUnreadCount();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [referralId, fetchUnreadCount]);

  return {
    messages,
    isLoading,
    unreadCount,
    sendMessage,
    fetchMessages,
    markMessagesAsRead,
  };
}
