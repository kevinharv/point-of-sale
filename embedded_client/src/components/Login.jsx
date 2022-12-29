import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

export default function Login() {

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Button color="secondary">1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button>4</Button>
                    <Button>5</Button>
                    <Button>6</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button>7</Button>
                    <Button>8</Button>
                    <Button>9</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button>X</Button>
                    <Button>0</Button>
                    <Button>✔</Button>
                </Grid>
            </Grid>



            <div>
                {/* <form onSubmit={}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form> */}
            </div>
        </>
    );
}