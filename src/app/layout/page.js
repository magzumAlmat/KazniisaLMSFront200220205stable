// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllCoursesAction, logoutAction } from "../../store/slices/authSlice";
// // import {
// //   Box,
// //   Container,
// //   Typography,
// //   CircularProgress,
// //   createTheme,
// //   ThemeProvider,
// //   Divider,
// // } from "@mui/material";
// // import TopMenu from "../../components/topmenu";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";

// // // Создаем тему
// // const theme = createTheme({
// //   palette: {
// //     primary: { main: "#009eb0", contrastText: "#fff" }, // Бирюзовый
// //     secondary: { main: "#1e3a8a", contrastText: "#fff" }, // Глубокий синий
// //     background: {
// //       default: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)", // Мягкий градиент фона
// //       paper: "#ffffff", // Белый для контента
// //     },
// //     text: { primary: "#1e293b", secondary: "#64748b" }, // Темный текст для контраста
// //   },
// //   typography: {
// //     fontFamily: "'Open Sans', sans-serif",
// //     h2: { fontWeight: 700, letterSpacing: "-0.5px" }, // Основной заголовок
// //     body1: { fontWeight: 400, lineHeight: 1.6 }, // Текст
// //   },
// //   components: {
// //     MuiDivider: {
// //       styleOverrides: {
// //         root: {
// //           backgroundColor: "rgba(0, 158, 176, 0.3)",
// //           margin: "16px 0",
// //         },
// //       },
// //     },
// //   },
// // });

// // export default function WelcomePage() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();
// //   const { courses, loadingCourses, coursesError } = useSelector((state) => state.auth);
// //   const isAuth = useSelector((state) => state.auth.isAuth);
// //   const [userInfo, setUserInfo] = useState(null);
// //   const [token, setToken] = useState(null);
// //   const host = process.env.NEXT_PUBLIC_HOST;

// //   useEffect(() => {
// //     const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
// //     setToken(storedToken);
// //     if (!storedToken) {
// //       router.push("/login");
// //     }
// //   }, [router]);

// //   useEffect(() => {
// //     if (token) {
// //       dispatch(getAllCoursesAction());
// //       fetchUserInfo();
// //     }
// //   }, [token, dispatch]);

// //   const fetchUserInfo = async () => {
// //     try {
// //       const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUserInfo(response.data);
// //     } catch (err) {
// //       console.error("Ошибка при загрузке информации о пользователе:", err);
// //       if (err.response && err.response.status === 401) {
// //         router.push("/login");
// //       }
// //     }
// //   };

// //   const handleLogout = () => {
// //     dispatch(logoutAction());
// //     localStorage.removeItem("token");
// //     router.push("/login");
// //   };

// //   if (!token || loadingCourses) {
// //     return (
// //       <ThemeProvider theme={theme}>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             height: "100vh",
// //             bgcolor: theme.palette.background.default,
// //           }}
// //         >
// //           <CircularProgress sx={{ color: theme.palette.primary.main }} />
// //         </Box>
// //       </ThemeProvider>
// //     );
// //   }

// //   if (coursesError) {
// //     return (
// //       <ThemeProvider theme={theme}>
// //         <Container sx={{ py: 4, bgcolor: theme.palette.background.default }}>
// //           <Typography variant="h6" color="error" align="center">
// //             Ошибка: {coursesError}
// //           </Typography>
// //         </Container>
// //       </ThemeProvider>
// //     );
// //   }

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <Box
// //         sx={{
// //           bgcolor: theme.palette.background.default,
// //           minHeight: "100vh",
// //           backgroundImage: `url(/background.jpg)`, // Исправлено "backgound" на "background"
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           backgroundRepeat: "no-repeat",
        
