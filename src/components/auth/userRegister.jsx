import { TextField, Typography, Grid, Button, Box, Container } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../../firebase";
import { useNavigate } from "react-router-dom";

function UserRegister() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: "",
    });

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const {
        email, password, confirmPassword, name, phoneNumber,
    } = inputs;

    const registerHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user.uid;
            await setDoc(doc(dbService, "users", `${user}`),{
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                id: user,
            })
            navigate('/login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMassage = error.message;
            console.log(errorCode, errorMassage);
        })
    }

    return (
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
                        variant="h3"
                    >
                        반려인 가입
                    </Typography>
                    <Box component="form" onSubmit={registerHandler} sx={{ mt: 1 }}>
                        <Grid itme xs={12}>
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
                                label="비밀번호"
                                name="password"
                                id="password"
                                type="password"
                                required
                                fullWidth
                                onChange={onChange}
                                variant="standard"
                            >
                            </TextField>
                            <TextField
                                margin="normal"
                                label="비밀번호 확인"
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                required
                                fullWidth
                                onChange={onChange}
                                variant="standard"
                            />
                            <TextField
                                margin="normal"
                                label="이름"
                                name="name"
                                id="name"
                                fullWidth
                                required
                                onChange={onChange}
                                variant="standard"
                            />

                            <TextField
                                margin="normal"
                                label="전화번호"
                                name="phoneNumber"
                                id="phoneNumber"
                                fullWidth
                                required
                                onChange={onChange}
                                variant="standard"
                            />
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
                </Box>
            </Container>
    )
}

export default UserRegister;