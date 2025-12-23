"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {contactFormSchema} from "@/lib/schema";

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: {errors},
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		mode: "onBlur", // Validate on blur (when user leaves the field)
	});

	// Watch required fields to determine if form is ready
	const name = watch("name");
	const email = watch("email");
	const phone = watch("phone");
	const isFormValid = name && email && phone && !errors.name && !errors.email && !errors.phone;

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		try {
			// Here you would typically send the data to your backend
			console.log("Form data:", data);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setSubmitSuccess(true);
			reset();
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-6 max-w-2xl mx-auto'
		>
			<div className='space-y-4 text-sm'>
				<p className='text-foreground/60 leading-relaxed'>
					If you believe we'd be a great match, kindly complete the form below to share a little about your story and vision for your special day. I
					aim to respond within 24 business hours. If you don't hear from us within 24 business hours, please ensure to check your spam folder or
					reach out directly via email at{" "}
					<a
						href='mailto:rod16zedo@gmail.com'
						className='text-primary underline'
					>
						rod16zedo@gmail.com
					</a>
					.
				</p>
			</div>

			<div className='space-y-6'>
				{/* Name Field */}
				<div>
					<label htmlFor="name" className='block text-sm font-medium text-foreground mb-2'>
						Hey hey! What&apos;s your name? <span className='text-red-500'>*</span>
					</label>
					<input
						id="name"
						type='text'
						{...register("name")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.name
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>}
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className='block text-sm font-medium text-foreground mb-2'>
						Email address <span className='text-red-500'>*</span>
					</label>
					<input
						id="email"
						type='email'
						{...register("email")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.email
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>}
				</div>

				{/* Wedding Date */}
				<div>
					<label htmlFor="weddingDate" className='block text-sm font-medium text-foreground mb-2'>
						When? (It&apos;s okay if you are undecided!)
					</label>
					<input
						id="weddingDate"
						type='date'
						{...register("weddingDate")}
						className='w-full border-b-2 border-primary/50 py-2 focus:outline-none focus:border-primary bg-transparent text-foreground'
					/>
				</div>

				{/* Phone */}
				<div>
					<label htmlFor="phone" className='block text-sm font-medium text-foreground mb-2'>
						Phone <span className='text-red-500'>*</span>
					</label>
					<input
						id="phone"
						type='tel'
						{...register("phone")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.phone
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.phone && <p className='mt-1 text-xs text-red-500'>{errors.phone.message}</p>}
				</div>

				{/* Location */}
				<div>
					<label htmlFor="weddingLocation" className='block text-sm font-medium text-foreground mb-2'>
						Location?
					</label>
					<input
						id="weddingLocation"
						type='text'
						{...register("weddingLocation")}
						placeholder='Rad venue, epic mountain, or friend&apos;s backyard here!'
						className='w-full border-b-2 border-primary/50 py-2 focus:outline-none focus:border-primary bg-transparent text-foreground placeholder:text-foreground/60'
					/>
				</div>

				{/* Referral Source */}
				<div>
					<label htmlFor="referralSource" className='block text-sm font-medium text-foreground mb-2'>
						How did you hear about me?
					</label>
					<select
						id="referralSource"
						{...register("referralSource")}
						className='w-full border-b-2 border-primary/50 py-2 focus:outline-none focus:border-primary bg-transparent text-foreground'
						defaultValue=''
					>
						<option value='' disabled className='bg-background text-foreground/60'>
							Select an option
						</option>
						<option value='Instagram' className='bg-background text-foreground'>Instagram</option>
						<option value='Facebook' className='bg-background text-foreground'>Facebook</option>
						<option value='Google' className='bg-background text-foreground'>Google</option>
						<option value='Friend/Family' className='bg-background text-foreground'>Friend / Family</option>
						<option value='Vendor' className='bg-background text-foreground'>Vendor referral</option>
						<option value='Wedding planner' className='bg-background text-foreground'>Wedding planner</option>
						<option value='Other' className='bg-background text-foreground'>Other</option>
					</select>
				</div>

				{/* Details */}
				<div>
					<label htmlFor="details" className='block text-sm font-medium text-foreground mb-2'>
						Tell me about y&apos;all!! What&apos;s your partner&apos;s name?? What&apos;s your story!? Do y&apos;all have fur babies? What are your hobbies? How did y&apos;all meet? What do you want to remember about your relationship down the road?
					</label>
					<textarea
						id="details"
						{...register("details")}
						placeholder='Give me all the deets!'
						rows={6}
						className='w-full border-2 border-primary/50 p-3 focus:outline-none focus:border-primary bg-transparent text-foreground placeholder:text-foreground/60 resize-none'
					></textarea>
				</div>

				{/* Additional Details */}
				<div>
					<label htmlFor="photoBudget" className='block text-sm font-medium text-foreground mb-2'>
						What about my work did you connect with? Why is photography important to you?
					</label>
					<textarea
						id="photoBudget"
						{...register("photoBudget")}
						rows={4}
						className='w-full border-2 border-primary/50 p-3 focus:outline-none focus:border-primary bg-transparent text-foreground placeholder:text-foreground/60 resize-none'
					></textarea>
				</div>
			</div>

			{/* Submit Button */}
			<div className='pt-6 flex justify-end'>
				<button
					type='submit'
					disabled={isSubmitting || !isFormValid}
					className={`w-full sm:w-auto px-8 py-3 text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
						isFormValid
							? "bg-primary text-white hover:bg-primary/80 hover:scale-105 active:bg-primary/90 active:scale-100 cursor-pointer shadow-lg hover:shadow-xl"
							: "bg-secondary/30 text-foreground cursor-not-allowed"
					}`}
				>
					{isSubmitting ? "Sending..." : "SEND"}
				</button>
			</div>

			{/* Success Message */}
			{submitSuccess && <div className='text-center p-4 bg-primary/5 text-primary'>Thank you for your message! I&apos;ll get back to you soon.</div>}
		</form>
	);
}