// //           position: "relative",
// //           overflow: "hidden",
// //           backgroundImage: `url(/background.jpg)`,
// //           "&:before": {
// //             content: '""',
// //             position: "absolute",
// //             top: "-50%",
// //             left: "-50%",
// //             width: "200%",
// //             height: "200%",
// //             background: "radial-gradient(circle, rgba(0, 158, 176, 0.1) 0%, transparent 70%)",
// //             zIndex: 0,
// //           },
// //         }}
// //       >
// //         <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
// //         <Divider />
// //         <Container maxWidth="md" sx={{ zIndex: 1, py: 6 }}>
// //           <Box
// //             sx={{
// //               bgcolor: "background.paper",
// //               p: 4,
// //               borderRadius: "16px",
// //               boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
// //               border: "1px solid rgba(0, 158, 176, 0.2)",
// //               textAlign: "center",
// //             }}
// //           >
// //             <Typography
// //               variant="h2"
// //               color="text.primary"
// //               sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}
// //             >
// //               Добро пожаловать на платформу buildingSmart Kazakhstan
// //             </Typography>
// //             <Typography
// //               variant="body1"
// //               color="text.secondary"
// //               sx={{
// //                 maxWidth: "800px",
// //                 mx: "auto",
// //                 textAlign: "justify",
// //               }}
// //             >
// //               Добро пожаловать на образовательную платформу по информационному моделированию buildingSmart Kazakhstan для
// //               специалистов строительной отрасли! <br />
// //               Здесь вы найдете курсы, разработанные с учетом практических задач и требований современного строительства.{" "}
// //               <br />
// //               Осваивайте инструменты BIM, повышайте квалификацию и внедряйте цифровые технологии на всех этапах
// //               жизненного цикла объекта — от проектирования до эксплуатации. <br />
// //               Платформа создана для тех, кто хочет работать эффективно, точно и в соответствии с актуальными стандартами
// //               и технологиями.
// //             </Typography>
// //           </Box>
// //         </Container>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }




// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCoursesAction, logoutAction } from "../../store/slices/authSlice";
// import {
//   Box,
//   Container,
//   Typography,
//   CircularProgress,
//   createTheme,
//   ThemeProvider,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import TopMenu from "../../components/topmenu";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import Image from 'next/image'
// // Создаем тему
// const theme = createTheme({
//   palette: {
//     primary: { main: "#009eb0", contrastText: "#fff" }, // Бирюзовый
//     secondary: { main: "#1e3a8a", contrastText: "#fff" }, // Глубокий синий
//     background: {
//       default: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)", // Мягкий градиент фона
//       paper: "#ffffff", // Белый для контента
//     },
//     text: { primary: "#1e293b", secondary: "#64748b" }, // Темный текст для контраста
//   },
//   typography: {
//     fontFamily: "'Open Sans', sans-serif",
//     h2: { fontWeight: 700, letterSpacing: "-0.5px" }, // Основной заголовок
//     body1: { fontWeight: 400, lineHeight: 1.6 }, // Текст
//   },
//   components: {
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "rgba(0, 158, 176, 0.3)",
//           margin: "16px 0",
//         },
//       },
//     },
//     MuiAccordion: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "rgba(255, 255, 255, 0.95)",
//           borderRadius: "8px",
//           marginBottom: "8px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           "&:before": { display: "none" },
//         },
//       },
//     },
//     MuiAccordionSummary: {
//       styleOverrides: {
//         root: {
//           padding: "0 16px",
//           "&:hover": {
//             backgroundColor: "rgba(0, 158, 176, 0.1)",
//           },
//         },
//         content: {
//           margin: "12px 0",
//         },
//       },
//     },
//     MuiAccordionDetails: {
//       styleOverrides: {
//         root: {
//           padding: "0 16px 16px",
//         },
//       },
//     },
//   },
// });

