import Homepage from './Components/Homepage'
import NavBar from './Components/NavBar'
import LoginPage from './Components/LoginPage'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
            borderWidth: '2px',
          },
          '& .MuiFilledInput-root:focus-within .MuiFilledInput-underline:after': {
            borderBottomColor: 'black',
            borderBottomWidth: '2px',
          },
          '& .MuiInput-root:focus-within .MuiInput-underline:after': {
            borderBottomColor: 'black',
            borderBottomWidth: '2px',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />
          
          <Route
            path="/home"
            element={
              <Homepage />
            }
          />
          
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
