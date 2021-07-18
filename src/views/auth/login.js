import React, { useState, useContext } from 'react';
import { TextInput } from '../../utils/textInput';
import { Grid, Snackbar } from '@material-ui/core'; 
import { Alert } from '@material-ui/lab';
import { BoldText } from '../../utils/text';
import { ContainedButton } from '../../utils/button';
import OtpInput from 'react-otp-input';
import { bold } from '../../constants/Font';
import { SEND_OTP, PHONE_LOGIN, GET_PROFILE } from '../../api';
import axios from 'axios';
import { GlobalContext } from '../../store/context/GlobalContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [phone, setPhone] = useState('');
    const state = useContext(GlobalContext);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const sendOTP = () => {
        const body = {
            phone: phone
        };
        axios.post(SEND_OTP, body).then((res)=>{
            setOtpSent(true);
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleChange = (otp) => {
        setOtp(otp);
    };
    const login = () => {
        axios.get(PHONE_LOGIN(phone, otp, 'Chef')).then((resp)=>{
            axios.get(GET_PROFILE, {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + resp.data.token
                }
            })
            .then((res) => {
                if(res.data.success) {
                    if(res.data.user.role === 'chef') {
                        state.dispatch({type: 'SIGN_IN', token: resp.data.token});
                        localStorage.setItem('token', resp.data.token);
                        history.push('/dashboard');
                    }
                    else {
                        setOpen(true)
                    }
                }   
                else {
                    setOpen(true);
                }
            }).catch((err) => setOpen(true));
        }).catch((err) => setOpen(true));
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    return (
        <Grid container justify="center" direction="column" alignItems="center" spacing={0} style={{minHeight: '70vh'}}>
            <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Invalid User!
                </Alert>
            </Snackbar>
            <BoldText style={{fontSize: 30, marginBottom: 20}}>Chef Login</BoldText>
            {otpSent ? <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                inputStyle={{width: 50, height: 50, fontFamily: bold}}
                containerStyle={{marginBottom: 20}}
                separator={<span>-</span>}
            /> : 
            <TextInput onChange={(e) => setPhone(e.target.value)} type="number" onInput={(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
         }} value={phone} labelName="Enter Phone Number" labelWidth={160} style={{width: 500, marginBottom: 20}} noClassName placeholder="Enter 10 Digit Mobile Number" />}
            {otpSent ? <ContainedButton variant="contained" disabled={otp.length < 6} onClick={login}>Login</ContainedButton> : <ContainedButton variant="contained" disabled={phone.length < 10} onClick={sendOTP}>Send OTP</ContainedButton>}
        </Grid>
    )
}

export default Login;