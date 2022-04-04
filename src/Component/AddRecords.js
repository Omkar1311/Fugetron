import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getMethod } from "../utils/apimethods";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as yup from "yup";


const state = [
  {
    value: 'Maharastra',
  },
  {
    value: 'Goa',
  },
  {
    value: 'Gujarat',
  },
  {
    value: 'Delhi',
  },
];

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .email("invalid email"),
  first_name: yup
    .string()
    .required("first name")
  , last_name: yup
    .string()
    .required("last name"),
  city: yup
    .string('Enter your city')
    .required('City is required'),
  states: yup
    .string('Enter your state')
    .required('State is required'),
  pincode: yup
    .string('Enter your zip')
    .min(5, 'invailed zip')
    .max(5, 'invailed Zip')
    .required('Zip is required'),
});

const AddRecords = (props) => {
  const [editdata, seteditdata] = useState({});

  const defaultValue = props?.history?.location?.state?.data ? props.history.location.state.data : {
    first_name: props.first_name ? props.first_name : "",
    last_name: props.last_name ? props.last_name : "",
    email: props.email ? props.email : "",
    states: props.states ? props.states : "",
    city: props.city ? props.city : "",
    pincode: props.pincode ? props.pincode : "",
  };

  useEffect(() => {
    if (props.history.location.state) {
      const data = props.history.location.state.data;

      seteditdata(data);

    }
  }, [props.history.location.state]);

  const history = useHistory();

  const back = () => {
    history.push("/tabledata");
  };

  const handleSubmit = async (values) => {


    const { first_name, last_name, email, states, city, pincode } = values;

    var resp;

    const addUser = `https://c0ri699qs5.execute-api.us-east-1.amazonaws.com/v1/add?param1=${email}&param2=${first_name}&param3=${last_name}&param4=${pincode}&param5=${city}&param6=${states}`;

    const editUser = `https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/edit?param1=${email}&param2=${first_name}&param3=${last_name}&param4=${pincode}&param5=${city}&param6=${states}`;

    if (props.history.location.state) {

      resp = await getMethod(editUser);
    } else {

      resp = await getMethod(addUser);
    }


    if (resp.data.Success) {
      alert(resp.data.Message);
      history.push("/tabledata");
    } else {
      alert(resp.data.Message);
    }
  };
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      handleSubmit(e)
    },
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {editdata && (
            <Container className="m-5">
              <div>
                <TextField
                  type='text'
                  name="first_name"
                  label="First Name"
                  id="outlined-required first_name"
                  defaultValue={editdata.first_name}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  style={{ marginLeft: 15 }}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />



                <TextField
                  label="Last Name"
                  type='text'
                  name='last_name'
                  id="outlined-size-small last_name"
                  onChange={formik.handleChange}

                  value={formik.values.last_name}
                  defaultValue={editdata.last_name}
                  style={{ marginLeft: 15 }}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />


                {!editdata.email ?
                  <TextField
                    label="Email"
                    type='email'
                    name="email"
                    id="outlined-size-small email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    style={{ marginLeft: 15 }}
                    defaultValue={editdata.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  /> : <TextField
                    label="Email"
                    type='email'
                    name="email"
                    id="outlined-size-small email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    style={{ marginLeft: 15 }}
                    defaultValue={editdata.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  
                    disabled='true'
                  />}
              
              </div>

              <div>
                <TextField
                  id="outlined-select-currency states"
                  select
                  label="state"
                  name="states"
                  value={formik.values.states}
                  onChange={formik.handleChange}
                  defaultValue={editdata.states}
                  style={{ marginLeft: 15, marginTop: 15, width: "15.4vw" }}
                  error={formik.touched.states && Boolean(formik.errors.states)}
                  helperText={formik.touched.states && formik.errors.states}
                >
                  {state.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="City"
                  name="city"
                  id="outlined-size-small city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  style={{ marginLeft: 15, marginTop: 15 }}
                  defaultValue={editdata.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />


                <TextField
                  label="Pincode"
                  name="pincode"
                  id="outlined-size-small pincode"
                  onChange={formik.handleChange}
                  value={formik.values.pincode}
                  style={{ marginLeft: 15, marginTop: 15 }}
                  defaultValue={editdata.pincode}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />                
              </div>
              <div style={{ marginLeft: "35vw", marginTop: "5vw" }}>
              <Button
                    variant="primary"
                    className="buton mx-1"
                    type="submit"
                  >
                    Add
                  </Button>
                <Button
                  variant="success"
                  className="buton mx-1 c1"
                  onClick={back}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddRecords;