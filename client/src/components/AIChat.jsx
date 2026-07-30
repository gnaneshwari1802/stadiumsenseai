import { useState, useRef, useEffect } from "react";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
  Paper,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

import { motion } from "framer-motion";

import { askAI } from "../services/aiApi";

function AIChat() {

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef();

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const userMessage = {

      sender: "user",

      text: question,

      time: new Date().toLocaleTimeString()

    };

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {

      const res = await askAI(currentQuestion);

      const aiMessage = {

        sender: "ai",

        text: res.response,

        time: new Date().toLocaleTimeString()

      };

      setMessages(prev => [

        ...prev,

        aiMessage

      ]);

    }

    catch (err) {

      setMessages(prev => [

        ...prev,

        {

          sender: "ai",

          text: "❌ AI service unavailable.",

          time: new Date().toLocaleTimeString()

        }

      ]);

    }

    setLoading(false);

  };

  return (

<Card

elevation={8}

sx={{

mt:3,

borderRadius:4,

height:650,

display:"flex",

flexDirection:"column"

}}

>

<CardContent

sx={{

display:"flex",

flexDirection:"column",

height:"100%"

}}

>

<Typography

variant="h5"

fontWeight="bold"

mb={2}

>

🤖 Stadium AI Assistant

</Typography>

<Box

sx={{

flex:1,

overflowY:"auto",

pr:1

}}

>

{messages.map((msg,index)=>(

<motion.div

key={index}

initial={{

opacity:0,

y:20

}}

animate={{

opacity:1,

y:0

}}

>

<Box

display="flex"

justifyContent={

msg.sender==="user"

?

"flex-end"

:

"flex-start"

}

mb={2}

>

{msg.sender==="ai" && (

<Avatar

sx={{

mr:1,

bgcolor:"primary.main"

}}

>

<SmartToyIcon/>

</Avatar>

)}

<Paper

elevation={3}

sx={{

p:2,

maxWidth:"70%",

borderRadius:3,

background:

msg.sender==="user"

?

"#1976d2"

:

"#263238",

color:"white"

}}

>

<Typography>

{msg.text}

</Typography>

<Typography

variant="caption"

sx={{

opacity:.7

}}

>

{msg.time}

</Typography>

</Paper>

{msg.sender==="user" && (

<Avatar

sx={{

ml:1,

bgcolor:"secondary.main"

}}

>

<PersonIcon/>

</Avatar>

)}

</Box>

</motion.div>

))}

{loading && (

<Box
sx={{
  display:"flex",
  alignItems:"center"
}}
>

<CircularProgress

size={20}

/>

<Typography

sx={{

ml:2

}}

>

AI is thinking...

</Typography>

</Box>

)}

<div ref={bottomRef}/>

</Box>

<Box
sx={{
  display:"flex",
  gap:2,
  mt:2
}}
>

<TextField

fullWidth

label="Ask anything..."

value={question}

onChange={(e)=>

setQuestion(

e.target.value

)

}

onKeyDown={(e)=>{

if(e.key==="Enter"){

sendQuestion();

}

}}

>

</TextField>

<Button

variant="contained"

endIcon={<SendIcon/>}

onClick={sendQuestion}

disabled={loading}

>

Send

</Button>

</Box>

</CardContent>

</Card>

);

}

export default AIChat;