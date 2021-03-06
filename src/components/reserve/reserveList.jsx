import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Container,
    Button,
    Box,
    Typography
} from '@mui/material'
import { dbService } from "../../firebase"
import {
    doc, 
    query, 
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    where,
} from 'firebase/firestore'
import _ from 'lodash'
import ReserveModal from './reserveModal'

function ReserveList() {
    const [isOpenChecked, setIsOpenChecked] = useState(false)
    const [reserveList, setReserveList] = useState([])
    const [hospitalInfo, setHospitalInfo] = useState([])

    useEffect(() => {
        const key = 'userToken'
        const docRef = doc(dbService, "hospital", localStorage.getItem(key))
        getDoc(docRef)
            .then((data) => {
                console.log(data.data())
                const docs = query(collection(dbService, "reservation"), where("hospital", "==", data.data().hospitalName))
                const result = getDocs(docs)
                setHospitalInfo(() => Object.assign({}, data.data()))
                return result
            })
            .then((result) => {
                result.forEach(e => {
                    setReserveList((prev) => [...prev, e.data()])
                })
            })
    }, [])

    const onModalButtonClickHanlder = (clicked) => () => { setIsOpenChecked(clicked) }
    const onCloseButtonHandler = (props) => { setIsOpenChecked(props) }
        
    const onReserveEventHandler = (obj, checked) => {
        const reservedObj = _.cloneDeep(obj)
        addDoc(collection(dbService, 'reservation'), {
            about: reservedObj.about,
            date: reservedObj.date,
            hospital: hospitalInfo.hospitalName,
            time: reservedObj.time,
            name: reservedObj.name,
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
                    variant="h3">
                        ???????????? ??????
                        <Button href="/hospital/main">
                            ?????????
                        </Button>
                </Typography>
            </Box>
            <List>
                <ListItem>
                    <ListItemText primary='????????? ??????' />
                    <ListItemText primary='????????????' />
                    <ListItemText primary='????????????' />
                    <ListItemText primary='????????????' />
                </ListItem>
                {reserveList.map((item, i) => {
                    return (
                        <ListItem
                            key={i}
                            disablePadding={true}
                        >
                            <ListItemText 
                                sx={{ width: 200 }}
                                primary={item.name} />
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
                    )
                })}
            </List>
            <Button 
                onClick={onModalButtonClickHanlder(true)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                    ?????? ??????
            </Button>
            <ReserveModal
                isOpenModal={isOpenChecked}
                onReserveEvent={onReserveEventHandler}
                close={onCloseButtonHandler}
            />
        </Container>
    )
}

export default ReserveList