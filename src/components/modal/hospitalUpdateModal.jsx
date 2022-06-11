import { useRef } from 'react'
import { TextField, Box, Button } from '@mui/material'
import { collection, query, where, updateDoc, doc } from "firebase/firestore"
import { dbService } from "../../firebase"
import './modal.css'

const HospitalUpdateModal = ({ open, close, info }) => {
    const timeRef = useRef()
    const diagnosisRef = useRef()
    const operationRef = useRef()
    const aboutRef = useRef()

    const onSubmitClickHandler = () => {
        const obj = {}
        obj.time = timeRef.current.value
        obj.diagnosis = diagnosisRef.current.value
        obj.operation = operationRef.current.value
        obj.about = aboutRef.current.value

        const key = 'userToken'
        const ref = query(collection(dbService, "hosInfo"), where("id", "==", localStorage.getItem(key)))
        updateDoc(ref, {
            openClose: obj.time,
            diagnosis: obj.diagnosis,
            operation: obj.operation,
            about: obj.about,
        })
        .then(() => {
            console.log('DB 업데이트 성공');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const onCloseButtonHandler = () => {
        close(false)
    }

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        정보수정
                        <button className="close" onClick={onCloseButtonHandler}>
                            &times;
                        </button>
                    </header>
                    <div>
                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='openClose'
                                id='openClose'
                                variant="standard"
                                inputRef={timeRef}
                                label={info.openClose}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='diagnosis'
                                id='diagnosis'
                                variant="standard"
                                inputRef={diagnosisRef}
                                label={info.diagnosis}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='operation'
                                id='operation'
                                variant="standard"
                                inputRef={operationRef}
                                label={info.operation}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='about'
                                id='about'
                                variant="standard"
                                inputRef={aboutRef}
                                label={info.about}
                                >
                            </TextField>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onSubmitClickHandler}
                                >
                                정보수정하기
                            </Button>
                        </Box>
                    </div>
                    <footer>
                        <button className="close" onClick={onCloseButtonHandler}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
}

export default HospitalUpdateModal;