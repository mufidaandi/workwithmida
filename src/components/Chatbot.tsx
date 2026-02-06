"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi there! 👋 I'm Mida's AI assistant. I can answer questions about her services, skills, availability, and how she can help your business. What would you like to know?",
};

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "Can I see sample work?",
  "What are your rates?",
  "How do I get started?",
];

function MessageContent({ content }: { content: string }) {
  // Parse markdown-style links: [text](#anchor)
  const linkRegex = /\[([^\]]+)\]\((#[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const [fullMatch, text, href] = match;
    const matchStart = match.index;

    // Add text before the link
    if (matchStart > lastIndex) {
      parts.push(content.substring(lastIndex, matchStart));
    }

    // Add the link
    parts.push(
      <a
        key={matchStart}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="text-accent-600 dark:text-blush-300 underline underline-offset-2 hover:text-accent-700 dark:hover:text-blush-200 font-medium cursor-pointer"
      >
        {text}
      </a>,
    );

    lastIndex = matchStart + fullMatch.length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? <span key={`text-${i}`}>{part}</span> : part,
      )}
    </>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent, suggestedMessage?: string) => {
    e.preventDefault();
    const messageToSend = suggestedMessage || input.trim();
    if (!messageToSend || isLoading) return;

    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: messageToSend }],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting right now. Please try again or reach out directly via the contact form!",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, something went wrong. Please try again or use the contact form to reach Muhamida directly!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isOpen
            ? "bg-accent-800 text-white"
            : "bg-accent-600 text-white hover:bg-accent-700 animate-subtle-pulse"
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white dark:bg-[#1e1a16] rounded-3xl shadow-2xl shadow-accent-900/10 dark:shadow-accent-900/40 border border-blush-100 dark:border-accent-700 overflow-hidden flex flex-col"
            style={{ height: "500px", maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 px-5 py-4 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="font-serif font-semibold text-sm">
                    Mida&apos;s Assistant
                  </p>
                  <p className="text-xs text-white/70">
                    Ask me anything about Muhamida&apos;s services
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50/50 dark:bg-[#1a1612]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-accent-100 dark:bg-accent-700"
                        : "bg-blush-100 dark:bg-accent-700/50"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User
                        size={14}
                        className="text-accent-600 dark:text-cream-200"
                      />
                    ) : (
                      <Bot
                        size={14}
                        className="text-blush-600 dark:text-blush-300"
                      />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent-600 text-white rounded-br-md"
                        : "bg-white dark:bg-accent-800/60 border border-blush-100 dark:border-accent-700 text-accent-800/80 dark:text-cream-200 rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <MessageContent content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 bg-blush-100 dark:bg-accent-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot
                      size={14}
                      className="text-blush-600 dark:text-blush-300"
                    />
                  </div>
                  <div className="bg-white dark:bg-accent-800/60 border border-blush-100 dark:border-accent-700 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-blush-300 dark:bg-accent-500 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-blush-300 dark:bg-accent-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-blush-300 dark:bg-accent-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {showSuggestions && messages.length === 1 && !isLoading && (
              <div className="px-4 pb-3 bg-cream-50/50 dark:bg-[#1a1612]">
                <p className="text-xs text-accent-800/40 dark:text-cream-500/40 mb-2 font-medium">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={(e) => sendMessage(e, question)}
                      className="text-xs bg-white dark:bg-accent-800/50 border border-blush-200 dark:border-accent-700 text-accent-700 dark:text-cream-300 px-3 py-1.5 rounded-full hover:bg-blush-50 dark:hover:bg-accent-700/50 hover:border-blush-300 dark:hover:border-accent-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="p-3 border-t border-blush-100 dark:border-accent-700 bg-white dark:bg-[#1e1a16] flex-shrink-0"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-cream-50 dark:bg-accent-800/60 border border-blush-100 dark:border-accent-700 rounded-full text-sm text-accent-800 dark:text-cream-100 placeholder:text-accent-800/30 dark:placeholder:text-cream-500/40 focus:outline-none focus:ring-2 focus:ring-blush-200 dark:focus:ring-accent-500 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-accent-600 text-white rounded-full flex items-center justify-center hover:bg-accent-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