// // Данные для FAQ
// const faqData = [
//   {
//     question: "Получу ли я сертификат по окончании экзамена?",
//     answer:
//       "Да. После успешной сдачи экзамена обучающемуся будут выданы цифровой сертификат и цифровой значок.",
//   },
//   {
//     question: "Какой профессиональный статус я буду иметь после успешной сдачи экзамена?",
//     answer:
//       "Вам будет присвоено профессиональное звание: Foundation: Квалифицированный специалист buildingSMART Уровень 1 (bS-QP-1).",
//   },
//   {
//     question: "Как я могу назначить дату экзамена?",
//     answer: "После завершения курса ваш провайдер назначит дату экзамена.",
//   },
//   {
//     question: "Сколько по времени длится экзамен?",
//     answer: "Экзамен состоит из 25-30 вопросов и длится 30-36 минут.",
//   },
//   {
//     question: "Что будет, если я не сдам экзамен?",
//     answer:
//       "У вас есть 2 попытки сдачи экзамена (1 первичный экзамен, 1 пересдача). За пересдачу взимается плата. Если вы не сдадите пересдачу, вам необходимо будет повторно пройти учебный курс.",
//   },
//   {
//     question: "Какой срок действия сертификата?",
//     answer: "Для уровня Foundation срок действия сертификата не ограничен.",
//   },
//   {
//     question: "Могу ли я сдать экзамен, находясь в другой стране?",
//     answer: "Ограничений по месту проведения онлайн-экзамена нет.",
//   },
//   {
//     question: "Могу ли я сдать экзамен без прохождения учебного курса?",
//     answer:
//       "Нет. Вы должны пройти курс, одобренный buildingSMART, от зарегистрированного провайдера, прежде чем вы сможете приступить к онлайн-экзамену.",
//   },
//   {
//     question: "Как я могу узнать свой результат по экзамену?",
//     answer:
//       "По завершению экзамена вы будете уведомлены о вашем результате на экзаменационной платформе. Результат отображается как «Сдано» или «Не сдано».",
//   },
// ];

// export default function WelcomePage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { courses, loadingCourses, coursesError } = useSelector((state) => state.auth);
//   const isAuth = useSelector((state) => state.auth.isAuth);
//   const [userInfo, setUserInfo] = useState(null);
//   const [token, setToken] = useState(null);
//   const host = process.env.NEXT_PUBLIC_HOST;

//   useEffect(() => {
//     const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     setToken(storedToken);
//     if (!storedToken) {
//       router.push("/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllCoursesAction());
//       fetchUserInfo();
//     }
//   }, [token, dispatch]);

