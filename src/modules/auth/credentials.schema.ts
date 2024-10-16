import { z } from "zod";

export const authCredentialsSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  }).email(
    "El email no es valido, por favor ingresa un email valido"
  ),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});


export type AuthCredentials = z.infer<typeof authCredentialsSchema>;
