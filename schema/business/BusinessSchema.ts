import { z } from 'zod';

// Step 1: Basic Business Information
export const BasicBusinessSchema = z.object({
  businessName: z.string().min(1, { message: 'Business name is required' }),
  businessResidence: z
    .string()
    .min(1, { message: 'Business residence is required' }),
  businessEmail: z.string().email({ message: 'Invalid email address' }),
  businessPhoneNumber: z
    .string()
    .min(1, { message: 'Business phone number is required' }),
  annualIncome: z
    .number()
    .min(0, { message: 'Annual income must be a positive number' }),
  numberOfEmployees: z
    .number()
    .min(0, { message: 'Number of employees must be a positive number' }),
});

// Step 2: Advanced Business Details (all optional)
export const AdvancedBusinessSchema = z.object({
  tin: z.string().optional(),
  businessWeb: z.string().url({ message: 'Invalid URL format' }).optional(),
  businessVatNumber: z.string().optional(),
  businessRegistrationCertificate: z.string().optional(),
});

// Complete Business Schema (combination of both steps)
export const BusinessSchema = BasicBusinessSchema.merge(AdvancedBusinessSchema);
