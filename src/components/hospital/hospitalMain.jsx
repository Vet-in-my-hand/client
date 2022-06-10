import { Container, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import HospitalUpdateModal from "../modal/hospitalUpdateModal";

function HospitalMain() {
    const [hospitalInfo, setHospitalInfo] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openModal = () => {
        setIsPopupOpen(true);
    };

    const onCloseButtonHandler = (props) => {
        setIsPopupOpen(props)
    }
    useEffect(() => {
        getHospitalInfo.call(this, setHospitalInfo)
    }, []);

    return (
            <Container component='main' maxWidth="md">
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
                        안녕하세요 @@@님!
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '7%',
                    }}
                >
                    <Typography
                        component='h2'
                        variant='h4'>
                        우리병원 정보
                    </Typography>
                    <div>
                        <p>영업시간: {hospitalInfo.openClose}</p>
                        <p>진료동물: {hospitalInfo.diagnosis}</p>
                        <p>수술가능: {hospitalInfo.operation}</p>
                        <p>추가정보: {hospitalInfo.about}</p>
                    </div>
                    <Button
                        onClick={openModal}>
                        정보수정하기
                    </Button>
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