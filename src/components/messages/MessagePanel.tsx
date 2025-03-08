
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

interface MessagePanelProps {
  showMessages: boolean;
  setShowMessages: (value: boolean) => void;
}

export const MessageButton = ({ showMessages, setShowMessages }: MessagePanelProps) => (
  <div 
    className={`fixed bottom-6 right-6 z-50 transition-all duration-300 animate-fade-in ${showMessages ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
  >
    <button 
      onClick={() => setShowMessages(true)}
      className="bg-referra-500 hover:bg-referra-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
      aria-label="Open messages"
    >
      <MessageSquare className="h-6 w-6" />
    </button>
  </div>
);

export const MessagePanel = ({ showMessages, setShowMessages }: MessagePanelProps) => (
  <div 
    className={`fixed bottom-0 right-0 w-full sm:w-96 h-[calc(100vh-5rem)] sm:h-[30rem] bg-white border-l border-t sm:border-t-0 sm:border-l sm:rounded-tl-xl shadow-2xl z-50 transition-all duration-300 ease-in-out ${
      showMessages ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
    }`}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="font-semibold text-lg">Messages</h2>
      <button 
        onClick={() => setShowMessages(false)}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <span className="sr-only">Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <div className="bg-referra-200 text-referra-800 w-10 h-10 rounded-full flex items-center justify-center">JP</div>
          </Avatar>
          <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
            <p className="text-sm">Hello! I've received your referral for John Doe. We can schedule an intake next week.</p>
            <span className="text-xs text-gray-500 block mt-1">9:45 AM</span>
          </div>
        </div>
        <div className="flex items-start gap-3 flex-row-reverse">
          <Avatar>
            <div className="bg-teal-200 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center">ME</div>
          </Avatar>
          <div className="bg-referra-100 p-3 rounded-2xl rounded-tr-none">
            <p className="text-sm">Great! The client is available Tuesday or Thursday afternoon. Which works best?</p>
            <span className="text-xs text-gray-500 block mt-1">9:47 AM</span>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
      <form className="flex items-center gap-2">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-referra-400"
        />
        <button 
          type="submit"
          className="bg-referra-500 text-white p-2.5 rounded-lg hover:bg-referra-600 transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  </div>
);
