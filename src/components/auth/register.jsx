import { Grid, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./register.module.css";

function Register () {
    return(
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '50%',
                    }}
                >
                    <Grid container>
                        <Grid item xs={6}>
                            <Link to="/user/register">
                                <button className={styles.register_bnt}
                                    type="button"
                                >
                                    반려인 가입으로
                                </button>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/hospital/register">
                                <button className={styles.register_bnt}
                                    type="button"
                                    >
                                        병원 가입으로
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
    )
}

export default Register;