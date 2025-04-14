
// 'use client';
// import React from 'react';
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Paper,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';

// // Статический список файлов (или можно передать через props)
// const pdfFiles = [
    
//   { name: 'EUBIM_Handbook.pdf', path: '/documents/EUBIM_Handbook.pdf' },
//   { name: 'Guidance-for-Regulators_Industry_Insight_bSI.pdf', path: '/documents/Guidance-for-Regulators_Industry_Insight_bSI.pdf' },
//    { name:  'Handbook-BIM.pdf' ,path:   '/documents/Handbook-BIM.pdf'},
//    { name:  'IFC-Mandate_2025.pdf'  ,path:'/documents/IFC-Mandate_2025.pdf'},
//    { name:  "McKinsey From start‑up to scale‑up Accelerating growth in construction technology (2023).pdf"   ,path:"/documents/McKinsey From start‑up to scale‑up Accelerating growth in construction technology (2023).pdf"},
//    { name:  "McKinsey Global Institute, Reinventing Construction, 2017.pdf"  ,path:'/documents/McKinsey Global Institute, Reinventing Construction, 2017.pdf'},
//    { name:  "Survey_the-role-of-BIM-and-what-the-future-holds.pdf"   ,path:'/documents/Survey_the-role-of-BIM-and-what-the-future-holds.pdf'},
//    { name:  "Technology Report 2024.pdf"    ,path:'/documents/Technology Report 2024.pdf '},
//    { name:  "Transforming construction with AI.pdf"   ,path:'/documents/Transforming construction with AI.pdf '},
//   // Добавь свои файлы
// ];

// const DocumentLibrary = () => {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Библиотека документов
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="PDF documents table">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <Typography variant="h6">Название файла</Typography>
//               </TableCell>
//               <TableCell align="right">
//                 <Typography variant="h6">Действия</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pdfFiles.length > 0 ? (
//               pdfFiles.map((file, index) => (
//                 <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell component="th" scope="row">
//                     {file.name}
//                   </TableCell>
//                   <TableCell align="right">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       startIcon={<DownloadIcon />}
//                       href={file.path}
//                       download
//                     >
//                       Скачать
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={2} align="center">
//                   <Typography variant="body1">Документы не найдены</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default DocumentLibrary;

'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/slices/authSlice'; // Укажи правильный путь
import TopMenu from '@/components/topmenu';

// Тема
const theme = createTheme({
    palette: {
      primary: { main: "#009eb0", contrastText: "#fff" }, // Бирюзовый
      secondary: { main: "#1e3a8a", contrastText: "#fff" }, // Глубокий синий
      background: {
        default: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)", // Мягкий градиент фона
        paper: "#ffffff", // Белый для карточек
      },
      text: { primary: "#1e293b", secondary: "#64748b" }, // Темный текст для контраста
    },
    typography: {
      fontFamily: "'Open Sans', sans-serif",
      h4: { fontWeight: 700, letterSpacing: "-0.5px" }, // Жирный заголовок
      h6: { fontWeight: 600 },
      body2: { fontWeight: 400, lineHeight: 1.5 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 158, 176, 0.3)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 158, 176, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 20px rgba(0, 158, 176, 0.3)",
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: "#009eb0",
          },
        },
      },
    },
  });

// Статический список файлов
const pdfFiles = [
  { name: 'EUBIM_Handbook.pdf', path: '/documents/EUBIM_Handbook.pdf' },
  { name: 'Guidance-for-Regulators_Industry_Insight_bSI.pdf', path: '/documents/Guidance-for-Regulators_Industry_Insight_bSI.pdf' },
  { name: 'Handbook-BIM.pdf', path: '/documents/Handbook-BIM.pdf' },
  { name: 'IFC-Mandate_2025.pdf', path: '/documents/IFC-Mandate_2025.pdf' },
  {
    name: 'McKinsey From start-up to scale-up Accelerating growth in construction technology (2023).pdf',
    path: '/documents/McKinsey From start-up to scale-up Accelerating growth in construction technology (2023).pdf',
  },
  { name: 'McKinsey Global Institute, Reinventing Construction, 2017.pdf', path: '/documents/McKinsey Global Institute, Reinventing Construction, 2017.pdf' },
  { name: 'Survey_the-role-of-BIM-and-what-the-future-holds.pdf', path: '/documents/Survey_the-role-of-BIM-and-what-the-future-holds.pdf' },
  { name: 'Technology Report 2024.pdf', path: '/documents/Technology Report 2024.pdf' },
  { name: 'Transforming construction with AI.pdf', path: '/documents/Transforming construction with AI.pdf' },
];

const DocumentLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const host = process.env.NEXT_PUBLIC_HOST ; // Укажи дефолтный хост
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`${host}/api/auth/getAuthentificatedUserInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error('Ошибка при загрузке информации о пользователе:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          dispatch(logoutAction());
          router.push('/login');
        }
      }
    };

    fetchUserInfo();
  }, [router, dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.background.default,
          py: 6,
        }}
      >
        <TopMenu userInfo={userInfo} handleLogout={handleLogout} />
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 4,
              color: theme.palette.text.primary,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Библиотека документов
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 158, 176, 0.2)',
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="PDF documents table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 3 }}>
                    <Typography variant="h6" color="text.primary">
                      Название файла
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 3 }}>
                    <Typography variant="h6" color="text.primary">
                      Действия
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Загрузка документов...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : pdfFiles.length > 0 ? (
                  pdfFiles.map((file, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 158, 176, 0.05)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ py: 2 }}>
                        <Typography variant="body2" color="text.primary">
                          {file.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          href={file.path}
                          download
                          sx={{ fontWeight: 600 }}
                        >
                          Скачать
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Документы не найдены
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DocumentLibrary;