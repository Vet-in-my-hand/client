import { Container, Box, Typography, Grid, Button, List, ListItem, ListItemText } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import HospitalUpdateModal from "../modal/hospitalUpdateModal";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function HospitalMain() {
    const [hospitalInfo, setHospitalInfo] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const navigate = useNavigate();

    const openModal = () => {
        setIsPopupOpen(true);
    };

    const onCloseButtonHandler = (props) => {
        setIsPopupOpen(props)
    }
    useEffect(() => {
        getHospitalInfo.call(this, setHospitalInfo)
    }, []);

    const logoutHandler = () => {
        const auth = getAuth();
        signOut(auth);
        localStorage.clear();
        navigate('/login');
    }
    return (
            <Container component='main' maxWidth="md" sx={{ height: '88vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '10%',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h3">
                        안녕하세요 {hospitalInfo.name}님!
                        <Button
                            color="error"
                            variant="contained"
                            onClick={logoutHandler}
                        >
                            로그아웃
                        </Button>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '7%',
                        ml: '10%'
                    }}
                >
                    <Typography
                        component='h2'
                        variant='h4'
                        >
                            우리병원 정보
                        <Button
                            onClick={openModal}
                        >
                            정보수정하기
                        </Button>
                    </Typography>
                    <List sx={{ width: '100%'}}>
                        <ListItem>
                            <ListItemText 
                                primary="영업시간"
                                secondary={hospitalInfo.openClose}></ListItemText>
                            <ListItemText 
                                primary="진료동물"  
                                secondary={hospitalInfo.diagnosis}></ListItemText>
                            <ListItemText 
                                primary="수술가능"
                                secondary={hospitalInfo.operation}></ListItemText>
                            <ListItemText 
                                primary="추가정보"
                                secondary={hospitalInfo.about}></ListItemText>
                        </ListItem>
                    </List>
                    <div>
                    {isPopupOpen &&
                        <HospitalUpdateModal
                            open={isPopupOpen}
                            close={onCloseButtonHandler}
                            info={hospitalInfo}
                        >
                        </HospitalUpdateModal>
                    }
                </div>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '50px',
                    }}>
                    <Grid container>
                        <Grid item xs={6}>
                                <Button
                                    size="large"
                                    color="info"
                                    href="/hospital/reserve"
                                    variant="outlined"
                                >
                                    예약확인
                                </Button>
                        </Grid>
                        <Grid item xs={6}>
                                <Button
                                    size="large"
                                    color="info"
                                    href="/hospital/care"
                                    variant="outlined"
                                >
                                    진료내역
                                </Button>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
    )
}
async function getHospitalInfo(setHospitalInfo) {
    const key = 'userToken'
    const ref = query(collection(dbService, "hosInfo"), where("id", "==", localStorage.getItem(key)));
    const snapshot = await getDocs(ref);
    snapshot.forEach((data) => {
        setHospitalInfo(() => Object.assign({}, data.data()));
    });
}
export default HospitalMain;