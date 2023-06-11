import dynamic from "next/dynamic";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import useResources, { useData } from "@/hooks/useResources";
import CustomSnackBar from "@/components/CustomSnackBar";
import { getClientHost } from "@/utils";

const DynamicSocialItems = dynamic(() => import("../header/SocialItems"), {
  ssr: false,
});

const initialValues = {
  email: "",
};

const initialErrors = {
  email: {
    required: "",
    pattern: "",
  },
};

const NewsLetterSection = ({ locale }) => {
  const { socialMedia } = useData();

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnack(false);
  };

  const successMessage = useResources("successMsg");
  const requiredField = useResources("requiredField");
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

      try {
        const res = await fetch(
          `${getClientHost()}/api/newsLetter/subscribe?locale=${locale}&email=${
            formValues.email
          }`,
          { method: "POST" }
        );

        if (res.status !== 200) {
          setServerError("Something went wrong");
        } else {
          const data = await res.json();
          if (data?.error) {
            setServerError(data?.message);
          } else {
            setFormValues((prev) => ({ ...prev, email: "" }));
            setShowSnack(true);
            setServerError("");
          }
        }
      } catch (error) {
        setServerError("Something went wrong");
        console.log(error);
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
        message={successMessage}
      />

      <Typography
        component="h4"
        variant="h6"
        textTransform="capitalize"
        gutterBottom
      >
        {useResources("newsLetter")}
      </Typography>

      <Typography variant="body2" mb={2}>
        {useResources("subscribeDesc")}
      </Typography>

      <FormControl
        variant="outlined"
        fullWidth
        required
        style={{ marginBottom: "1.5rem" }}
        color="primary"
        component="form"
        noValidate
        error={
          Boolean(serverError) ||
          Boolean(errors.email.required) ||
          Boolean(errors.email.pattern)
        }
        onSubmit={handleSubmit}
      >
        <FilledInput
          id="taam-news-letter"
          placeholder={useResources("emailAddress")}
          name="email"
          value={formValues.email}
          onChange={handleFieldChange}
          required
          sx={{border:"2px solid #000" , padding: "5px 5px"} }

          inputProps={{
            type: "email",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label={useResources("submitNewsletter")}
                sx={{ transform: locale === "ar" ? "scaleX(-1)" : "" }}
                type="submit"
                disabled={isSubmit}
              >
                {isSubmit ? (
                  <CircularProgress color="secondary" size={30} />
                ) : (
                  <SendOutlinedIcon
                    style={{
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
          style={{
            color: "#fff",
            fontSize: "0.85rem",
            backgroundColor: "rgb(217 197 197 / 6%)",
          }}
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
        {serverError && (
          <FormHelperText id="component-error-text">
            {serverError}
          </FormHelperText>
        )}
      </FormControl>

      {socialMedia && (
        <Stack direction="row" alignItems="center" gap={2}>
          <DynamicSocialItems
            socialIcons={socialMedia}
            sx={{ backgroundColor: "secondary.main" }}
            size="small"
          />
        </Stack>
      )}
    </>
  );
};

export default NewsLetterSection;
