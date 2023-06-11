// Internal Imports
import { useState } from "react";
// MUI
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// Componetns
import useResources from "@/hooks/useResources";
import CustomSnackBar from "../CustomSnackBar";
import { getClientHost } from "@/utils";
import useSpecialties from "@/hooks/useSpecialties";



const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  subject: "",
  services: "",
  message: "",
};

const initialErrors = {
  firstName: {
    required: "",
  },
  email: {
    required: "",
    pattern: "",
  },
  phone: {
    required: "",
    pattern: "",
  },
  subject: {
    required: "",
  },
  services: {
    required: "",
  },
  message: {
    required: "",
  },
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [serverError, setServerError] = useState(false);

  //   const { data: specialtiesData } = useSpecialties();
  //  const specialData = specialtiesData?.map((item) => ({
  //     value: item.UniqueName,
  //     label: item.Name,
  //   }));


  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnack(false);
  };

  const requiredField = useResources("requiredField");
  const numbersOnly = useResources("numbersOnly");
  const emailNotValid = useResources("emailNotValid");
  const submitResource = useResources("submit");
  const successMessage = useResources("successMsg");
  const errorMessage = useResources("errorMsg");

  const handleFieldChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validate({ [e.target.name]: e.target.value.trim() });
  };

  const validate = (fieldValues = initialValues) => {
    const temp = { ...errors };
    // First Name
    "firstName" in fieldValues &&
      (temp.firstName.required = fieldValues.firstName ? "" : requiredField);

    // Email
    "email" in fieldValues &&
      (temp.email.required = fieldValues.email ? "" : requiredField);

    "email" in fieldValues &&
      (temp.email.pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          fieldValues.email
        )
          ? ""
          : emailNotValid);

    // Phone
    "phone" in fieldValues &&
      (temp.phone.required = fieldValues.phone ? "" : requiredField);

    "phone" in fieldValues &&
      (temp.phone.pattern = !isNaN(fieldValues.phone) ? "" : numbersOnly);

    // Subject
    "subject" in fieldValues &&
      (temp.subject.required = fieldValues.subject ? "" : requiredField);

    // Services
    "services" in fieldValues &&
      (temp.services.required = fieldValues.services ? "" : requiredField);

    // Message
    "message" in fieldValues &&
      (temp.message.required = fieldValues.message ? "" : requiredField);

    setErrors({ ...temp });

    if (fieldValues !== initialValues) {
      return Object.values(temp).every((x) =>
        Object.values(x).every((el) => el === "")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(formValues)) {
      setIsSubmit(true);

      const customText = `Message: ${formValues.message} - Company: ${formValues.companyName} - Job Title: ${formValues.jobTitle} + Services: ${formValues.services}`;
      const formdata = new FormData();
      formdata.append("NameFirst", formValues.firstName);
      formdata.append("NameLast", formValues.lastName);
      formdata.append("Email", formValues.email);
      formdata.append("Phone", formValues.phone);
      formdata.append("Subject", formValues.subject);
      formdata.append("Message", customText);
      // formdata.append("Message", formValues.message);
      // formdata.append("CustomText", customText);

      try {
        const response = await fetch(`${getClientHost()}/api/contact`, {
          method: "post",
          body: formdata,
        });
        if (!response.ok) {
          setServerError(true);
          setShowSnack(true);
        } else {
          const data = await response.json();
          setFormValues(initialValues);
          setServerError(false);
          setShowSnack(true);
        }
      } catch (err) {
        console.error("From Error ", err);
        setServerError(true);
        setShowSnack(true);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  return (
    <>
      <CustomSnackBar
        open={showSnack}
        onClose={handleCloseSnack}
        message={serverError ? errorMessage : successMessage}
        type={serverError ? "error" : "success"}
      />

      <form onSubmit={handleSubmit} noValidate >
        <Grid container spacing={1} mb={5} >
          <Grid item xs={12} sm={6} >
            <TextField
              name="firstName"
              label={useResources("firstName")}
              variant="standard"
              required
              fullWidth
              value={formValues.firstName}
              onChange={handleFieldChange}
              error={Boolean(errors.firstName.required)}
              helperText={errors.firstName.required}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label={useResources("lastName")}
              variant="standard"
              fullWidth
              value={formValues.lastName}
              onChange={handleFieldChange}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label={useResources("email")}
              variant="standard"
              required
              fullWidth
              InputProps={{
                type: "email",
              }}
              value={formValues.email}
              onChange={handleFieldChange}
              error={
                Boolean(errors.email.required) || Boolean(errors.email.pattern)
              }
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
            {errors.email.required && (
              <FormHelperText
                style={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {errors.email.required}
              </FormHelperText>
            )}
            {errors.email.pattern && !errors.email.required && (
              <FormHelperText
                style={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {errors.email.pattern}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label={useResources("phone")}
              variant="standard"
              required
              fullWidth
              InputProps={{
                type: "tel",
              }}
              value={formValues.phone}
              onChange={handleFieldChange}
              error={
                Boolean(errors.phone.required) || Boolean(errors.phone.pattern)
              }
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
            {errors.phone.required && (
              <FormHelperText
                style={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {errors.phone.required}
              </FormHelperText>
            )}
            {errors.phone.pattern && !errors.phone.required && (
              <FormHelperText
                style={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {errors.phone.pattern}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="companyName"
              label={useResources("companyName")}
              variant="standard"
              fullWidth
              value={formValues.companyName}
              onChange={handleFieldChange}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="jobTitle"
              label={useResources("jobTitle")}
              variant="standard"
              fullWidth
              value={formValues.jobTitle}
              onChange={handleFieldChange}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="subject"
              label={useResources("messageSubject")}
              variant="standard"
              required
              fullWidth
              value={formValues.subject}
              onChange={handleFieldChange}
              error={Boolean(errors.subject.required)}
              helperText={errors.subject.required}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="services"
              select
              label={useResources("Specialities")}
              variant="standard"
              fullWidth
              value={formValues.services}
              onChange={handleFieldChange}
              error={Boolean(errors.services.required)}
              helperText={errors.services.required}
              required
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "transparent" },
                },
              }}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black top" }}
            >
              <MenuItem >

              </MenuItem>
              {/* {specialData.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              name="message"
              label={useResources("message")}
              variant="standard"
              fullWidth
              required
              rows={4}
              multiline
              maxRows={4}
              value={formValues.message}
              onChange={handleFieldChange}
              error={Boolean(errors.message.required)}
              helperText={errors.message.required}
              inputProps={{ className: "blackoutline" }}
              InputLabelProps={{ className: "black" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid item xs sm={6} md={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmit}
              fullWidth
            >
              {isSubmit ? (
                <CircularProgress color="secondary" size={30} />
              ) : (
                submitResource
              )}
            </Button>
          </Grid>
        </Grid>
        {/* <style jsx global>{`
       .blackoutline{
        border: 2px solid #000;
        color:#000 !important;
        }
       .black{
        color:#000 !important;
        }
       .top{
        top:-16px !important;
        left: -9px !important;
        }
      
      `}</style> */}
      </form>
    </>
  );
};

export default ContactForm;
