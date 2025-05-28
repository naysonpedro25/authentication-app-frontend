export enum ROLE {
   USER = 'USER',
   ADMIN = 'ADM',
}

export interface User {
   name: string;
   id: string;
   email: string;
   role: ROLE;
   created_at: Date;
}
