import {z} from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	weddingDate: z.string().optional(),
	phone: z.string().min(1, "Phone number is required"),
	weddingLocation: z.string().optional(),
	referralSource: z.string().optional(),
	details: z.string().optional(),
	photoBudget: z.string().optional(), // Used for second textarea about connection to work
});
