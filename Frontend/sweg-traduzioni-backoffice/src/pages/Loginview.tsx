import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';
import { Button, Card, CardContent, createTheme ,FilledInput,Grid,InputLabel,TextField,ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const darkTheme = createTheme({
  palette:{
    mode: 'dark',
  },
});

export default function LoginView() {  
    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    function onClickButton(){
        if(username === "superadmin" && password === "superadmin"){
            navigate("/superAdmin");
        }

        if(username === "admin" && password === "admin"){
            navigate("/admin");
        }

        if(username === "user" && password === "user"){
          navigate("/todo");
        }

        else{
          setError("Username or password is incorrect");
        }
    }

    return (

      <Box display="flex" flexDirection="column" alignItems="center">
      <Card>
          <CardContent>
              <InputLabel variant="filled">Email</InputLabel>
              <FilledInput fullWidth type="text" value={username} onChange={e => setUsername(e.target.value)} />

              <InputLabel variant="filled">Password</InputLabel>
              <FilledInput fullWidth type="password" value={password} onChange={e => setPassword(e.target.value)} />  

              <Button onClick={() => onClickButton()} variant="outlined">Login</Button>
      </CardContent>
      </Card>
  </Box>
);

}
    

