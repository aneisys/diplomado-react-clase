import {z} from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassWord: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres'),
}).refine(data => data.password === data.confirmPassWord, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassWord']
})

export type FormValues = z.infer<typeof schema>;