//   const fetchUserInfo = async () => {
//     try {
//       const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserInfo(response.data);
//     } catch (err) {
//       console.error("Ошибка при загрузке информации о пользователе:", err);
//       if (err.response && err.response.status === 401) {
//         router.push("/login");
//       }
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logoutAction());
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   if (!token || loadingCourses) {
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

//   if (coursesError) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Container sx={{ py: 4, bgcolor: theme.palette.background.default }}>
//           <Typography variant="h6" color="error" align="center">
//             Ошибка: {coursesError}
//           </Typography>
//         </Container>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           bgcolor: theme.palette.background.default,
//           minHeight: "100vh",
//           backgroundImage: `url(/background.jpg)`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           position: "relative",
//           overflow: "hidden",
//           "&:before": {
//             content: '""',
//             position: "absolute",
//             top: "-50%",
//             left: "-50%",
//             width: "200%",
//             height: "200%",
//             background: "radial-gradient(circle, rgba(0, 158, 176, 0.1) 0%, transparent 70%)",
//             zIndex: 0,
//           },
//         }}
//       >
//         <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
//         <Divider />
//         <Container maxWidth="md" sx={{ zIndex: 1, py: 6 }}>
//           <Box
//             sx={{
//               bgcolor: "background.paper",
//               p: 4,
//               borderRadius: "16px",
//               boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//               border: "1px solid rgba(0, 158, 176, 0.2)",
//               textAlign: "center",
//               mb: 6, // Добавляем отступ перед FAQ
//             }}
//           >
//             <Typography
//               variant="h2"
//               color="text.primary"
//               sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}
//             >
//               Добро пожаловать на платформу buildingSmart Kazakhstan
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{
//                 maxWidth: "800px",
//                 mx: "auto",
//                 textAlign: "justify",
//               }}
//             >
//               Добро пожаловать на образовательную платформу по информационному моделированию buildingSmart Kazakhstan для
//               специалистов строительной отрасли! <br />
//               Здесь вы найдете курсы, разработанные с учетом практических задач и требований современного строительства.{" "}
//               <br />
//               Осваивайте инструменты BIM, повышайте квалификацию и внедряйте цифровые технологии на всех этапах
//               жизненного цикла объекта — от проектирования до эксплуатации. <br />
//               Платформа создана для тех, кто хочет работать эффективно, точно и в соответствии с актуальными стандартами
//               и технологиями.
//             </Typography>
//           </Box>
//           <h3>Сертификат</h3>
//             <Box
//               sx={{
//                 bgcolor: "background.paper",
//                 p: 3,
//                 borderRadius: "16px",
//                 boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//                 border: "1px solid rgba(0, 158, 176, 0.2)",
//                 display: "flex",
//                 justifyContent: "center",
//                 mb: 6,
//               }}
//             >
              
//               <Image
//                 src="/cert.png"
//                 width={600} // Нормальный размер для десктопа
//                 height={400}
//                 alt="Certificate"
//                 style={{
//                   borderRadius: "8px",
//                   objectFit: "contain",
//                   maxWidth: "100%", // Адаптивность для мобильных устройств
//                   height: "auto",
//                 }}
//               />
//             </Box>



//             <h3>Значок</h3>
//             <Box
//               sx={{
//                 bgcolor: "background.paper",
//                 p: 3,
//                 borderRadius: "16px",
//                 boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//                 border: "1px solid rgba(0, 158, 176, 0.2)",
//                 display: "flex",
//                 justifyContent: "center",
//                 mb: 6,
//               }}
//             >
              
//               <Image
//                 src="/Foundation.png"
//                 width={600} // Нормальный размер для десктопа
//                 height={400}
//                 alt="Certificate"
//                 style={{
//                   borderRadius: "8px",
//                   objectFit: "contain",
//                   maxWidth: "100%", // Адаптивность для мобильных устройств
//                   height: "auto",
//                 }}
//               />
//             </Box>
//           {/* Блок FAQ */}
//           <Box
//             sx={{
//               bgcolor: "background.paper",
//               p: 4,
//               borderRadius: "16px",
//               boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//               border: "1px solid rgba(0, 158, 176, 0.2)",
//             }}
//           >
//             <Typography
//               variant="h4"
//               color="text.primary"
//               sx={{ mb: 3, fontSize: { xs: "1.5rem", md: "2rem" }, textAlign: "center" }}
//             >
//               FAQ Частые вопросы
//             </Typography>
//             {faqData.map((faq, index) => (
//               <Accordion key={index}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography variant="body2" color="text.secondary">
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// }



















"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAction, logoutAction } from "../../store/slices/authSlice";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopMenu from "../../components/topmenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Создаем тему
const theme = createTheme({
  palette: {
    primary: { main: "#009eb0", contrastText: "#fff" }, // Бирюзовый
    secondary: { main: "#1e3a8a", contrastText: "#fff" }, // Глубокий синий
    background: {
      default: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)", // Мягкий градиент фона
      paper: "#ffffff", // Белый для контента
    },
    text: { primary: "#1e293b", secondary: "#64748b" }, // Темный текст для контраста
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h2: { fontWeight: 700, letterSpacing: "-0.5px" }, // Основной заголовок
    body1: { fontWeight: 400, lineHeight: 1.6 }, // Текст
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 158, 176, 0.3)",
          margin: "16px 0",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          marginBottom: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "&:before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 16px",
          "&:hover": {
            backgroundColor: "rgba(0, 158, 176, 0.1)",
          },
        },
        content: {
          margin: "12px 0",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 16px 16px",
        },
      },
    },
  },
});

