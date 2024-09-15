import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";


const steps = [{
        id: "1",
        message: "Hello! How can I assist you today?",
        trigger: "options",
    },
    {
        id: "options",
        options: [
            { value: "suggest", label: "Suggest a fruit", trigger: "suggest-fruit" },
            {
                value: "details",
                label: "Get details about a fruit",
                trigger: "fruit-details",
            },
        ],
    },
    {
        id: "suggest-fruit",
        message: "How about trying an Apple? Would you like more details?",
        trigger: "more-info",
    },
    {
        id: "fruit-details",
        message: "Which fruit do you want details about?",
        trigger: "fruit-choice",
    },
    {
        id: "fruit-choice",
        options: [
            { value: "apple", label: "Apple", trigger: "apple-details" },
            { value: "banana", label: "Banana", trigger: "banana-details" },
            { value: "orange", label: "Orange", trigger: "orange-details" },
        ],
    },
    {
        id: "apple-details",
        message: "Apples are rich in fiber and Vitamin C.",
        end: true,
    },
    {
        id: "banana-details",
        message: "Bananas are great for energy and high in potassium.",
        end: true,
    },
    {
        id: "orange-details",
        message: "Oranges are packed with Vitamin C and support immune health.",
        end: true,
    },
    {
        id: "more-info",
        options: [
            { value: "yes", label: "Yes", trigger: "fruit-details" },
            { value: "no", label: "No, thank you.", trigger: "end" },
        ],
    },
    {
        id: "end",
        message: "Great! Let me know if you need more help.",
        end: true,
    },
];

// Custom chatbot theme
const theme = {
    background: "#f5f8fb",
    fontFamily: "Arial",
    headerBgColor: "#4CAF50",
    headerFontColor: "#fff",
    headerFontSize: "18px",
    botBubbleColor: "#4CAF50",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4CAF50",
};

function ChatBotPage() {
    return (
        <>
        <div style = {
            {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
            }
        } >
        <ThemeProvider theme = { theme } >
        <ChatBot steps = { steps }/>{" "} 
        </ThemeProvider>{" "} 
        </div>{" "} 
        </>
    );
}

export default ChatBotPage;