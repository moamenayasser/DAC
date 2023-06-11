import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useResources from "@/hooks/useResources";
import { getClientHost } from "@/utils";
import { styled } from "@mui/material";

const BoxWrap = styled(Box)({
  "& input": {
    color: "#fff",
  },
  "& .Mui-focused": {
    color: "#fff",
  },
});
const initialValues = {
  firstName: "",
  email: "",
  phone: "",
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
};

const DwnloadForm = ({ data, handleClose }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const downloadRef = useRef();

  const requiredField = useResources("requiredField");
  const numbersOnly = useResources("numbersOnly");
  const emailNotValid = useResources("emailNotValid");

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
      const formdata = new FormData();
      formdata.append("NameFirst", formValues.firstName);
      formdata.append("Email", formValues.email);
      formdata.append("Phone", formValues.phone);
      // Subject for Contact is static
      formdata.append("Subject", "Download Profile");

      try {
        const response = await fetch(`${getClientHost()}/api/contact`, {
          method: "post",
          body: formdata,
        });

        const data = await response.json();
        setFormValues(initialValues);
        downloadRef.current.click();
        handleClose();
      } catch (err) {
        console.error("From Error ", err);
      }
    }
  };

  return (
    <>
      <Box
        flexGrow={1}
        py={3}
        my={2}
        bgcolor="#000"
        position="relative"
        color="#fff"
      >
        <Container fixed sx={{ position: "relative" }}>
          <BoxWrap component="form" onSubmit={handleSubmit} noValidate>
            <div className="section-title">
              <Typography
                variant="h4"
                component="h3"
                letterSpacing="-1px"
                marginBottom="20px"
                marginTop="10px"
                textTransform="capitalize"
              >
                {data?.Title}
              </Typography>
              <Typography
                variant="p"
                component="p"
                marginBottom="20px"
                marginTop="10px"
              >
                {data?.ShortDescription}
              </Typography>
            </div>

            <div style={{ marginBottom: "0rem" }}>
              <TextField
                name="firstName"
                label={useResources("name")}
                variant="standard"
                fullWidth
                required
                value={formValues.firstName}
                onChange={handleFieldChange}
                error={Boolean(errors.firstName.required)}
                className="input"
              />
              {errors.firstName.required && (
                <FormHelperText
                  style={{
                    color: "#d32f2f",
                    fontSize: "0.75rem",
                    lineHeight: 1.2,
                  }}
                >
                  {errors.firstName.required}
                </FormHelperText>
              )}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <TextField
                name="email"
                label={useResources("Email")}
                variant="standard"
                required
                fullWidth
                InputProps={{
                  type: "email",
                }}
                value={formValues.email}
                onChange={handleFieldChange}
                error={
                  Boolean(errors.email.required) ||
                  Boolean(errors.email.pattern)
                }
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
            </div>

            <div>
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
                  Boolean(errors.phone.required) ||
                  Boolean(errors.phone.pattern)
                }
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
            </div>
            <Stack
              direction="row"
              align="center"
              alignItems="center"
              justifyContent="center"
              sx={{ margin: "40px" }}
            >
              <Button
                href={data.Link1 || "/images/TAAM Profile May 2023 Web-min.pdf"}
                variant="outlined"
                download
                style={{ display: "none" }}
                ref={downloadRef}
              >
                {data.Link1Name || useResources("download")}
              </Button>

              <Button variant="outlined" type="submit">
                {data.Link1Name}
              </Button>
            </Stack>
          </BoxWrap>
        </Container>
      </Box>
    </>
  );
};

export default DwnloadForm;