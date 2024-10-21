import { z } from "zod";


export const BasicAccountSchema = z.object({
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
  }).trim(),
  userName: z.string({
    required_error: "El nombre de usuario es requerido",
  }).trim(),
  faculty: z.string({
    required_error: "El nombre es requerido",
  }).trim(),
  specialty: z.string({
    required_error: "El nombre es requerido",
  }).trim(),
}).merge(BasicAccountSchema);


export type BasicAccountSchemaModel = z.infer<typeof BasicAccountSchema>;
export type StudentSchemaModel = z.infer<typeof StudentSchema>;
export type LoginSchemaModel = z.infer<typeof loginSchema>;