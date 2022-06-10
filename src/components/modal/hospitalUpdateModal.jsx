import { async } from '@firebase/util';
import { TextField, Box, Button } from '@mui/material';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { dbService } from "../../firebase";
import './modal.css';

const HospitalUpdateModal = ({ open, close, info }) => {

    const onCloseButtonHandler = () => {
        close(false)
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        const openClose = e.target
        const diagnosis = e.target.diagnosis
        const operation = e.target.operation
        const about = e.target.about

        console.log(openClose, diagnosis, operation, about)
        
        const key = 'userToken'
        const ref = query(collection(dbService, "hosInfo"), where("id", "==", localStorage.getItem(key)));
        await updateDoc(ref, {
            openClose: openClose,
            diagnosis: diagnosis,
            operation: operation,
            about: about,
        })
        .then(() => {
            console.log('DB 업데이트 성공');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMassage = error.message;
            console.log(errorCode, errorMassage);
        })
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
                        <Box component="form" onSubmit={updateHandler} sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='openClose'
                                id='openClose'
                                variant="standard"
                                label={info.openClose}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='diagnosis'
                                id='diagnosis'
                                variant="standard"
                                label={info.diagnosis}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='operation'
                                id='operation'
                                variant="standard"
                                label={info.operation}
                                >
                            </TextField>
                            <TextField
                                margin='normal'
                                fullWidth
                                name='about'
                                id='about'
                                variant="standard"
                                label={info.about}
                                >
                            </TextField>
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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