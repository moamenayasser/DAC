// Internal Imports
import { useState } from "react";
import { useRouter } from "next/router";
// MUI
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// Components
import useResources from "@/hooks/useResources";
import CustomSnackBar from "../CustomSnackBar";
import { getClientHost } from "@/utils";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cvFile: "",
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
  cvFile: {
    required: "",
  },
};

const ApplyForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [serverError, setServerError] = useState(false);

  const router = useRouter();
  const {
    locale,
    query: { slug },
  } = router;

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
  const uploadCv = useResources("uploadCv");

  const handleFieldChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "cvFile") {
      if (e.target.files) {
        setFormValues((prev) => ({
          ...prev,
          [e.target.name]: e.target.files[0],
        }));
      }
    }

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

    // CV
    "cvFile" in fieldValues &&
      (temp.cvFile.required = fieldValues.cvFile ? "" : requiredField);

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

      const formdata = new FormData();

      formdata.append("Name", formValues.firstName);
      formdata.append("Email", formValues.email);
      formdata.append("PhoneNumber", formValues.phone);
      formdata.append("LastName", formValues.lastName);
      formdata.append("Resume", formValues.cvFile);

      try {
        const res = await fetch(
          `${getClientHost()}/api/career?locale=${locale}&job=${slug}`,
          {
            method: "POST",
            body: formdata,
          }
        );

        if (!res.ok) {
          setServerError(true);
          setShowSnack(true);
        } else {
          const data = await res.json();
          setFormValues(initialValues);
          setShowSnack(true);
          setServerError(false);
        }
      } catch (error) {
        console.log("From Error ", error);
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

      <form onSubmit={handleSubmit} noValidate className="black">
        <Grid container spacing={1} mb={5}>
          <Grid item xs={12} sm={6}>
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
        </Grid>

        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid item xs sm={6} md={3}>
            <Button
              component="label"
              variant="contained"
              fullWidth
              sx={{
                border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                "&:hover span": { color: "#000" },
              }}
            >
              <Typography
                truncate={1}
                variant="button"
                sx={{
                  fontFamily: "acumin_en_font",
                  color: "#fff",
                  "&:hover": { color: "#000" },
                }}
              >
                {formValues.cvFile
                  ? `${formValues.cvFile?.name} - uploaded`
                  : uploadCv}
              </Typography>
              <input
                type="file"
                hidden
                name="cvFile"
                onChange={handleFieldChange}
              />
            </Button>
            {errors.cvFile.required && (
              <FormHelperText
                style={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  position: "absolute",
                }}
              >
                {errors.cvFile.required}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs sm={6} md={3}>
            <Button
              type="submit"
              variant="standard"
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
        <style jsx global>{`
          .blackoutline {
            border: 2px solid #000;
            color: #000 !important;
          }
          .black {
            color: #000 !important;
          }
        `}</style>
      </form>
    </>
  );
};

export default ApplyForm;
