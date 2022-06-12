import { useRef } from 'react'
import {
    Modal,
    Box,
    TextField,
    Button,
} from '@mui/material'
import { getDoc, doc } from "firebase/firestore";
import { dbService } from "../../firebase";


function CareModal({ isOpenModal, onCareEvent, close }) {
    const aboutRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    const nameRef = useRef()

    const onCareButtonClickHandler = async () => {
        const key = 'userToken'
        const ref = doc(dbService, "hospital", localStorage.getItem(key))
        const _ref = await getDoc(ref)
        const obj = {}
        obj.about = aboutRef.current.value
        obj.date = dateRef.current.value
        obj.time = timeRef.current.value
        obj.name = nameRef.current.value
        obj.hospital = _ref.data().hospitalName
        onCareEvent(obj, false)
    }
    const onCloseButtonHandler = () => {
        close(false)
    }
    return (
        <Modal open={isOpenModal}>
            <Box sx={modalStyle}>
                <TextField
                    inputRef={aboutRef}
                    margin="normal"
                    required
                    fullWidth
                    label="진료내용"
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={dateRef}
                    margin="normal"
                    label="날짜"
                    required
                    fullWidth
                    variant="standard"
                >
                </TextField>                  
                <TextField
                    inputRef={timeRef}
                    margin="normal"
                    label="시간"
                    fullWidth
                    required
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={nameRef}
                    margin="normal"
                    label="보호자 이름"
                    fullWidth
                    required
                    variant="standard"
                />
                <Button onClick={onCareButtonClickHandler}> 진료추가 </Button>
                <Button onClick={onCloseButtonHandler}>취소</Button>

            </Box>
        </Modal>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default CareModal