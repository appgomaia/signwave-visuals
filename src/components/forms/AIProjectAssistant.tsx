import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIProjectAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIProjectAssistant: React.FC<AIProjectAssistantProps> = ({
  open,
  onOpenChange
}) => {
  console.log('AIProjectAssistant rendered with open:', open);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [projectSummary, setProjectSummary] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const startConversation = async () => {
    setIsLoading(true);
    setConversationStarted(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-project-assistant', {
        body: {
          messages: [
            {
              role: 'user',
              content: 'Hello, I would like to start a new project but I\'m not sure how to explain what I need.'
            }
          ]
        }
      });

      if (error) throw error;

      const newMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages([newMessage]);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-project-assistant', {
        body: {
          messages: conversationHistory
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateProjectSummary = async () => {
    if (messages.length < 4) {
      toast({
        title: "More information needed",
        description: "Please continue the conversation to gather more project details.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-project-assistant', {
        body: {
          messages: conversationHistory,
          action: 'summarize'
        }
      });

      if (error) throw error;

      setProjectSummary(data.message);
      
      toast({
        title: "Project Summary Generated!",
        description: "Your project details have been compiled. You can now request a quote.",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate project summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationStarted(false);
    setProjectSummary(null);
    setInput('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 bg-red-100 border-4 border-red-500">
        <div className="p-4 bg-yellow-200">
          <h2>DEBUG: Dialog is open! conversationStarted: {conversationStarted.toString()}</h2>
          <h2>DEBUG: projectSummary: {projectSummary ? 'exists' : 'null'}</h2>
          <h2>DEBUG: messages length: {messages.length}</h2>
        </div>
        
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            AI Project Assistant
          </DialogTitle>
          <p className="text-muted-foreground">
            Let our AI assistant help you define your perfect signage project
          </p>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 bg-green-100">
          {!conversationStarted && !projectSummary ? (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center p-8 bg-blue-100">
              <div className="text-center max-w-2xl">
                <div className="mb-8">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-4">
                    <Bot className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Welcome to Your Personal Project Assistant
                  </h3>
                  <p className="text-muted-foreground text-lg mb-8">
                    Not sure how to describe your signage needs? No problem! Our AI assistant 
                    will ask you simple questions to help define your perfect project. 
                    Whether it's signs, banners, t-shirts, or promotional materials, 
                    we'll guide you through every step.
                  </p>
                </div>
                
                <GlassCard className="p-6 mb-6">
                  <h4 className="font-semibold mb-3">What we'll help you define:</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Product type & specifications
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Size and format preferences
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Design and style needs
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Timeline and budget
                    </div>
                  </div>
                </GlassCard>

                <button 
                  onClick={(e) => {
                    console.log('Start My Project button clicked!', e);
                    startConversation();
                  }}
                  disabled={isLoading}
                  className="h-12 px-8 text-lg bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      DEBUG: Start My Project
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : projectSummary ? (
            // Project Summary Screen - SIMPLIFIED FOR NOW
            <div className="p-8 bg-purple-100">
              <h3>Project Summary Complete!</h3>
              <p>{projectSummary}</p>
            </div>
          ) : (
            // Chat Interface - SIMPLIFIED FOR NOW
            <div className="p-8 bg-orange-100">
              <h3>Chat Interface (simplified)</h3>
              <p>Messages: {messages.length}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};