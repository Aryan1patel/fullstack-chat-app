import { useState, useEffect, useRef } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import { useTylerStore } from "../store/useTylerStore";

function TylerChatInterface() {
  const [input, setInput] = useState("");
  const { generateContent, isGenerating, generatedResponse, clearResponse } = useTylerStore();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedResponse]);

  // Function to handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      generateContent(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit(e); // Trigger form submission
    }
  };

  // Filter out duplicate messages based on content and timestamps that are very close
  const getFilteredMessages = () => {
    if (!generatedResponse || !generatedResponse.chatHistory) return [];
    
    const filtered = [];
    const seenContent = new Set();
    
    generatedResponse.chatHistory.forEach((message) => {
      // Create a unique key combining message content and role
      const contentKey = `${message.role}-${message.text}`;
      
      // Check if we've seen this message before
      if (!seenContent.has(contentKey)) {
        seenContent.add(contentKey);
        filtered.push(message);
      } else {
        // If we have seen this message before, check if it's a different timestamp
        // Only add if timestamps are significantly different (more than 2 seconds apart)
        const existingMessage = filtered.find(m => 
          `${m.role}-${m.text}` === contentKey
        );
        
        if (existingMessage) {
          const timeDiff = Math.abs(new Date(message.timestamp) - new Date(existingMessage.timestamp));
          // If time difference is significant, consider it a different message
          if (timeDiff > 2000) { // 2 seconds in milliseconds
            filtered.push(message);
          }
        }
      }
    });
    
    return filtered;
  };

  const filteredMessages = getFilteredMessages();

  return (
    <div className="h-screen bg-base-200 flex overflow-hidden">
      {/* Left side image - fixed height */}
      <div className="hidden lg:flex lg:w-1/3 bg-gradient items-center justify-center p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/tyler.jpg" 
            alt="Tyler Durden" 
            className="rounded-2xl shadow-2xl max-h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-secondary to-transparent h-32 rounded-b-2xl"></div>
          <div className="absolute bottom-8 text-center px-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Tyler Durden</h2>
            <p className="text-white opacity-80 drop-shadow-md">A charismatic nihilist who challenges societal norms and pushes boundaries. The first rule is: you do not talk about Fight Club.</p>
          </div>
        </div>
      </div>
      
      {/* Chat container - fixed height with flex layout */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header - fixed height */}
        <div className="">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder lg:hidden">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span className="text-xl">TD</span>
                </div>
              </div>
              <h1 className="text-xl font-bold">Tyler Durden</h1>
            </div>
          </div>
          <div className="flex-none">
            <button className="btn btn-ghost btn-circle" onClick={clearResponse}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main content area with fixed height layout */}
        <div className="flex-1 flex flex-col p-4 max-w-4xl mx-auto w-full h-full">
          {/* Messages area - scrollable with fixed height */}
          <div className="flex-1 overflow-y-auto mb-4 bg-base-100 rounded-box shadow-lg p-4 h-full">
            {filteredMessages.length > 0 ? (
              <div className="space-y-4">
                {filteredMessages.map((message, index) => (
                  <div 
                    key={message._id || index} 
                    className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        {message.role === 'user' ? (
                          <div className="bg-blue-400 text-white w-full h-full flex items-center justify-center">
                            <span>You</span>
                          </div>
                        ) : (
                          <div className="bg-pink-400 text-black w-full h-full flex items-center justify-center">
                            <span>TD</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-header opacity-80 text-xs">
                      {message.role === 'user' ? 'You' : 'Tyler Durden'}
                      <time className="text-xs opacity-60 ml-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </time>
                    </div>
                    <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-accent' : 'chat-bubble-neutral'}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Current response message if available and not already in history */}
                {generatedResponse && generatedResponse.response && 
                !filteredMessages.some(msg => msg.text === generatedResponse.response) && (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <div className="bg-black text-white w-full h-full flex items-center justify-center">
                          <span>TD</span>
                        </div>
                      </div>
                    </div>
                    <div className="chat-header opacity-80 text-xs">
                      Tyler Durden
                      <time className="text-xs opacity-60 ml-1">
                        {new Date().toLocaleTimeString()}
                      </time>
                    </div>
                    <div className="chat-bubble chat-bubble-accent">
                      {generatedResponse.response}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-base-content opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-lg font-medium">Start a conversation with Tyler Durden</p>
                <p className="text-sm mt-2">Challenge your perceptions and question everything</p>
              </div>
            )}
          </div>

          {/* Input area - fixed height */}
          <form onSubmit={handleSubmit} className="join w-full">
            <div className="form-control join-item flex-1">
              <textarea
                className="textarea textarea-bordered w-full focus:outline-none focus:border-accent join-item rounded-l-lg rounded-r-none resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What are you willing to lose?..."
                onKeyDown={handleKeyDown}
                rows="2"
                disabled={isGenerating}
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !input.trim()}
              className={`btn join-item ${isGenerating || !input.trim() ? 'btn-disabled' : 'btn-accent'}`}
            >
              {isGenerating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TylerChatInterface;