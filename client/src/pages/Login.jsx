import {
  useState
} from "react";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert
} from "@mui/material";

import {
  loginUser
} from "../services/authApi";

import {
  useNavigate
} from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({

    email: "",
    password: ""

  });


  const [error, setError] = useState("");



  const submit = async () => {

    try {

      const res = await loginUser(form);


      console.log("LOGIN RESPONSE:", res);


      if(res.success && res.token){

        localStorage.setItem(
          "token",
          res.token
        );


        navigate("/");

      }

      else if(res.data?.token){

        localStorage.setItem(
          "token",
          res.data.token
        );


        navigate("/");

      }

      else {

        setError(
          res.message || "Login failed"
        );

      }


    }

    catch(err){

      console.log(err);

      setError(
        "Invalid email or password"
      );

    }

  };



  return (

    <Card
      sx={{
        width:400,
        margin:"100px auto"
      }}
    >

      <CardContent>


        <Typography
          variant="h4"
          mb={2}
        >
          Login
        </Typography>


        {
          error &&
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={()=>navigate("/register")}
              >
                Register first
              </Button>
            }
          >
            {error}
          </Alert>
        }



        <TextField

          fullWidth

          label="Email"

          margin="normal"

          value={form.email}

          onChange={(e)=>

            setForm({

              ...form,

              email:e.target.value

            })

          }

        />



        <TextField

          fullWidth

          label="Password"

          type="password"

          margin="normal"

          value={form.password}

          onChange={(e)=>

            setForm({

              ...form,

              password:e.target.value

            })

          }

        />



        <Button

          variant="contained"

          fullWidth

          sx={{
            mt:2
          }}

          onClick={submit}

        >

          Login

        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt:1
          }}
          onClick={()=>navigate("/register")}
        >
          Create an account
        </Button>



      </CardContent>


    </Card>

  );

}


export default Login;
