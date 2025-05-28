import { api } from '@/lib/api';

export async function fetchUsers(page: number) {
   try {
      const { data } = await api.get(`/users?page=${page}`);
      return data;
   } catch (error) {
      console.error(error);
      throw new Error('Error in fetchUsers');
   }
}
export async function fetchUser() {
   try {
      const { data, status } = await api.get(`/users/me`, {
         validateStatus: (status) => status >= 200 && status < 500, // Evita que Axios lance erros para status < 500
      });

      if (status >= 200 && status < 300) {
         return data;
      } else {
         throw new Error(`Error in fetchUser: ${status}`);
      }
   } catch (error) {
      throw new Error('Error in fetchUser' + error);
   }
}

export async function register(name: string, email: string, password: string) {
   try {
      await api.post('/register', {
         name,
         email,
         password,
      });
   } catch (error) {
      console.error(error);
      throw new Error('Error in register');
   }
}
export async function validate(validateToken: string) {
   try {
      console.log(validateToken);
      const response = await api.patch(
         '/register/validate?token=' + validateToken,
      );
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      console.error(error);
      throw error.response?.data || error;
   }
}

export async function forgotPassword(email: string) {
   try {
      const response = await api.post('/auth/forgot-password', {
         email,
      });
      return response;
   } catch (error) {
      console.error(error);
      throw new Error('Error in forgotPassword');
   }
}

export async function resetPassword(token: string, newPassword: string) {
   try {
      const response = await api.post(`/auth/reset-password?token=${token}`, {
         newPassword,
      });
      return response;
   } catch (error) {
      console.error(error);
      throw new Error('Error in reset password');
   }
}
