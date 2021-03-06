import { Container, Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { collection, doc, getDoc, getDocs, addDoc, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import UserReserveModal from "../reserve/userReserveModal";
import _ from 'lodash'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserMain() {
    const navigate = useNavigate();

    const [isOpenChecked, setIsOpenChecked] = useState(false)
    const [userInfo, setUserInfo] = useState('');
    const [userCare, setUserCare] = useState([]);
    const [hospitalInfo, setHospitalInfo] = useState([]);
    const [userReserve, setRserReserve] = useState([]);

    useEffect(() => {
        const key = 'userToken'
        const docRef = doc(dbService, "users", localStorage.getItem(key))
        getDoc(docRef)
        .then((data) => {
            const docs = query(collection(dbService, "reservation"), where("name", "==", data.data().name))
            const result = getDocs(docs)
            setUserInfo(() => Object.assign({}, data.data()))
            return result
        })
        .then((result) => {
            result.forEach(e => {
                setRserReserve((prev) => [...prev, e.data()])
            })
        })

        getDoc(docRef)
        .then((data) => {
            const docs = query(collection(dbService, "care"), where("name", "==", data.data().name))
            const result = getDocs(docs)
            return result
        })
        .then((result) => {
            result.forEach(e => {
                setUserCare((prev) => [...prev, e.data()])
            })
        })

        getDocs(collection(dbService, "hospital"))
        .then((result) => {
            result.forEach(e => {
                console.log(result)
                setHospitalInfo((prev) => [...prev, e.data()])
            })
        })
    }, [])

    const onCloseButtonHandler = (props) => {
        setIsOpenChecked(props)
    }

    const onReserveEventHandler = (obj, checked) => {
        const reservedObj = _.cloneDeep(obj)
        addDoc(collection(dbService, 'reservation'), {
            about: reservedObj.about,
            date: reservedObj.date,
            hospital: reservedObj.hospital,
            time: reservedObj.time,
            name: userInfo.name,    //?????? ??????
        })
        setIsOpenChecked(checked)
    }

    const onModalButtonClickHanlder = (clicked) => () => { setIsOpenChecked(clicked) }
    const listClickHandler = () => { setIsOpenChecked(true) }
        
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
                        ??????????????? {userInfo.name}???!
                        <Button
                            color="error"
                            variant="contained"
                            onClick={logoutHandler}
                        >
                            ????????????
                        </Button>
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
                    component="h2"
                    variant="h4"
                    >
                        ???????????? ??????
                </Typography>
            <List>
                <ListItem>
                    <ListItemText primary='??????' />
                    <ListItemText primary='????????????' />
                    <ListItemText primary='??????' />
                    <ListItemText primary='?????????' />
                </ListItem>
                {hospitalInfo.map((item, i) => {
                    return (
                        <ListItem
                            button={true}
                            key={i}
                            disablePadding={true}
                            onClick={listClickHandler}
                        >
                            <ListItemText 
                                sx={{ width: 200 }}
                                primary={item.hospitalName} />
                            <ListItemText 
                                sx={{ width: 200 }}
                                secondary={item.hospitalTel} />
                            <ListItemText 
                                sx={{ width: 200 }}
                                secondary={item.address} />
                            <ListItemText 
                                sx={{ width: 200 }}
                                secondary={item.email} />
                        </ListItem>
                )})}
            </List>
                <UserReserveModal
                    isOpenModal={isOpenChecked}
                    onReserveEvent={onReserveEventHandler}
                    close={onCloseButtonHandler}
                >
                </UserReserveModal>
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
                    component="h2"
                    variant="h4"
                >
                    ??? ?????? ??????
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary='??????' />
                        <ListItemText primary='????????????' />
                        <ListItemText primary='????????????' />
                        <ListItemText primary='??????' />
                    </ListItem>
                    {userReserve.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                disablePadding={true}
                            >
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.hospital} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.date} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.time} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.about} />
                            </ListItem>
                )})}
            </List>
                <Button
                    onClick={onModalButtonClickHanlder(true)}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    ????????????
                </Button>
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
                    component="h2"
                    variant="h4"
                >
                        ??? ?????? ??????
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary='??????' />
                        <ListItemText primary='????????????' />
                        <ListItemText primary='????????????' />
                        <ListItemText primary='??????' />
                    </ListItem>
                    {userCare.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                disablePadding={true}
                            >
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.hospital} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.date} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.time} />
                                <ListItemText 
                                    sx={{ width: 200 }}
                                    secondary={item.about} />
                            </ListItem>
                    )})}
                </List>
            </Box>
        </Container>
    )
}

export default UserMain;