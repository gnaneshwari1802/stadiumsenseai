import {
useState
}
from "react";


import {
Box,
Paper,
TextField,
Button,
Typography,
CircularProgress
}
from "@mui/material";


import {
toast
}
from "react-toastify";


import {
loginUser
}
from "../services/authApi";


import {
useNavigate
}
from "react-router-dom";



function Login(){


const navigate=useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);



const submit=async()=>{


if(!email || !password){

toast.error(
"Enter email and password"
);

return;

}



try{


setLoading(true);


const data=
await loginUser({
email,
password
});



localStorage.setItem(
"token",
data.token
);



localStorage.setItem(
"role",
data.role || "user"
);



toast.success(
"Login Successful"
);



navigate("/dashboard");



}
catch(err){

toast.error(
"Invalid credentials"
);

}
finally{

setLoading(false);

}


};



return(

<Box

sx={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:
"linear-gradient(135deg,#0d47a1,#42a5f5)"

}}

>


<Paper

elevation={10}

sx={{

padding:5,

width:380,

borderRadius:5,

background:
"rgba(255,255,255,0.85)",

backdropFilter:
"blur(10px)"

}}

>


<Typography

variant="h4"

align="center"

fontWeight="bold"

>

🏟

</Typography>



<Typography

variant="h5"

align="center"

mb={3}

fontWeight="bold"

>

StadiumSense AI

</Typography>




<TextField

fullWidth

label="Email"

margin="normal"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>



<TextField

fullWidth

label="Password"

type="password"

margin="normal"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<Button

fullWidth

variant="contained"

size="large"

sx={{mt:3}}

onClick={submit}

disabled={loading}

>


{
loading
?
<CircularProgress size={25}/>
:
"Login"
}


</Button>



</Paper>


</Box>

);


}


export default Login;