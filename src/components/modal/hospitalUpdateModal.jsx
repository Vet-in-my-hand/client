import { useRef } from 'react'
import { TextField, Box, Button, Grid } from '@mui/material'
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { dbService } from "../../firebase"
import './modal.css'

const HospitalUpdateModal = ({ open, close, info }) => {
    const timeRef = useRef()
    const diagnosisRef = useRef()
    const operationRef = useRef()
    const aboutRef = useRef()

    const onSubmitClickHandler = async () => {
        const obj = {}
        obj.time = timeRef.current.value
        obj.diagnosis = diagnosisRef.current.value
        obj.operation = operationRef.current.value
        obj.about = aboutRef.current.value

        const key = 'userToken'
        const _ref = doc(dbService, "hosInfo", localStorage.getItem(key))
        const hosRef = await getDoc(_ref);
        if(hosRef.exists()) {
            updateDoc(_ref, {
            openClose: obj.time,
            diagnosis: obj.diagnosis,
            operation: obj.operation,
            about: obj.about,
        })}
        else {
            const ref = doc(dbService, "hospital", localStorage.getItem(key))
            const nameRef = await getDoc(ref)
            await setDoc(doc(dbService, "hosInfo", localStorage.getItem(key)), {
                openClose: obj.time,
                diagnosis: obj.diagnosis,
                operation: obj.operation,
                about: obj.about,
                id: localStorage.getItem(key),
                name: nameRef.data().hospitalName,
            })}
        

        onCloseButtonHandler()
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
                            <Grid container>
                                <Grid item xs={4} marginTop='35px' fontSize='20px'>
                                    <label>영업시간</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        name='openClose'
                                        id='openClose'
                                        variant="outlined"
                                        inputRef={timeRef}
                                        label={info.openClose}
                                        defaultValue={info.openClose}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} marginTop='35px' fontSize='20px'>
                                    <label>진료동물</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        name='diagnosis'
                                        id='diagnosis'
                                        variant="outlined"
                                        inputRef={diagnosisRef}
                                        label={info.diagnosis}
                                        defaultValue={info.diagnosis}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} marginTop='35px' fontSize='20px'>
                                    <label>수술가능</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        name='operation'
                                        id='operation'
                                        variant="outlined"
                                        inputRef={operationRef}
                                        label={info.operation}
                                        defaultValue={info.operation}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} marginTop='35px' fontSize='20px'>
                                    <label>추가정보</label>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        name='about'
                                        id='about'
                                        variant="outlined"
                                        inputRef={aboutRef}
                                        label={info.about}
                                        defaultValue={info.about}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
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