import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box, Divider, Typography, IconButton, Tooltip } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import LayersIcon from '@mui/icons-material/Layers';
import StoreIcon from '@mui/icons-material/Store';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupIcon from '@mui/icons-material/Group';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom";

const menuSections = [
  {
    title: "Dashboard",
    items: [
      { label: "Dashboard", key: "/", icon: <DashboardIcon /> }
    ]
  },
  {
    title: "Catalog Management",
    items: [
      { label: "Products", key: "/products", icon: <ShoppingCartIcon /> },
      { label: "Categories", key: "/categories", icon: <CategoryIcon /> },
      { label: "SubCategories", key: "/subcategories", icon: <LayersIcon /> },
      { label: "Brands", key: "/brands", icon: <StoreIcon /> },
      { label: "Sizes", key: "/sizes", icon: <FormatSizeIcon /> },
      { label: "Colors", key: "/colors", icon: <PaletteIcon /> },
      { label: "Age Groups", key: "/age-groups", icon: <GroupIcon /> }
    ]
  },
  {
    title: "Marketing",
    items: [
      { label: "Banners", key: "/banners", icon: <ImageIcon /> },
      { label: "Discounts", key: "/discounts", icon: <LocalOfferIcon /> }
    ]
  },
  {
    title: "Customer Management",
    items: [
      { label: "Customers", key: "/customers", icon: <PeopleIcon /> },
      { label: "Orders", key: "/orders", icon: <ShoppingBasketIcon /> }
    ]
  }
];

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #232b3e 0%, #1a2236 100%)',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        overflow: 'hidden', // Prevent horizontal overflow
      }}
    >
      {/* Header with logo, name, and toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          height: 64,
          px: 2,
          borderBottom: '1px solid #232b3e',
          flexShrink: 0, // Prevent header from shrinking
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            style={{ 
              width: 36, 
              height: 36, 
              marginRight: collapsed ? 0 : 12, 
              transition: 'margin 0.2s' 
            }} 
          />
          {!collapsed && (
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff' }}>
              DreamDullar
            </Typography>
          )}
        </Box>
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <IconButton 
            onClick={onToggle} 
            sx={{ color: '#fff', ml: collapsed ? 0 : 1 }} 
            size="small"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      
      {/* Scrollable menu content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {menuSections.map((section, sectionIndex) => (
            <Box key={sectionIndex}>
              {!collapsed && section.title !== "Dashboard" && (
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.5)', 
                      fontWeight: 600, 
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      fontSize: '0.75rem'
                    }}
                  >
                    {section.title}
                  </Typography>
                </Box>
              )}
              {section.items.map((item) => {
                // For dashboard, only match exact '/'. For others, match if path starts with key
                const isSelected = item.key === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.key);
                return (
                  <ListItem
                    key={item.key}
                    component={Link}
                    to={item.key}
                    button
                    selected={isSelected}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      mb: 0.5,
                      color: '#fff',
                      position: 'relative',
                      minHeight: 48,
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #3f51b5 0%, #5a55ae 100%)',
                        color: 'white',
                        boxShadow: 3,
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 6,
                          bottom: 6,
                          width: 4,
                          borderRadius: 2,
                          background: 'linear-gradient(180deg, #5a55ae 0%, #3f51b5 100%)',
                        },
                      },
                      '&:hover': {
                        background: 'rgba(63,81,181,0.28)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        color: 'inherit', 
                        minWidth: collapsed ? 0 : 40, 
                        mr: collapsed ? 'auto' : 2, 
                        justifyContent: 'center' 
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText 
                        primary={item.label} 
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: isSelected ? 600 : 400,
                            fontSize: '0.875rem',
                          }
                        }}
                      />
                    )}
                  </ListItem>
                );
              })}
              {sectionIndex < menuSections.length - 1 && !collapsed && (
                <Divider sx={{ my: 1, mx: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
              )}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar; 