// Данные для FAQ
const faqData = [
  {
    question: "Получу ли я сертификат по окончании экзамена?",
    answer:
      "Да. После успешной сдачи экзамена обучающемуся будут выданы цифровой сертификат и цифровой значок.",
  },
  {
    question: "Какой профессиональный статус я буду иметь после успешной сдачи экзамена?",
    answer:
      "Вам будет присвоено профессиональное звание: Foundation: Квалифицированный специалист buildingSMART Уровень 1 (bS-QP-1).",
  },
  {
    question: "Как я могу назначить дату экзамена?",
    answer: "После завершения курса ваш провайдер назначит дату экзамена.",
  },
  {
    question: "Сколько по времени длится экзамен?",
    answer: "Экзамен состоит из 25-30 вопросов и длится 30-36 минут.",
  },
  {
    question: "Что будет, если я не сдам экзамен?",
    answer:
      "У вас есть 2 попытки сдачи экзамена (1 первичный экзамен, 1 пересдача). За пересдачу взимается плата. Если вы не сдадите пересдачу, вам необходимо будет повторно пройти учебный курс.",
  },
  {
    question: "Какой срок действия сертификата?",
    answer: "Для уровня Foundation срок действия сертификата не ограничен.",
  },
  {
    question: "Могу ли я сдать экзамен, находясь в другой стране?",
    answer: "Ограничений по месту проведения онлайн-экзамена нет.",
  },
  {
    question: "Могу ли я сдать экзамен без прохождения учебного курса?",
    answer:
      "Нет. Вы должны пройти курс, одобренный buildingSMART, от зарегистрированного провайдера, прежде чем вы сможете приступить к онлайн-экзамену.",
  },
  {
    question: "Как я могу узнать свой результат по экзамену?",
    answer:
      "По завершению экзамена вы будете уведомлены о вашем результате на экзаменационной платформе. Результат отображается как «Сдано» или «Не сдано».",
  },
];

export default function WelcomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses, loadingCourses, coursesError } = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const host = process.env.NEXT_PUBLIC_HOST;

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(storedToken);
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      dispatch(getAllCoursesAction());
      fetchUserInfo();
    }
  }, [token, dispatch]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке информации о пользователе:", err);
      if (err.response && err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!token || loadingCourses) {
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

  if (coursesError) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 4, bgcolor: theme.palette.background.default }}>
          <Typography variant="h6" color="error" align="center">
            Ошибка: {coursesError}
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(0, 158, 176, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          },
        }}
      >
        <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
        <Divider />
        <Container maxWidth="md" sx={{ zIndex: 1, py: 6 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(0, 158, 176, 0.2)",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Typography
              variant="h2"
              color="text.primary"
              sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Добро пожаловать на платформу buildingSmart Kazakhstan
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                textAlign: "justify",
              }}
            >
              Добро пожаловать на образовательную платформу по информационному моделированию buildingSmart Kazakhstan для
              специалистов строительной отрасли! <br />
              Здесь вы найдете курсы, разработанные с учетом практических задач и требований современного строительства.{" "}
              <br />
              Осваивайте инструменты BIM, повышайте квалификацию и внедряйте цифровые технологии на всех этапах
              жизненного цикла объекта — от проектирования до эксплуатации. <br />
              Платформа создана для тех, кто хочет работать эффективно, точно и в соответствии с актуальными стандартами
              и технологиями.
            </Typography>
          </Box>

          {/* Блок с изображениями */}
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(0, 158, 176, 0.2)",
              mb: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Вертикально на мобильных, горизонтально на десктопе
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center", maxWidth: { xs: "100%", md: "50%" } }}>
              {/* <Typography
                variant="h6"
                color="text.primary"
                sx={{ mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
              >
                Сертификат
              </Typography> */}
              <Image
                src="/cert.png"
                width={300} // Уменьшенный размер для размещения двух изображений
                height={200}
                alt="Certificate"
                style={{
                  borderRadius: "8px",
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
            <Box sx={{ textAlign: "center", maxWidth: { xs: "100%", md: "50%" } }}>
              {/* <Typography
                variant="h6"
                color="text.primary"
                sx={{ mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
              >
                Значок
              </Typography> */}
              <Image
                src="/Foundation.png"
                width={300}
                height={200}
                alt="Badge"
                style={{
                  borderRadius: "8px",
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>

          {/* Блок FAQ */}
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(0, 158, 176, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ mb: 3, fontSize: { xs: "1.5rem", md: "2rem" }, textAlign: "center" }}
            >
              FAQ Частые вопросы
            </Typography>
            {faqData.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}