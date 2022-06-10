import { Container, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../../firebase";

function UserMain() {
    const [inputs, setInputs] = useState({
        search: "",
    })

    const [hos, setHos] = useState('');


    const {
        search,
    } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };
    const searchHospital = async (e) => {
        e.preventDefault();
        const hospitalRef = query(collection(dbService, "hospital"), where("name", "==", `${search}`));
        const snapshot = await getDocs(hospitalRef);
        snapshot.forEach((data) => {
            setHos(data.data());
        })
        console.log(hos);

        // console.log(test)
        // test.forEach((doc)=>{
        //     console.log(doc.id, doc.data())
        // })
        // const hospitalRef = query(collection(dbService, "hospital"), where("hospitalName", "==", `${search}`));
        // const snapshot = await getDocs(hospitalRef);
        // snapshot.forEach((data) => {
        //     console.log(data.data());
        // })
        // const data = snapshot.docs.map(doc => ({
        //     ...doc.data()
        // }));
        // setHos(data);
        // console.log(data);
        // console.log(snapshot)
        // snapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        // })
    }
    
    return (
        <div>
            <Container component='main' maxWidth="md">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '10%',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h3">
                        안녕하세요 @@@님!
                    </Typography>
                </Box>
                <Box 
                    component='form' 
                    onSubmit={searchHospital} 
                    sx={{
                        mt: 1,
                        alignItems: 'center',
                        direction: "column",
                        marginTop: "40px"
                        }}>
                <Grid container>
                    <Grid item xs={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            label="병원검색"
                            name="search"
                            id="search"
                            variant="standard"
                            onChange={onChange}>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            검색
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </Container>

        </div>
    )
}

export default UserMain;