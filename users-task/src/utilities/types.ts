import * as z from 'zod';

export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: 'Username must be at least 1 character.',
  }),
  email: z.string().email('Please provide a valid email'),
  address: z.object({
    city: z
      .string()
      .min(1, { message: 'Address must be at leats 1 character' }),
    street: z.string().optional(),
    suite: z.string().optional(),
  }),
});

export type TUser = z.infer<typeof formSchema>;
