import { z } from 'zod';
const envSchema = z.object({
   VITE_BACKEND_DOMAIN: z.string(),
});

const parse = envSchema.safeParse(import.meta.env);

if (parse.error) {
   throw new Error('Error in evironment variables : ' + parse.error);
}

export const env = parse.data;
