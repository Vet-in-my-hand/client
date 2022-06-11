import { useRef, useState } from 'react'
import {
    Modal,
    Box,
    TextField,
    Button,
} from '@mui/material'

function ReserveModal({ isOpenModal, onReserveEvent }) {
    const [onCloseModal, setOnCloseModal] = useState(isOpenModal)

    const aboutRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    const nameRef = useRef()
    const hospitalRef = useRef()

    const onReserveButtonClickHandler = () => {
        const obj = {}
        obj.about = aboutRef.current.value
        obj.date = dateRef.current.value
        obj.time = timeRef.current.value
        obj.name = nameRef.current.value
        obj.hospital = hospitalRef.current.value
        onReserveEvent(obj)
        setOnCloseModal(false)
    }

    return (
        <Modal open={onCloseModal}>
            <Box sx={modalStyle}>
                <TextField
                    inputRef={aboutRef}
                    margin="normal"
                    required
                    fullWidth
                    label="About"
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={dateRef}
                    margin="normal"
                    label="Date"
                    required
                    fullWidth
                    variant="standard"
                >
                </TextField>
                <TextField
                    inputRef={hospitalRef}
                    margin="normal"
                    label="Hospital"
                    required
                    fullWidth
                    variant="standard"
                />
                <TextField
                    inputRef={nameRef}
                    margin="normal"
                    label="Name"
                    fullWidth
                    required
                    variant="standard"
                />

                <TextField
                    inputRef={timeRef}
                    margin="normal"
                    label="Time"
                    fullWidth
                    required
                    variant="standard"
                />
                <Button onClick={onReserveButtonClickHandler}>Reserve</Button>
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