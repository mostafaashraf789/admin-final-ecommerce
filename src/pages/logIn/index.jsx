
import { Form, Formik } from "formik";
import FormController from "../../componants/formController/FormController";
import * as Yup from "yup";
import styles from './login.module.css'
// import LoginImage from '../../assets/Login-bro.svg';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../componants/Animation - 1729130503940.json";

import Cookies from 'js-cookie';
const LogIn = () => {

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("required"),
        password: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
    });

    const userLogin = async (user) => {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login-admin", user, {
            withCredentials: true, 
        });
        return response.data;
        
    };
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const mutation = useMutation(userLogin, {
        onSuccess: (data) => {
            if(data.role ==="admin"){
                Cookies.set("role","admin",
                    {
                        expires: 4,
                        path: '/'
                    }
                )
                Cookies.set("adminId", data._id, {
                    expires: 4,
                    path: '/'})
                navigate("/")
                toast.success("Login Successfully")

            }else{
                navigate("/LogIn")
                toast.error("Invalid Email or Password Please Try Again if you are an admin " )
            }
            
            
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message);
        },
    });
   

    const onSubmit = (values) => {
        mutation.mutate(values);
    };

   

    return (
        <div className={`container my-5  ${styles.formContainer}`}>
 
                    <Lottie
                    backgroundColor="transparent"
                        color="transparent"
                      autoplay
                      loop
                      animationData={animationData}
                      style={{ height: "300px" }}
                    />  
            {/* <img src={LoginImage} alt="login" /> */}
            <div className={styles.login}>
                <h1>log in to exculsive </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}

                >
                    {(formik) => {
                        return (
                            <Form className={styles.loginForm}>
                                <FormController
                                    control="input"
                                    type="email"
                                    placeholder="Enter your email"
                                    divStyle={styles.formControl}
                                    name="email"
                                    className={styles.input}
                                />
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submit} disabled={!formik.isValid}>login</button>
                                  
                                </div>
                              
                            </Form>
                        );
                    }}
                </Formik>
               
            </div>
         
        </div>
    );
};

export default LogIn;
