import {useState, useEffect} from 'react';
import '../home.css';
import NavBar from '../components/navbar';
import RightProfileBar from '../components/RightProfileBar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const HealthAI = () => {
    const [responseapi, setResponseapi] = useState("");
    const [messages, setMessages] = useState([{
            message: "Hello! This is MediGuide-AI. What do you want to know about your health? ",
            sentTime: "just now",
            sender: "Health-AI"
        },]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendRequest = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage
        ]);
        setIsTyping(true);

        try {
            const response = await processMessageToChatGPT([
                ...messages,
                newMessage
            ]);
            const content = response.choices[0] ?. message ?. content;
            if (content) {
                const chatGPTResponse = {
                    message: content,
                    sender: "Health-AI"
                };
                setMessages((prevMessages) => [
                    ...prevMessages,
                    chatGPTResponse
                ]);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem("token");
        const fetchData = async () => {
          try {
            // Make GET request to backend API
            const response1 = await axios.get(
              "http://localhost:5000/api/v1/get/getdata",
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`, // Use stored token directly
                },
              }
            );
    
            // Set data state with the response data
            if (response1.length > 4) {
              // Update the response to include only the last 4 objects
              setResponseapi(response1.slice(-4));
            }
            else{
                setResponseapi(response1)
            }
            setData(responseapi.data);
            console.log(responseapi.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData(); // Call the fetchData function when the component mounts
      }, []);

    async function processMessageToChatGPT(chatMessages) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "Health-AI" ? "assistant" : "user";
            return {role, content: messageObject.message};
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role: "system",
                    content: `I am a Health-AI. I am here to assist you with your health insights. Use this data to give my health insights in 3 sentence. ${responseapi}`
                },
                ... apiMessages,
            ]
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });

        return response.json();
    }

    return (
        <div className="Health-Dashboard">
            <NavBar/>


            <div id="main">
                <div id="greeting" className="card">
                    <h2>Your Health Analysis</h2>
                    <p id="greeting-message">This is your detailed health based on your personal health data. This is predicted by AI.</p>
                </div>

                <div id="cards" className="card">
                    <h2>Health-AI</h2>
                    <div style={
                        {
                            position: "relative",
                            height: "800px",
                            width: "700px"
                        }
                    }>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList scrollBehavior="smooth"
                                    typingIndicator={
                                        isTyping ? <TypingIndicator content="MediGuide is typing"/> : null
                                }>
                                    {
                                    messages.map((message, i) => {
                                        console.log(message)
                                        return <Message key={i}
                                            model={message}/>
                                    })
                                } </MessageList>
                                <MessageInput placeholder="Send a Message"
                                    onSend={handleSendRequest}/>
                            </ChatContainer>
                        </MainContainer>
                    </div>

                    {/* Repeat for other cards */} </div>


                {/* Repeat for other sections */} </div>
            <RightProfileBar/>


        </div>


    );
}

export default HealthAI;