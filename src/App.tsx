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
         <Route path="*" element={<NotFound />} />

         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/auth">
            <Route path="" element={<Login />} />
            <Route path="forgot-password">
               <Route path="" element={<ForgotPassword />} />
               <Route path="reset-password" element={<ResetPassword />} />
               <Route
                  path="email-sent"
                  element={<EmailSent objective="forgot-password" />}
               />
            </Route>
         </Route>
         <Route path="/register">
            <Route path="" element={<Resgister />} />
            <Route
               path="email-sent"
               element={<EmailSent objective="register" />}
            />
            <Route path="email-validated" element={<EmailValidated />} />
         </Route>

         <Route
            path="/users"
            element={
               <PrivateRoute>
                  <ListUser />
               </PrivateRoute>
            }
         />
      </Routes>
   );
}

export default App;
