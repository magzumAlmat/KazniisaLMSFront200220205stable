
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TopMenu from "../../components/topmenu";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/slices/authSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import jwtDecode from "jwt-decode";

// Создаем тему (без изменений)
const theme = createTheme({
  palette: {
    primary: { main: "#009eb0",  //бирюзовый
      contrastText: "#fff" },
    secondary: { main: "#009eb0",

     },

    background: { default: "#1f2937", 
      paper: "#1c1c1b" //черный
    },
    text: { primary: "#fff", secondary: "#d1d5db" },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    body2: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
          },
        },
      },
    },
  },
});


const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    phone: "",
    areasofactivity: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const dispatch = useDispatch();
  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_HOST;

  const activityOptions = [
    "Управление строительными проектами",
    "Проектирование",
    "Экспертиза и оценка соответствия",
    "Производство строительных работ",
    "Контроль и надзор",
    "Девелопмент и недвижимость",
  ];

  useEffect(() => {
    // Во время сборки используем заглушки
    if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
      setUserInfo({ id: 1, username: "Mock User" });
      setToken("mock-token");
      setProfileData({
        name: "Mock Name",
        lastname: "Mock Lastname",
        phone: "123456789",
        areasofactivity: "Проектирование",
      });
      setLoading(false);
      return;
    }

    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!storedToken) {
      router.push("/login");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(storedToken);
      setToken(storedToken);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/login");
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchProfile(), fetchUserInfo()]);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        if (error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${host}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000, // Добавляем тайм-аут
      });
      setProfileData({
        name: response.data.name ?? "",
        lastname: response.data.lastname ?? "",
        phone: response.data.phone ?? "",
        areasofactivity: response.data.areasofactivity ?? "",
      });
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000, // Добавляем тайм-аут
      });
      setUserInfo(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке информации о пользователе:", err);
      if (err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setOpenSnackbar(false);

    try {
      const response = await axios.put(
        `${host}/api/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 5000, // Добавляем тайм-аут
        }
      );
      setSuccessMessage(response.data.message || "Профиль успешно обновлен");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      if (error.response) {
        if (error.response.status === 401) {
          router.push("/login");
        } else {
          const message = error.response.data?.message || "Произошла ошибка при обновлении профиля";
          setErrorMessage(message);
          setOpenSnackbar(true);
        }
      } else {
        setErrorMessage("Не удалось подключиться к серверу");
        setOpenSnackbar(true);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: theme.palette.background.default,
          }}
        >
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
     

         <Box
                             sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                               bgcolor: theme.palette.background.default,
                               minHeight: "100vh",
                               backgroundImage: `url(/background.jpg)`, // Исправлено "backgound" на "background"
                               backgroundSize: "cover",
                               backgroundPosition: "center",
                               backgroundRepeat: "no-repeat",
                             }}
                           >
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            py: 6,
            px: 4,
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Мой профиль
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: "15px" }}>
              <TextField
                label="Имя"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                placeholder="Введите имя"
                required
                fullWidth
                variant="outlined"
              />
            </Box>

            <Box sx={{ marginBottom: "15px" }}>
              <TextField
                label="Фамилия"
                name="lastname"
                value={profileData.lastname}
                onChange={handleChange}
                placeholder="Введите фамилию"
                required
                fullWidth
                variant="outlined"
              />
            </Box>

            <Box sx={{ marginBottom: "15px" }}>
              <TextField
                label="Телефон"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Введите телефон"
                required
                fullWidth
                variant="outlined"
              />
            </Box>

            <Box sx={{ marginBottom: "15px" }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Сфера деятельности</InputLabel>
                <Select
                  name="areasofactivity"
                  value={profileData.areasofactivity}
                  onChange={handleChange}
                  label="Сфера деятельности"
                  required
                >
                  <MenuItem value="">
                    <em>Выберите сферу</em>
                  </MenuItem>
                  {activityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                "&:hover": {
                  bgcolor: "#059669",
                },
              }}
            >
              Сохранить
            </Button>
          </form>

          {/* Snackbar для сообщений */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={errorMessage ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {errorMessage || successMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProfilePage;
export const dynamic = "force-dynamic";

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TopMenu from "../../components/topmenu";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { logoutAction } from "../../store/slices/authSlice";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Alert,
//   Snackbar,
//   createTheme,
//   ThemeProvider,
//   CircularProgress,
// } from "@mui/material";
// import jwtDecode from "jwt-decode";
// import { useTranslation } from "react-i18next";

// // Создаем тему (без изменений)
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#10b981",
//       contrastText: "#fff",
//     },
//     secondary: {
//       main: "#3b82f6",
//     },
//     background: {
//       default: "#1f2937",
//       paper: "#374151",
//     },
//     text: {
//       primary: "#fff",
//       secondary: "#d1d5db",
//     },
//   },
//   typography: {
//     fontFamily: "'Inter', 'Roboto', sans-serif",
//     h4: { fontWeight: 600 },
//     h6: { fontWeight: 500 },
//     body2: { fontWeight: 400 },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "8px",
//           padding: "8px 16px",
//           transition: "all 0.2s ease-in-out",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "8px",
//             borderColor: "#4b5563",
//             "&:hover fieldset": {
//               borderColor: "#10b981",
//             },
//           },
//         },
//       },
//     },
//   },
// });

// const ProfilePage = () => {
//   const { t } = useTranslation(); // Добавляем хук для переводов
//   const [userInfo, setUserInfo] = useState(null);
//   const [token, setToken] = useState(null);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     lastname: "",
//     phone: "",
//     areasofactivity: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const host = process.env.NEXT_PUBLIC_HOST;

//   const activityOptions = [
//     t("profile.activity_options.construction_management"),
//     t("profile.activity_options.design"),
//     t("profile.activity_options.expertise"),
//     t("profile.activity_options.construction_work"),
//     t("profile.activity_options.control"),
//     t("profile.activity_options.development"),
//   ];

//   useEffect(() => {
//     if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
//       setUserInfo({ id: 1, username: "Mock User" });
//       setToken("mock-token");
//       setProfileData({
//         name: "Mock Name",
//         lastname: "Mock Lastname",
//         phone: "123456789",
//         areasofactivity: t("profile.activity_options.design"),
//       });
//       setLoading(false);
//       return;
//     }

//     const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (!storedToken) {
//       router.push("/login");
//       setLoading(false);
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(storedToken);
//       setToken(storedToken);
//     } catch (error) {
//       console.error("Invalid token:", error);
//       localStorage.removeItem("token");
//       router.push("/login");
//       setLoading(false);
//     }
//   }, [router, t]);

//   useEffect(() => {
//     if (!token) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         await Promise.all([fetchProfile(), fetchUserInfo()]);
//       } catch (error) {
//         console.error("Ошибка при загрузке данных:", error);
//         if (error.response?.status === 401) {
//           router.push("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`${host}/api/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 5000,
//       });
//       setProfileData({
//         name: response.data.name ?? "",
//         lastname: response.data.lastname ?? "",
//         phone: response.data.phone ?? "",
//         areasofactivity: response.data.areasofactivity ?? "",
//       });
//     } catch (error) {
//       console.error("Ошибка при загрузке профиля:", error);
//       if (error.response?.status === 401) {
//         router.push("/login");
//       }
//     }
//   };

//   const fetchUserInfo = async () => {
//     try {
//       const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 5000,
//       });
//       setUserInfo(response.data);
//     } catch (err) {
//       console.error("Ошибка при загрузке информации о пользователе:", err);
//       if (err.response?.status === 401) {
//         router.push("/login");
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//     setOpenSnackbar(false);

//     try {
//       const response = await axios.put(
//         `${host}/api/profile`,
//         profileData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           timeout: 5000,
//         }
//       );
//       setSuccessMessage(response.data.message || t("profile.success"));
//       setOpenSnackbar(true);
//     } catch (error) {
//       console.error("Ошибка при обновлении профиля:", error);
//       if (error.response) {
//         if (error.response.status === 401) {
//           router.push("/login");
//         } else {
//           const message = error.response.data?.message || t("profile.error", { message: error.message });
//           setErrorMessage(message);
//           setOpenSnackbar(true);
//         }
//       } else {
//         setErrorMessage(t("profile.network_error"));
//         setOpenSnackbar(true);
//       }
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logoutAction());
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//     setErrorMessage("");
//     setSuccessMessage("");
//   };

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             bgcolor: theme.palette.background.default,
//           }}
//         >
//           <CircularProgress sx={{ color: theme.palette.primary.main }} />
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
//       <Box
//         sx={{
//           bgcolor: theme.palette.background.default,
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: theme.palette.background.paper,
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
//             py: 6,
//             px: 4,
//             width: "100%",
//             maxWidth: "400px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             gutterBottom
//             sx={{
//               color: theme.palette.text.primary,
//               textAlign: "center",
//               fontWeight: 600,
//             }}
//           >
//             {t("profile.title")}
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Box sx={{ marginBottom: "15px" }}>
//               <TextField
//                 label={t("profile.name")}
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleChange}
//                 placeholder={t("profile.name")}
//                 required
//                 fullWidth
//                 variant="outlined"
//               />
//             </Box>

//             <Box sx={{ marginBottom: "15px" }}>
//               <TextField
//                 label={t("profile.lastname")}
//                 name="lastname"
//                 value={profileData.lastname}
//                 onChange={handleChange}
//                 placeholder={t("profile.lastname")}
//                 required
//                 fullWidth
//                 variant="outlined"
//               />
//             </Box>

//             <Box sx={{ marginBottom: "15px" }}>
//               <TextField
//                 label={t("profile.phone")}
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleChange}
//                 placeholder={t("profile.phone")}
//                 required
//                 fullWidth
//                 variant="outlined"
//               />
//             </Box>

//             <Box sx={{ marginBottom: "15px" }}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>{t("profile.areasofactivity")}</InputLabel>
//                 <Select
//                   name="areasofactivity"
//                   value={profileData.areasofactivity}
//                   onChange={handleChange}
//                   label={t("profile.areasofactivity")}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>{t("profile.select_area")}</em>
//                   </MenuItem>
//                   {activityOptions.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 "&:hover": {
//                   bgcolor: "#059669",
//                 },
//               }}
//             >
//               {t("profile.save")}
//             </Button>
//           </form>

//           <Snackbar
//             open={openSnackbar}
//             autoHideDuration={6000}
//             onClose={handleCloseSnackbar}
//             anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           >
//             <Alert
//               onClose={handleCloseSnackbar}
//               severity={errorMessage ? "error" : "success"}
//               sx={{ width: "100%" }}
//             >
//               {errorMessage || successMessage}
//             </Alert>
//           </Snackbar>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProfilePage;
// export const dynamic = "force-dynamic";

