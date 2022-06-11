import { TextField, Typography, Grid, Button, Box, Container } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import styles from "./hospitalRegister.module.css"
import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../../firebase";
import { useNavigate } from 'react-router-dom';

function HospitalRegister() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        hospitalName: "",
        hospitalTel: "",
        extraAddress: "",
    });

    const [open, SetOpen] = useState(false);
    const handleOpen = () => SetOpen(true);
    const handleClose = () => SetOpen(false);
    const [fullAddress, setFullAddress] = useState('');
    const [zoneCode, setZoneCode] = useState('');
    const {
        email, password, confirmPassword, hospitalName, hospitalTel, extraAddress,
    } = inputs;


    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const postcodeStyle = {
        display: "block",
        position: "absolute",
        left: "35%",
        top: "10%",
        width: "600px",
        height: "600px",
        border: "1px solid black"
    }

    const Postcode = (props) => {
        const handleComplete = (data) => {
            let fullAddress = data.address;
            let zonecode = data.zonecode;
            let extraAddress = '';

            setFullAddress(fullAddress);
            setZoneCode(zonecode);

            if (data.addressType === 'R') {
                if (data.bname !== '') extraAddress += data.bname;
                if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            props.onClose()
        }
        return (
            <div>
                <DaumPostcode
                    onComplete={handleComplete}
                    style={postcodeStyle} />
                <button type='button'
                    onClick={() => { props.onClose() }} className={styles.postCode_btn}>닫기</button>
            </div>
        );
    }

    const registerHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user.uid;
            await setDoc(doc(dbService, "hospital", `${user}`),{
                hospitalName: hospitalName,
                hospitalTel: hospitalTel,
                email: email,
                address: fullAddress + " " + extraAddress,
                zoneCode: zoneCode,
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
                        variant="h3"
                    >
                        병원가입
                    </Typography>
                    <Box component="form" onSubmit={registerHandler} sx={{ mt: 1 }}>
                        <Grid
                            itme xs={12}>
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
                                label="병원이름"
                                name="hospitalName"
                                id="hospitalName"
                                fullWidth
                                required
                                onChange={onChange}
                                variant="standard"
                            />
                            <TextField
                                margin="normal"
                                label="전화번호"
                                name="hospitalTel"
                                id="hospitalTel"
                                fullWidth
                                required
                                onChange={onChange}
                                variant="standard"
                            />
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    margin="normal"
                                    label="주소"
                                    value={fullAddress}
                                    fullWidth
                                    required
                                    variant="standard"
                                />
                            </Grid>
                            <Grid>
                                <Button
                                    margin="normal"
                                    type="button"
                                    onClick={handleOpen}
                                    fullWidth
                                    variant="contained"
                                    size="medium"
                                    sx={{ mt: 3 }}
                                >주소검색</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={10}>
                                <TextField
                                    margin="normal"
                                    label="나머지 주소입력"
                                    fullWidth
                                    variant="standard"
                                    onChange={onChange}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    margin="normal"
                                    label="우편번호"
                                    value={zoneCode}
                                    fullWidth
                                    variant="standard"
                                >
                                </TextField>
                            </Grid>
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
            <div>
                {open && (
                    <Postcode
                        onClose={handleClose}
                        style={postcodeStyle}
                    />
                )}
            </div>
        </div>
    )
}

export default HospitalRegister;