import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Index from './pages/Index';
import About from './pages/About';
import Cart from './pages/Cart';
import Services from './pages/Services';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/CustomNavbar';
import Contact from './pages/Contact';
import { Flip, ToastContainer, Zoom } from 'react-toastify';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Home from './pages/users/Home';
import UserProvider from './context/user.provider';
import AdminHome from './pages/admin/AdminHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import ViewUserProfile from './pages/admin/ViewUserProfile';
import AddCategory from './pages/admin/AddCategory';
import ViewCategory from './pages/admin/ViewCategory';
import AddProduct from './pages/admin/AddProduct';
import ViewProduct from './pages/admin/ViewProduct';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <UserProvider>
       <BrowserRouter>
        <ToastContainer position="bottom-center" theme="dark" draggable transition={Flip} />
        <CustomNavbar/>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="about" element={<AboutUser />} />
          </Route>
          <Route path="/admins" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route path='userProfile' element={<ViewUserProfile />} />
            <Route path='add-category' element={<AddCategory />} />
            <Route path='categories' element={<ViewCategory />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='products' element={<ViewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;