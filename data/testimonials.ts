import type {Testimonial} from "@/types";
import {footerImages} from "@/data/footer";
import { baby_shower, events, portrait } from "@/constants";

export const testimonials: Testimonial[] = [
	{
		id: 1,
		clientNames: "KRISTINE & JEREMIAH",
		location: "MANASSAS, VA",
		image: footerImages[0].src,
		testimonial:
			"Shelly Pate photography is worth every penny! Shelly is amazing! She has been so accommodating to our needs throughout the pandemic. Shelly was so proactive and flexible that we didn't have any issues with rescheduling. She not only took care of her scope of work but also coordinated with our videographer to make sure they captured what we wanted. Shelly goes above and beyond what you expect from a vendor. She's professional, but easy to talk to, and she makes the environment fun and comfortable for her clients. This is on top of the beautiful pictures she produces after each session =) We're looking forward to working with her and her husband again in a few months!",
	},
	{
		id: 2,
		clientNames: "SARAH & MICHAEL",
		location: "ALEXANDRIA, VA",
		image: portrait[12],
		testimonial:
			"Working with Villali Photography was an absolute dream! From our engagement session to our wedding day, every moment was captured with such artistry and care. The photos are timeless and beautiful - exactly what we hoped for. Shelly made us feel so comfortable and natural in front of the camera. We couldn't be happier with our choice and highly recommend her to any couple looking for stunning wedding photography.",
	},
	{
		id: 3,
		clientNames: "AMANDA & DAVID",
		location: "WASHINGTON, DC",
		image: events[2],
		testimonial:
			"Shelly exceeded all of our expectations! Her attention to detail and ability to capture the most precious moments of our special day was incredible. She was professional, organized, and made our wedding photography experience seamless. The final gallery brought tears to our eyes - every photo tells our story perfectly. We will treasure these memories forever and can't thank her enough for her amazing work.",
	},
	{
		id: 4,
		clientNames: "JESSICA & RYAN",
		location: "ARLINGTON, VA",
		image: baby_shower[3],
		testimonial:
			"From the moment we met Shelly, we knew she was the perfect photographer for us. Her warm personality and professional approach made us feel at ease throughout the entire process. The photos are absolutely stunning - she captured our love story in the most beautiful way. Every detail, every emotion, every candid moment was perfectly preserved. We highly recommend Villali Photography to anyone looking for exceptional wedding photography.",
	},
];
