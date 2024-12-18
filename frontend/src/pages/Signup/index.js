import React, { useState, useEffect } from "react";
import qs from "query-string";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import favicon from "../../assets/favicon.ico"; // Ruta al favicon
import { i18n } from "../../translate/i18n";
import "./style.css";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Derechos de autor © "}
      <Link color="inherit" href="#">
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    "&.MuiButton-root": {
      margin: "20px 0px 16px",
      backgroundColor: "rgb(20, 54, 234)",
      borderRadius: "30px",
    },

    "&:hover": {
      backgroundColor: "#285ec9",
      boxShadow: "none",
    },

    backgroundColor: "rgb(20, 54, 234)",
    margin: theme.spacing(3, 0, 2),
    WebkitTextFillColor: "#FFF",
  },
  whatsappButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#25D366", // Color de WhatsApp
    color: "#fff", // Color del texto
    "&:hover": {
      backgroundColor: "#128C7E", // Cambio de color al pasar el ratón
    },
  },
}));

// Validación del formulario con Yup
const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "¡Demasiado corto!")
    .max(50, "¡Demasiado largo!")
    .required("Requerido"),
  companyName: Yup.string()
    .min(2, "¡Demasiado corto!")
    .max(50, "¡Demasiado largo!")
    .required("Requerido"),
  password: Yup.string().min(5, "¡Demasiado corto!").max(50, "¡Demasiado largo!"),
  email: Yup.string().email("Correo electrónico inválido").required("Requerido"),
  phone: Yup.string().required("Requerido"), // Agregamos validación para el teléfono
  verificationCode: Yup.string()
    .oneOf(["HOLA2024"], "Código de verificación incorrecto")
    .required("Código de verificación requerido"),
});

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  let companyId = null;

  const params = qs.parse(window.location.search);
  if (params.companyId !== undefined) {
    companyId = params.companyId;
  }

  // Estado inicial del formulario
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    companyName: "", // Agregamos el campo de nombre de la empresa
    planId: "",
    companyId: companyId || "", // Agregamos companyId si está disponible
    verificationCode: "", // Agregamos el campo de código de verificación
  };

  const [user] = useState(initialState);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga para los planes

  const { getPlanList } = usePlans(); // Usamos getPlanList como en el código base

  // Cargar los planes
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const planList = await getPlanList({ listPublic: "false" });
        setPlans(planList);
        setLoading(false);
      } catch (error) {
        toastError(error); // Manejamos el error si ocurre
        setLoading(false);
      }
    };
    fetchPlans();
  }, [getPlanList]);

  // Configuración del favicon dinámicamente
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = favicon;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  // Función de manejo del registro
  const handleSignUp = async (values) => {
    try {
      // Llamamos al endpoint de registro correcto
      await openApi.post("/auth/signup", values);
      toast.success(i18n.t("signup.toasts.success"));
      history.push("/login");
    } catch (err) {
      toastError(err); // Muestra un error en caso de que falle
    }
  };

  return (
    <div className="geral-signup">
      <div className={"container-signup"}>
        <div className={"paper"}>
          <img alt={"Logo"} src={logo} className="img-login"></img>
          <h4 className="h4">⚡ Regístrate</h4>
          <div>
            <span className="span">
              👋🏻 ¡Comience su <b>prueba GRATUITA</b> "de 15 días de WHASAPPTOMATICO CRM en solo 3 pasos!" <b>No se preocupe, no solicitamos datos de su tarjeta. 💳</b>
            </span>
          </div>
          <Formik
            initialValues={user}
            enableReinitialize={true}
            validationSchema={UserSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleSignUp(values);
                actions.setSubmitting(false);
              }, 400);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="dense"
                      autoComplete="name"
                      name="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="✏️ Tu Nombre"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="dense"
                      autoComplete="companyName"
                      name="companyName"
                      error={touched.companyName && Boolean(errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      variant="outlined"
                      fullWidth
                      id="companyName"
                      label="🏢 Nombre de tu Empresa"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label="📱 Whatsapp  Ejemplo (51999053124)"
                      name="phone"
                      autoComplete="phone"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      id="email"
                      label={` ${i18n.t("signup.form.email")}`}
                      name="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      autoComplete="email"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      name="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      label={` ${i18n.t("signup.form.password")}`}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel htmlFor="plan-selection">📜 Plan</InputLabel>
                    <Field
                      as={Select}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      id="plan-selection"
                      label="📜 Plan"
                      name="planId"
                      required
                    >
                      {loading ? (
                        <MenuItem value="" disabled>
                          Cargando planes...
                        </MenuItem>
                      ) : (
                        plans.map((plan, key) => (
                          <MenuItem key={key} value={plan.id}>
                            {plan.name} - USD {plan.amount}
                          </MenuItem>
                        ))
                      )}
                    </Field>
                  </Grid>

                  {/* Campo de Código de Verificación */}
                  {/* <Grid item xs={12}>
                    <Field
                      as={TextField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      id="verificationCode"
                      label="🔑 Código de Verificación"
                      name="verificationCode"
                      error={touched.verificationCode && Boolean(errors.verificationCode)}
                      helperText={touched.verificationCode && errors.verificationCode}
                      required
                    />
                  </Grid> */}
                </Grid>

                <Button
                  type="submit"
                  margin="dense"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  🚀 {i18n.t("signup.buttons.submit")}
                </Button>
                <Grid>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body1"
                      component={RouterLink}
                      to="/login"
                      style={{ color: "#1436EA", fontWeight: 500 }}
                    >
                      🔒 {i18n.t("signup.buttons.login")}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
        <div className="footer">
          <p className="p">
            Derechos de autor © 2024{" "}
            <a href={"#"} target={"_blank"}>
              WHASAPPTOMATICO {" "}
            </a>{" "}
            CRM WHASAPPTOMATICO
          </p>
        </div>
        <Box mt={5}>{/* <Copyright /> */}</Box>
      </div>
      <div className={"container-img-signup"}>
        <div className="img-signup"></div>
      </div>
      <Button
        variant="contained"
        className={classes.whatsappButton}
        onClick={() =>
          window.open(
            "https://api.whatsapp.com/send?phone=51999053124&text=*Hola, necesito soporte en el CRM de WhatsApp*"
          )
        }
      >
        <WhatsAppIcon /> Soporte por WhatsApp 💬
      </Button>
    </div>
  );
};

export default SignUp;
