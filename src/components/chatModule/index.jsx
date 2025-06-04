import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatModule = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            const userMessage = inputMessage.trim();
            setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
            setInputMessage('');
            setIsLoading(true);

            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: userMessage
                                }]
                            }]
                        })
                    }
                );

                const data = await response.json();

                if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                    const aiMessage = data.candidates[0].content.parts[0].text;
                    setMessages(prev => [...prev, { text: aiMessage, sender: 'bot' }]);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error getting AI response:', error);
                setMessages(prev => [...prev, {
                    text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                    sender: 'bot'
                }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const renderMessage = (text, sender) => {
        if (sender === 'bot') {
            return (
                <ReactMarkdown
                    components={{
                        // Style code blocks
                        code: ({ node, inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline ? (
                                <pre className="code-block">
                                    <code className={match ? `language-${match[1]}` : ''} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            ) : (
                                <code className="inline-code" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        // Style links
                        a: ({ node, children, ...props }) => (
                            <a className="markdown-link" {...props}>
                                {children}
                            </a>
                        ),
                        // Style lists
                        ul: ({ node, children, ...props }) => (
                            <ul className="markdown-list" {...props}>
                                {children}
                            </ul>
                        ),
                        ol: ({ node, children, ...props }) => (
                            <ol className="markdown-list" {...props}>
                                {children}
                            </ol>
                        ),
                        // Style blockquotes
                        blockquote: ({ node, children, ...props }) => (
                            <blockquote className="markdown-blockquote" {...props}>
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
            );
        }
        return text;
    };

    return (
        <div className={`chat-module ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="chat-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h3>Chat with us</h3>
                <button className="toggle-button">
                    {isExpanded ? '−' : '+'}
                </button>
            </div>

            {isExpanded && (
                <div className="chat-container">
                    <div className="messages-container">
                        {messages.length === 0 ? (
                            <div className="welcome-message">
                                <p>👋 Hi! How can I help you today?</p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                                >
                                    {renderMessage(message.text, message.sender)}
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="message bot-message">
                                <div className="typing-indicator">...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="input-container">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="message-input"
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-button" disabled={isLoading}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatModule;
