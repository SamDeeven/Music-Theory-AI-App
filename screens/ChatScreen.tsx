import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getChatResponse, resetChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import FormattedContent from '../components/FormattedContent';

const ChatScreen: React.FC = () => {
    const { language, text } = useLanguage();
    const storageKey = `chatHistory_${language}`;

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    // Load messages from local storage when component mounts or language changes
    useEffect(() => {
        try {
            const storedJson = localStorage.getItem(storageKey);
            if (storedJson) {
                const storedMessages = JSON.parse(storedJson);
                setMessages(storedMessages);
            } else {
                setMessages([]); // Start with no messages if nothing is stored
            }
        } catch (error) {
            console.error("Error reading from local storage:", error);
            setMessages([]); // Reset on error
        }
        resetChat(); // Always reset the backend session when language/component loads
    }, [language, storageKey]);

    // Save messages to local storage whenever they change
    useEffect(() => {
        try {
            if (messages && messages.length > 0) {
                const messagesJson = JSON.stringify(messages);
                localStorage.setItem(storageKey, messagesJson);
            } else {
                // If the chat for a language is cleared, remove it from storage
                localStorage.removeItem(storageKey);
            }
        } catch (error) {
            console.error("Error writing to local storage:", error);
        }
    }, [messages, storageKey]);


    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        // Use a callback with setMessages to get the most up-to-date state
        setMessages(prevMessages => [...prevMessages, userMessage]);
        
        const currentHistory = [...messages]; // History before adding the new message
        setInput('');
        setIsLoading(true);

        try {
            const response = await getChatResponse(currentHistory, input, language);
            const modelMessage: ChatMessage = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, something went wrong.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-165px)] md:max-h-full">
            <h1 className="text-3xl font-bold mb-4 text-white hidden md:block">{text.chat}</h1>
            <div className="flex-1 overflow-y-auto bg-brand-surface p-4 rounded-lg space-y-4">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-brand-text-muted">
                        <Bot className="h-16 w-16 mb-4" />
                        <p className="text-lg">{text.chatWelcome}</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-secondary flex items-center justify-center">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                            )}
                            <div className={`max-w-md lg:max-w-xl p-3 rounded-lg ${
                                msg.role === 'user' 
                                    ? 'bg-brand-primary text-white rounded-br-none' 
                                    : 'bg-brand-primary/50 text-brand-text rounded-bl-none'
                            }`}>
                                {msg.role === 'user' ? (
                                     <p className="whitespace-pre-wrap">{msg.content}</p>
                                ) : (
                                    <FormattedContent content={msg.content} />
                                )}
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))
                )}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-secondary flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="max-w-md lg:max-w-xl p-3 rounded-lg bg-brand-primary/50 text-brand-text rounded-bl-none">
                            <LoadingSpinner />
                        </div>
                    </div>
                 )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={text.chatPlaceholder}
                        className="flex-1 p-3 bg-brand-surface border border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="bg-brand-secondary text-white p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                        <Send className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;