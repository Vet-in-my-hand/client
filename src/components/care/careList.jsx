import { 
    Container, 
    List, 
    ListItem, 
    ListItemText, 
    Button,
    Box,
    Typography,
} from "@mui/material";
import { doc, getDoc, query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import CareModal from "./careModal";
import _ from 'lodash'


function CareList() {
    const [isOpenChecked, setIsOpenChecked] = useState(false)
    const [careList, setCareList] = useState([])

    useEffect(() => {
        const key = 'userToken'
        const docRef = doc(dbService, "hospital", localStorage.getItem(key))
        getDoc(docRef)
            .then((data) => {
                const docs = query(collection(dbService, "care"), where("hospital", "==", data.data().hospitalName))
                const result = getDocs(docs)
                return result
            })
            .then((result) => {
                result.forEach(e => {
                    setCareList((prev) => [...prev, e.data()])
                })
            })
    }, [])

    const onModalButtonClickHanlder = (clicked) => () => { setIsOpenChecked(clicked) }
    const onCloseButtonHandler = (props) => { setIsOpenChecked(props) }

    const onCareEventHandler = (obj, checked) => {
        const careObj = _.cloneDeep(obj)
        addDoc(collection(dbService, 'care'), {
            about: careObj.about,
            date: careObj.date,
            time: careObj.time,
            name: careObj.name,
            hospital: careObj.hospital,
        })
        setIsOpenChecked(checked)
    }

    return (
        <Container component='main' maxWidth='md'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10%',
                    mb: '10%',
                    ml: '7%',
                }}
            >
                <Typography
                    component="h1"
                    variant="h3"
                >
                    진단 목록
                    <Button href="/hospital/main">
                        홈으로
                    </Button>
                </Typography>
            </Box>
            <List>
                <ListItem>
                    <ListItemText primary='보호자 이름' />
                    <ListItemText primary='예약날짜' />
                    <ListItemText primary='예약시간' />
                    <ListItemText primary='진료내용' />
                </ListItem>
                {careList.map((item, i) => {
                    return (
                        <ListItem
                            key={i}
                            disablePadding={true}
                        >
                            <ListItemText
                                sx={{ width: 200 }}
                                primary={item.name} 
                            />
                            <ListItemText 
                                sx={{ width: 200 }}
                                primary={item.date} 
                            />
                            <ListItemText 
                                sx={{ width: 200 }}
                                primary={item.time} 
                            />
                            <ListItemText 
                                sx={{ width: 200 }}
                                primary={item.about} 
                            />
                        </ListItem>
                    )
                })}
            </List>
            <Button 
                onClick={onModalButtonClickHanlder(true)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                    진료추가
                </Button>
            <CareModal
                isOpenModal={isOpenChecked}
                onCareEvent={onCareEventHandler}
                close={onCloseButtonHandler}
            />
        </Container>
    )
}

export default CareList;