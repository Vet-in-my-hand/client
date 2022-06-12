import { useRef } from 'react'
import {
    Modal,
    Box,
    TextField,
    Button,
} from '@mui/material'

function ReserveModal({ isOpenModal, onReserveEvent, close }) {
    const aboutRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    const hospitalRef = useRef()

    const onReserveButtonClickHandler = () => {
        const obj = {}
        obj.about = aboutRef.current.value
        obj.date = dateRef.current.value
        obj.time = timeRef.current.value
        obj.hospital = hospitalRef.current.value
        onReserveEvent(obj, false)
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
                    label="증상"
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={dateRef}
                    margin="normal"
                    label="예약날짜"
                    required
                    fullWidth
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={timeRef}
                    margin="normal"
                    label="예약시간"
                    fullWidth
                    required
                    variant="standard"
                />
                <TextField
                    inputRef={hospitalRef}
                    margin="normal"
                    label="병원"
                    required
                    fullWidth
                    variant="standard"
                />

                <Button onClick={onReserveButtonClickHandler}>예약추가</Button>
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

export default ReserveModal