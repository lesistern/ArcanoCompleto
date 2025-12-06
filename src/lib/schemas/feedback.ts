import { z } from 'zod';

export const feedbackCategoryEnum = z.enum(['bug', 'feature', 'translation', 'data', 'ui', 'performance', 'other']);
export const feedbackPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);

export const feedbackFormSchema = z.object({
  title: z
    .string()
    .min(10, 'El título debe tener al menos 10 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres')
    .trim(),

  description: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(5000, 'La descripción no puede exceder 5000 caracteres')
    .trim(),

  category: feedbackCategoryEnum,

  priority: feedbackPriorityEnum,
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export const feedbackType = z.enum(['bug', 'feature', 'translation', 'data', 'ui', 'performance', 'other']);
export const feedbackStatus = z.enum(['open', 'in_progress', 'resolved', 'closed', 'wont_fix']);

export type FeedbackCategory = z.infer<typeof feedbackCategoryEnum>;
export type FeedbackPriority = z.infer<typeof feedbackPriorityEnum>;
export type FeedbackStatus = z.infer<typeof feedbackStatus>;
