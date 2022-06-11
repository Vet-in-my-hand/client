import { useState, useEffect } from 'react'
import {
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import { dbService } from "../../firebase"
import {
    doc, query, collection,
    getDoc, getDocs, where,
} from 'firebase/firestore'

function ReserveList() {
    const [reserveList, setReserveList] = useState([])

    useEffect(() => {
        const key = 'userToken'
        const docRef = doc(dbService, "hospital", localStorage.getItem(key))
        getDoc(docRef)
            .then((data) => {
                const docs = query(collection(dbService, "reservation"), where("hospital", "==", data.data().hospitalName))
                const arr = getDocs(docs)
                return arr
            })
            .then((result) => result.forEach(e => setReserveList(() => [Object.assign({}, e.data())])))
    }, [])
    return (
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
    )
}

export default ReserveList