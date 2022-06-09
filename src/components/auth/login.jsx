import { TextField, Typography, Grid, Button, Box, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
function Login () {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        loginOption: "",
    })

    const {
        email, password,
    } = inputs;

    const [loginOption, setLoginOption] = useState('');
    const handleChange = (event) => {
        setLoginOption(event.target.value);
      };

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const loginHandler = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode==='auth/user-not-found')
                alert("가입한 회원이 아닙니다.")
            else if(errorCode==='auth/wrong-password')
                alert("비밀번호가 다릅니다.")
            else if(errorCode==='auth/too-many-requests')
                alert("너무 많이 로그인 시도를 했습니다. 잠시 뒤에 하세요.")
            console.log(errorCode, errorMessage);
          });
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '20%',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h3">
                        로그인
                    </Typography>

                </Box>
                <Box component="form" onSubmit={loginHandler} sx={{mt: 1}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Radio
                            checked={loginOption === 'hospital'}
                            value="hospital"
                            onChange={handleChange}
                            >
                        </Radio>
                            <label>병원으로 로그인</label>
                        </Grid>
                        <Grid item xs={6}>
                        <Radio
                            checked={loginOption === 'user'}
                            value="user"
                            onChange={handleChange}
                            >
                        </Radio>
                            <label>반려인으로 로그인</label>
                        </Grid>
                    </Grid>
                    <Grid
                        item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                label="이메일"
                                name="email"
                                id="email"
                                variant="standard"
                                autoFocus
                                onChange={onChange}
                            >
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="비밀번호"
                                name="password"
                                id="password"
                                variant="standard"
                                autoFocus
                                onChange={onChange}
                            >
                            </TextField>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            회원가입
                        </Button>
                    </Box>
            </Container>

        </div>
    )
}

export default Login;