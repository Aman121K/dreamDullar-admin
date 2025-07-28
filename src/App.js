import React, { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, IconButton } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import BrandsPage from "./pages/BrandsPage";
import SizesPage from "./pages/SizesPage";
import ColorsPage from "./pages/ColorsPage";
import AgeGroupsPage from "./pages/AgeGroupsPage";
import BannersPage from "./pages/BannersPage";
import DiscountsPage from "./pages/DiscountsPage";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import CategoriesPage from "./pages/CategoriesPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";
import LoginPage from "./pages/LoginPage";
import AppHeader from "./components/Common/Header";

const drawerWidth = 240;
const collapsedWidth = 64;

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const LayoutWrapper = ({ collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` },
          ml: { sm: `${collapsed ? collapsedWidth : drawerWidth}px` },
          background: 'linear-gradient(90deg, #3f51b5 0%, #5a55ae 100%)',
          boxShadow: 3,
          minHeight: 64,
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <AppHeader />
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: collapsed ? collapsedWidth : drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: 'width 0.2s',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {/* Sidebar now handles its own toggle button in the header */}
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, width: { sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` }, background: '#f7f9fc', minHeight: '100vh' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LayoutWrapper collapsed={collapsed} setCollapsed={setCollapsed} />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubCategoriesPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/sizes" element={<SizesPage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/age-groups" element={<AgeGroupsPage />} />
          <Route path="/banners" element={<BannersPage />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
