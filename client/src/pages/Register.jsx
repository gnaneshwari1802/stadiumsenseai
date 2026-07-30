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

import {

registerUser

} from "../services/authApi";

import {

useNavigate

} from "react-router-dom";

function Register(){

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

);

}

export default Register;
