import { z } from "zod";


export const BasicAccountSchema = z.object({
  userName: z.string({
    required_error: "El nombre de usuario es requerido",
  })
  .min(6, {
    message: "El nombre de usuario debe tener al menos 6 caracteres",
  })
  .regex(/^[a-zA-Z0-9_]*$/, {
    message: "El nombre de usuario solo puede contener letras, números y guiones bajos",
  })
  .trim(),
  email: z.string({
    required_error: "El correo es requerido",
  })
    .email({
      message: "El correo no es válido",
    })
    .trim(),
  password: z.string({
    required_error: "La contraseña es requerida",
  })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .trim(),
});

//ignore if password min length is less than 6 a partir de basicAccountSchema
export const loginSchema = z.object({
  email: z.string({
    required_error: "El correo es requerido",
  })
    .email({
      message: "El correo no es válido",
    })
    .trim(),
  password: z.string({
    required_error: "La contraseña es requerida",
  })
  .trim(),
})




export const StudentSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  })
  .min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  })
  .trim(),
  lastName: z.string({
    required_error: "El apellido es requerido",
  })
  .min(3, {
    message: "El apellido debe tener al menos 3 caracteres",
  })
  .trim(),
  faculty: z.string({
    required_error: "El nombre es requerido",
  }).min(3, {
    message: "El nombre de la facultad debe tener al menos 3 caracteres",
  }).trim(),
  specialty: z.string({
    required_error: "El nombre es requerido",
  })
  .min(3, {
    message: "La especialidad debe tener al menos 3 caracteres",
  })
  .trim(),
}).merge(BasicAccountSchema);


export const RecruiterSchema = z.object({
  company: z.string({
    required_error: "La empresa es requerida",
  })
  .min(10, {
    message: "La empresa debe tener al menos 10 caracteres"
  })
  .trim(),
  tel: z.string({
    required_error: "El teléfono es requerido",
  })
  .regex(/^\d{10}$/, {
    message: "El teléfono debe tener 10 dígitos",
  })
  .trim(),
  name: z.string({
    required_error: "El nombre es requerido",
  })
  .min(3, {
    message: "El nombre debe tener al menos 3 caracteres"
  })
  .trim(),
}).merge(BasicAccountSchema);

export type BasicAccountSchemaModel = z.infer<typeof BasicAccountSchema>;
export type StudentSchemaModel = z.infer<typeof StudentSchema>;
export type LoginSchemaModel = z.infer<typeof loginSchema>;
export type RecruiterSchemaModel = z.infer<typeof RecruiterSchema>;