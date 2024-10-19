import { useEffect, useState } from "react";
import style from "./profilePage.module.css";
import styles from "../../componants/add-product/Products.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormController from "../../componants/formController/FormController";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import {  TextField } from "@mui/material";
import { app } from "../../fireBase";

const ProfilePage = () => {
  const queryClient = useQueryClient();

  const [profilePictureUpdated, setProfilePictureUpdated] = useState("");
  const [progress, setprogress] = useState();
  // const [errorUpload, seterrorUpload] = useState(null)
  const [adminData, setAdminData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const egyptGovernorates = [
    { key: "choose your governorate", value: "" },
    { key: "Cairo", value: "Cairo" },
    { key: "Alexandria", value: "Alexandria" },
    { key: "Giza", value: "Giza" },
    { key: "Qalyubia", value: "Qalyubia" },
    { key: "Dakahlia", value: "Dakahlia" },
    { key: "Sharqia", value: "Sharqia" },
    { key: "Gharbia", value: "Gharbia" },
    { key: "Monufia", value: "Monufia" },
    { key: "Beheira", value: "Beheira" },
    { key: "Kafr El Sheikh", value: "Kafr El Sheikh" },
    { key: "Damietta", value: "Damietta" },
    { key: "Port Said", value: "Port Said" },
    { key: "Ismailia", value: "Ismailia" },
    { key: "Suez", value: "Suez" },
    { key: "South Sinai", value: "South Sinai" },
    { key: "North Sinai", value: "North Sinai" },
    { key: "Faiyum", value: "Faiyum" },
    { key: "Beni Suef", value: "Beni Suef" },
    { key: "Minya", value: "Minya" },
    { key: "Asyut", value: "Asyut" },
    { key: "Sohag", value: "Sohag" },
    { key: "Qena", value: "Qena" },
    { key: "Luxor", value: "Luxor" },
    { key: "Aswan", value: "Aswan" },
    { key: "Red Sea", value: "Red Sea" },
    { key: "New Valley", value: "New Valley" },
    { key: "Matrouh", value: "Matrouh" },
  ];
  const Country = [
    { key: "choose your governorate", value: "" },
    { key: "Egypt", value: "Egypt" },
  ];

  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/users/getMe`,
      {
        withCredentials: true,
      }
    );
    return data;
  };

  useQuery(["get-admin"], getData, {
    onSuccess: (data) => {
      setAdminData(data.data);
    },
    onError: (error) => {

      toast.error(error.response.data.message);
    },
  });


  const initialValues = adminData
    ? {
        username: adminData.username || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        profilePicture: adminData.profilePicture,
        addresses: adminData.addresses || [
          {
            country: "Egypt",
            city: "",
            street: "",
            zipcode: "",
          },
        ],
      }
    : {
        username: "",
        email: "",
        phone: "",
        profilePicture: "",
        addresses: [
          {
            country: "Egypt",
            city: "",
            street: "",
            zipcode: "",
          },
        ],
      };
  const validationSchema = Yup.object({
    username: Yup.string(),
    email: Yup.string().email("invalid email"),
    phone: Yup.string().matches(
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/,
      "Invalid phone number"
    ),
    profilePicture: Yup.mixed(),
    addresses: Yup.array()
      .of(
        Yup.object({
          country: Yup.string(),
          city: Yup.string(),
          street: Yup.string(),
          zipcode: Yup.number()
            .typeError("Invalid ZIP code , Zip code must be 5 number")
            .positive("Invalid ZIP code")
            .integer("Invalid ZIP code")
            .min(10000, " Zip code must be 5 number")
            .max(99999, " Zip code must be 5 number"),
        })
      )
      .min(1, "At least one address is required"),
  });

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(Math.round(progress));
      },
      (error) => {
        // Handle errors
        toast.error("Error uploading file( file must be less than 2 MB)");
        // seterrorUpload("Error uploading file( file must be less than 2 MB)");
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // Save the download URL to state

          setImageUploaded(true);
          setAdminData({ ...adminData, profilePicture: url });

          setProfilePictureUpdated(url);
        });
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const updateAdminDataMutation = useMutation(
    async (updatedAdmin) => {
      return await axios.put(
        `http://localhost:3000/api/v1/users/updateMe`,
        updatedAdmin,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["get-admin"]);
      },
      onError: (error) => {
        toast.error("There is something wrong , pleaseTry again");
        console.error("Error updating profile:", error);
      },
    }
  );

  const onSubmit = (values) => {
    if (image && !imageUploaded) {
      toast.error("Please wait until the image is uploaded.");
      return;
    }

    const updatedValues = {
      ...values,
      profilePicture: profilePictureUpdated || adminData.profilePicture,
    };
    updateAdminDataMutation.mutate(updatedValues);

  };



  return (
    <div className={style.updateProfile}>
      <h1>hello , {adminData?.username || "user"}</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(Formik) => {
          return (
            <Form className={styles.loginForm}>
              <div className={style.ProfileImg}>
                <div>
                  <img src={adminData.profilePicture} alt="person" />
                  <div>
                  
                    {progress < 100 ? (
                      <div
                        className="progress mt-2"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          style={{'width': `${progress}%`,'textAlign':'center'}}
                        >{progress}%</div>
                      </div>
                    ): progress === 100 ?(
                      <div> <p className="text-success">uploaded successfully</p></div>):''}
                  </div>
                </div>

                <div>
                  <label htmlFor="profilePicture" className={style.imgBtn}>
                    choose image
                  </label>

                  <Field
                    as={TextField}
                    value=""
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    accept="image/*"
                    variant="standard"
                    id="profilePicture"
                    name="profilePicture"
                    hidden
                    type="file"
                  />
                </div>
              </div>
              <FormController
                control="input"
                type="text"
                placeholder="Enter your updated name"
                divStyle={styles.formControl}
                name="username"
                className={styles.input}
              />
              <FormController
                control="input"
                type="email"
                placeholder="Enter your updated email"
                divStyle={styles.formControl}
                name="email"
                className={styles.input}
              />
              <FormController
                control="input"
                type="text"
                placeholder="Enter your updated phone"
                divStyle={styles.formControl}
                name="phone"
                className={styles.input}
              />
              <FormController
                control="select"
                options={Country}
                name="addresses[0].country"
                selectClass={styles.select}
                optionClass={styles.option}
                divStyle={styles.formControl}
              />
              <FormController
                control="select"
                options={egyptGovernorates}
                name="addresses[0].city"
                selectClass={styles.select}
                optionClass={styles.option}
                divStyle={styles.formControl}
              />
              <FormController
                control="input"
                type="text"
                placeholder="Enter your updated street"
                divStyle={styles.formControl}
                name="addresses[0].street"
                className={styles.input}
              />
              <FormController
                control="input"
                type="text"
                placeholder="Enter your zip code"
                divStyle={styles.formControl}
                name="addresses[0].zipcode"
                className={styles.input}
              />
              <div className={styles.submitContainer}>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!Formik.isValid}
                >
                  update profile
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfilePage;
