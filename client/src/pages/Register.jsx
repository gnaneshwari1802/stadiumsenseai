import {

useState

} from "react";

import {

Container,

Paper,

Typography,

TextField,

Button,

Alert

} from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {

registerUser

} from "../services/authApi";

import {

useNavigate

} from "react-router-dom";

function Register({ mode, toggleTheme }){

const navigate=

useNavigate();

const [name,setName]=

useState("");

const [email,setEmail]=

useState("");

const [password,setPassword]=

useState("");

const [message,setMessage]=

useState("");

const register=async()=>{

try{

await registerUser({

name,

email,

password

});

setMessage(

"Registration Successful"

);

setTimeout(()=>{

navigate("/login");

},1000);

}

catch(err){

    console.log(
        "REGISTER ERROR:",
        err.response?.data || err.message
    );

    setMessage(
        err.response?.data?.message ||
        err.message ||
        "Registration Failed"
    );

}

};

return(

<>
<Tooltip title={mode === "light" ? "Switch to dark theme" : "Switch to light theme"}>
  <IconButton onClick={toggleTheme} sx={{ position: "fixed", top: 16, right: 16 }} color="primary" aria-label="Toggle color theme">
    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
  </IconButton>
</Tooltip>

<Container maxWidth="sm">

<Paper

sx={{

p:4,

mt:8,

borderRadius:4

}}

>

<Typography

variant="h4"

mb={3}

>

Register

</Typography>

{message &&

<Alert severity="info">

{message}

</Alert>

}

<TextField

fullWidth

label="Name"

margin="normal"

value={name}

onChange={(e)=>

setName(e.target.value)

}

/>

<TextField

fullWidth

label="Email"

margin="normal"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

/>

<TextField

fullWidth

type="password"

label="Password"

margin="normal"

value={password}

onChange={(e)=>

setPassword(e.target.value)

}

/>

<Button

fullWidth

variant="contained"

sx={{mt:3}}

onClick={register}

>

Create Account

</Button>

</Paper>

</Container>

</>

);

}

export default Register;
