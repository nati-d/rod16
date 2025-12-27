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
	const [submitError, setSubmitError] = useState<string | null>(null);

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
	const weddingDate = watch("weddingDate");
	const weddingLocation = watch("weddingLocation");
	const referralSource = watch("referralSource");
	const serviceType = watch("serviceType");
	const photoBudget = watch("photoBudget");
	const isFormValid = name && email && phone && weddingDate && weddingLocation && referralSource && serviceType && photoBudget && 
		!errors.name && !errors.email && !errors.phone && !errors.weddingDate && !errors.weddingLocation && !errors.referralSource && !errors.serviceType && !errors.photoBudget;

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);
		
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// Check if response is JSON
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				// Response is not JSON (likely an HTML error page)
				const text = await response.text();
				console.error("Non-JSON response received:", text.substring(0, 200));
				throw new Error("Server error: API route returned an error page. Please check server logs.");
			}

			const result = await response.json();

			if (!response.ok || !result.success) {
				const errorMessage = result.error || result.details || "Failed to send message";
				throw new Error(errorMessage);
			}

			setSubmitSuccess(true);
			reset();
		} catch (error: any) {
			console.error("Error submitting form:", error);
			let errorMessage = "Failed to send message. Please try again or contact us directly at rod16zedo@gmail.com";
			
			if (error.message) {
				errorMessage = error.message;
			} else if (error instanceof SyntaxError) {
				errorMessage = "Server returned invalid response. The API route may have an error.";
			}
			
			setSubmitError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-6 max-w-2xl mx-auto'
		>
			<div className='text-center mb-16'>
				<h2 className='mb-8 text-2xl font-light tracking-wide text-foreground'>
					<span className='text-4xl'>I&apos;m </span>
					<span className='relative imperial-script inline-block text-[4rem] italic font-bold text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-primary after:rounded-full'>
						excited
					</span>
					<br />
					<span className='italic text-4xl'>to connect with you!</span>
				</h2>

					<div className='mx-auto max-w-3xl  '>
						<p className="max-w-2xl mx-auto text-sm font-light leading-relaxed text-foreground/70 sm:text-base">
							I&apos;d love to learn more about your story, your personality, and your dreams. Send me a message using the form below!
						</p>
					</div>
					</div>
			<div className='space-y-6'>
				{/* Name Field */}
				<div>
					<label htmlFor="name" className='block text-base font-medium text-foreground mb-2'>
						Hey hey! What&apos;s your name? <span className='text-red-500'>*</span>
					</label>
					<input
						id="name"
						type='text'
						{...register("name")}
						placeholder='Mark Henry'
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground placeholder:text-foreground/60 ${
							errors.name
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>}
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className='block text-base font-medium text-foreground mb-2'>
						Email address <span className='text-red-500'>*</span>
					</label>
					<input
						id="email"
						type='email'
						{...register("email")}
						placeholder='mark.henry@email.com'
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground placeholder:text-foreground/60 ${
							errors.email
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>}
				</div>

				{/* Wedding Date */}
				<div>
					<label htmlFor="weddingDate" className='block text-base font-medium text-foreground mb-2'>
						When? <span className='text-red-500'>*</span>
					</label>
					<input
						id="weddingDate"
						type='date'
						{...register("weddingDate")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.weddingDate
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.weddingDate && <p className='mt-1 text-xs text-red-500'>{errors.weddingDate.message}</p>}
				</div>

				{/* Phone */}
				<div>
					<label htmlFor="phone" className='block text-base font-medium text-foreground mb-2'>
						Phone <span className='text-red-500'>*</span>
					</label>
					<input
						id="phone"
						type='tel'
						{...register("phone")}
						placeholder='(555) 123-4567'
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground placeholder:text-foreground/60 ${
							errors.phone
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.phone && <p className='mt-1 text-xs text-red-500'>{errors.phone.message}</p>}
				</div>

				{/* Location */}
				<div>
					<label htmlFor="weddingLocation" className='block text-base font-medium text-foreground mb-2'>
						Location? <span className='text-red-500'>*</span>
					</label>
					<input
						id="weddingLocation"
						type='text'
						{...register("weddingLocation")}
						placeholder='Rad venue, epic mountain, or friend&apos;s backyard here!'
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground placeholder:text-foreground/60 ${
							errors.weddingLocation
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					/>
					{errors.weddingLocation && <p className='mt-1 text-xs text-red-500'>{errors.weddingLocation.message}</p>}
				</div>

				{/* Referral Source */}
				<div>
					<label htmlFor="referralSource" className='block text-base font-medium text-foreground mb-2'>
						How did you hear about me? <span className='text-red-500'>*</span>
					</label>
					<select
						id="referralSource"
						{...register("referralSource")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.referralSource
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
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
					{errors.referralSource && <p className='mt-1 text-xs text-red-500'>{errors.referralSource.message}</p>}
				</div>

				{/* Service Type */}
				<div>
					<label htmlFor="serviceType" className='block text-base font-medium text-foreground mb-2'>
						What kind of service do you want? <span className='text-red-500'>*</span>
					</label>
					<select
						id="serviceType"
						{...register("serviceType")}
						className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-foreground ${
							errors.serviceType
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
						defaultValue=''
					>
						<option value='' disabled className='bg-background text-foreground/60'>
							Select a service
						</option>
						<option value='Wedding Photography' className='bg-background text-foreground'>Wedding Photography</option>
						<option value='Engagement Session' className='bg-background text-foreground'>Engagement Session</option>
						<option value='Portrait Session' className='bg-background text-foreground'>Portrait Session</option>
						<option value='Family Photography' className='bg-background text-foreground'>Family Photography</option>
						<option value='Event Photography' className='bg-background text-foreground'>Event Photography</option>
						<option value='Other' className='bg-background text-foreground'>Other</option>
					</select>
					{errors.serviceType && <p className='mt-1 text-xs text-red-500'>{errors.serviceType.message}</p>}
				</div>

				{/* Additional Details */}
				<div>
					<label htmlFor="photoBudget" className='block text-base font-medium text-foreground mb-2'>
						What do you feel when you see my works on this site? <span className='text-red-500'>*</span>
					</label>
					<textarea
						id="photoBudget"
						{...register("photoBudget")}
						placeholder='I feel inspired and excited about capturing our special moments...'
						rows={4}
						className={`w-full border-2 p-3 focus:outline-none bg-transparent text-foreground placeholder:text-foreground/60 resize-none ${
							errors.photoBudget
								? "border-red-500 focus:border-red-500"
								: "border-primary/50 focus:border-primary"
						}`}
					></textarea>
					{errors.photoBudget && <p className='mt-1 text-xs text-red-500'>{errors.photoBudget.message}</p>}
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
			{submitSuccess && (
				<div className='text-center p-4 bg-primary/5 text-primary rounded'>
					Thank you for your message! I&apos;ll get back to you soon.
				</div>
			)}

			{/* Error Message */}
			{submitError && (
				<div className='text-center p-4 bg-red-500/10 text-red-500 rounded border border-red-500/20'>
					<p className='font-medium mb-1'>Failed to send message</p>
					<p className='text-sm'>{submitError}</p>
					<p className='text-sm mt-2'>
						Please try again or contact us directly at{" "}
						<a href='mailto:rod16zedo@gmail.com' className='underline hover:text-red-600 cursor-pointer'>
							rod16zedo@gmail.com
						</a>
					</p>
				</div>
			)}
		</form>
	);
}
