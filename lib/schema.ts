import {z} from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	weddingDate: z.string().min(1, "Wedding date is required"),
	phone: z.string().min(1, "Phone number is required"),
	weddingLocation: z.string().min(1, "Location is required"),
	referralSource: z.string().min(1, "Please select how you heard about us"),
	serviceType: z.string().min(1, "Please select a service type"),
	photoBudget: z.string().min(1, "This field is required"),
});
