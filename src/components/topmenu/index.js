
"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Image from 'next/image'
const TopMenu = ({ userInfo, handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, ready } = useTranslation();

  const renderMenuByRole = () => {
    if (!userInfo) return [];

    const menuItems = {
      1: [
        { text: t("topMenu.home"), href: "/layout" },
        { text: t("topMenu.addRole"), href: "/addrole" },
        { text: t("topMenu.profile"), href: "/profile" },
        { text: t("topMenu.logout"), onClick: handleLogout },
      ],
      2: [
        { text: t("topMenu.home"), href: "/layout" },
        { text: t("topMenu.streams"), href: "/addstreams" },
        { text: t("topMenu.courses"), href: "/addcourse" },
        { text: t("topMenu.lessons"), href: "/addlessons" },
        { text: t("topMenu.materials"), href: "/addmaterial" },
        { text: t("topMenu.progress"), href: "/progressstatus" },
        { text: t("topMenu.profile"), href: "/profile" },
        { text: t("topMenu.logout"), onClick: handleLogout },
      ],
      3: [
        { text: t("topMenu.home"), href: "/layout" },
        { text: t("topMenu.courses"), href: "/courses" },
        { text: t("topMenu.profile"), href: "/profile" },
        { text: t("topMenu.logout"), onClick: handleLogout },
      ],
    };

    return (
      menuItems[userInfo.roleId] || [
        { text: t("topMenu.home"), href: "/notauth" },
        { text: t("topMenu.profile"), href: "/profile" },
        { text: t("topMenu.logout"), onClick: handleLogout },
      ]
    );
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {renderMenuByRole().map((item, index) => (
          <ListItem
            key={index}
            component={item.href ? Link : "button"}
            href={item.href}
            onClick={item.onClick}
            sx={{ color: "#1976d2" }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!ready) {
    return <div>Loading translations...</div>; // Показываем загрузку, пока переводы не готовы
  }

  return (
    <>
    <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent", // Прозрачный фон для AppBar
          boxShadow: "none", // Убираем тень, если нужно
        }}
      >
        <Toolbar
          sx={{
            flexWrap: "wrap",
            justifyContent: { xs: "space-between", sm: "space-between" },
            py: { xs: 1, sm: 2 },
            backgroundColor: "transparent", // Прозрачный фон для Toolbar
          }}
        >
        
          {/* <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {t("title")}
          </Typography> */}
         <div style={{ position: 'relative', width: '20%', aspectRatio: '5 / 1' }}>
            <Image
              src="/logo.png"
              fill
              style={{ objectFit: 'contain' }}
              alt="Picture of the author"
            />
          </div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { xs: 1, sm: 2, md: 3 },
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {renderMenuByRole().map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={item.href ? Link : "button"}
                href={item.href}
                onClick={item.onClick}
               
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                  px: { xs: 1, sm: 2 },
                  minWidth: "auto",
                  color: "#333333", // Темно-серый цвет для текста кнопок
                }}
                style={{ fontFamily: "Open Sans",}}
              >
                {item.text}
              </Button>
            ))}
            <LanguageSwitcher />
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ p: 2 }}>
          <h1>{t("title")}</h1>
          <p>{t("welcome")}</p>
          {drawerMenu}
          <LanguageSwitcher />
        </Box>
      </Drawer>
    </>
  );
};

// =======
// "use client";
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Box,
// } from "@mui/material";
// import Link from "next/link";
// import MenuIcon from "@mui/icons-material/Menu";

// const TopMenu = ({ userInfo, handleLogout }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const renderMenuByRole = () => {
//     if (!userInfo) return [];

//     const menuItems = {
//       1: [
//         { text: "Главная", href: "/layout" },
//         { text: "Добавить роль", href: "/addrole" },
//         { text: "Профиль", href: "/profile" },
//         { text: "Выйти", onClick: handleLogout },
//       ],
//       2: [
//         { text: "Главная", href: "/layout" },
//         { text: "Потоки", href: "/addstreams" },
//         { text: "Курсы", href: "/addcourse" },
//         { text: "Предметы", href: "/addlessons" },
//         { text: "Материалы", href: "/addmaterial" },
//         { text: "Прогресс", href: "/progressstatus" },
//         { text: "Профиль", href: "/profile" },
//         { text: "Выйти", onClick: handleLogout },
//       ],
//       3: [
//         { text: "Главная", href: "/layout" },
//         { text: "Курсы", href: "/courses" },
//         { text: "Профиль", href: "/profile" },
//         { text: "Выйти", onClick: handleLogout },
//       ],
//     };

//     return menuItems[userInfo.roleId] || [
//       { text: "Главная", href: "/notauth" },
//       { text: "Профиль", href: "/profile" },
//       { text: "Выйти", onClick: handleLogout },
//     ];
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const drawerMenu = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
//       <List>
//         {renderMenuByRole().map((item, index) => (
//           <ListItem
//             key={index}
//             component={item.href ? Link : "button"}
//             href={item.href}
//             onClick={item.onClick}
//             sx={{ color: "#1976d2" }}
//           >
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static" sx={{ bgcolor: "#374151", borderBottom: "2px solid #1565c0" }}>
//         <Toolbar sx={{ flexWrap: "wrap", justifyContent: { xs: "space-between", sm: "space-between" }, py: { xs: 1, sm: 2 } }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#fff", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//             Kazniisa LMS
//           </Typography>
//           <Box sx={{ display: { xs: "none", sm: "flex" }, gap: { xs: 1, sm: 2, md: 3 }, flexWrap: "wrap" }}>
//             {renderMenuByRole().map((item, index) => (
//               <Button
//                 key={index}
//                 color="inherit"
//                 component={item.href ? Link : "button"}
//                 href={item.href}
//                 onClick={item.onClick}
//                 sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, px: { xs: 1, sm: 2 }, minWidth: "auto" }}
//               >
//                 {item.text}
//               </Button>
//             ))}
//           </Box>
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//         {drawerMenu}
//       </Drawer>
//     </>
//   );
// };


 export default TopMenu;