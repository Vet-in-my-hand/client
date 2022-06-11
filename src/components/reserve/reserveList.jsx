import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Container,
    Button,
} from '@mui/material'
import { dbService } from "../../firebase"
import {
    doc, query, collection,
    getDoc, getDocs, where,
    addDoc,
} from 'firebase/firestore'
import _ from 'lodash'
import ReserveModal from './reserveModal'

function ReserveList() {
    const [isOpenChecked, setIsOpenChecked] = useState(false)
    const [reserveList, setReserveList] = useState([])

    useEffect(() => {
        const key = 'userToken'
        const docRef = doc(dbService, "hospital", localStorage.getItem(key))
        getDoc(docRef)
            .then((data) => {
                const docs = query(collection(dbService, "reservation"), where("hospital", "==", data.data().hospitalName))
                const result = getDocs(docs)
                return result
            })
            .then((result) => {
                result.forEach(e => {
                    setReserveList((prev) => [...prev, e.data()])
                })
            })
    }, [])

    const onModalButtonClickHanlder = (clicked) => () => {
        setIsOpenChecked(clicked)
    }

    const onReserveEventHandler = (obj, checked) => {
        const reservedObj = _.cloneDeep(obj)
        addDoc(collection(dbService, 'reservation'), {
            about: reservedObj.about,
            date: reservedObj.date,
            hospital: reservedObj.hospital,
            time: reservedObj.time,
            name: reservedObj.name,
        })
        setIsOpenChecked(checked)
    }

    return (
        <Container>
            <List>
                {reserveList.map((item, i) => {
                    return (
                        <ListItem
                            key={i}
                            disablePadding={true}
                        >
                            <ListItemText primary={item.name} />
                            <ListItemText secondary={item.time} />
                            <ListItemText secondary={item.hospital} />
                            <ListItemText secondary={item.date} />
                        </ListItem>
                    )
                })}
            </List>
            <Button onClick={onModalButtonClickHanlder(true)}>Reserve</Button>
            <ReserveModal
                isOpenModal={isOpenChecked}
                onReserveEvent={onReserveEventHandler}
            />
        </Container>
    )
}

export default ReserveList