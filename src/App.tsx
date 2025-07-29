import { Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Resgister } from './Pages/Register';
import { ForgotPassword } from './Pages/ForgotPassword';
import { NotFound } from './Pages/NotFound';
import { EmailSent } from './Pages/EmailSent';
import { ListUser } from './Pages/ListUser';
import { Home } from './Pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { EmailValidated } from './Pages/EmailValidated';
import { ResetPassword } from './Pages/ResetPassword';

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />

         <Route path="/auth" element={<Login />} />
         <Route path="/auth/forgot-password" element={<ForgotPassword />} />
         <Route
            path="/auth/forgot-password/reset-password"
            element={<ResetPassword />}
         />
         <Route
            path="/auth/forgot-password/email-sent"
            element={<EmailSent objective="forgot-password" />}
         />

         <Route path="/register" element={<Resgister />} />
         <Route
            path="/register/email-sent"
            element={<EmailSent objective="register" />}
         />
         <Route path="/register/email-validated" element={<EmailValidated />} />

         <Route
            path="/users"
            element={
               <PrivateRoute>
                  <ListUser />
               </PrivateRoute>
            }
         />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

// http://localhost:8080/auth/forgot-password/email-sent

export default App;
