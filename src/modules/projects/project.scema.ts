import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string({
    required_error: 'El titulo es requerido',
  })
  .min(10, {
    message: 'El titulo debe tener al menos 10 caracteres',
  })
  .trim(),
  description: z.string({
    required_error: 'La descripción es requerida',
  })
  .min(20, {
    message: 'La descripción debe tener al menos 20 caracteres',
  })
  .trim(),
  url: z.string({
    required_error: 'La URL es requerida',
  }).url({
    message: 'La URL no es válida',
  }).trim(),
  tags: z.string({
    required_error: 'Las etiquetas son requeridas',
  })
  .trim()
  .refine((tags) => {
    const tagsArray = tags.split(',');
    return tagsArray.length <= 5
  }, {
    message: 'No puedes agregar más de 5 etiquetas',
  })
});

export type projectModelData = z.infer<typeof ProjectSchema>;
