import {Button} from "@/components/ui/button";
import {Quote, Award, Camera, Heart, MapPin, Calendar, Users} from "lucide-react";
import type {SectionProps} from "@/types";
import Link from "next/link";
import OptimizedImage from "@/components/ui/optimized-image";

interface AboutSectionProps extends SectionProps {
	variant?: "homepage" | "page";
}

export default function AboutSection({className, variant = "homepage"}: AboutSectionProps) {
	if (variant === "page") {
		return (
			<section
				id='about'
				className={`bg-background px-4 py-20 sm:px-6 lg:px-8 ${className || ""}`}
			>
				<div className='mx-auto container'>
					{/* Page Header */}
					<div className='text-center mb-20'>
						<div className='inline-flex items-center gap-4 mb-6'>
							<div className='h-px w-12 bg-primary/20'></div>
							<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>About Me</span>
							<div className='h-px w-12 bg-primary/20'></div>
						</div>
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-light italic tracking-wide text-foreground mb-4'>Meet Your Photographer</h1>
						<p className='text-sm text-foreground/60 max-w-2xl mx-auto italic'>Capturing love stories with an artistic eye and documentary heart</p>
					</div>

					{/* Main Content Grid */}
					<div className='grid lg:grid-cols-2 gap-16 items-center'>
						{/* Left Column - Portrait */}
						<div className='relative'>
							<div className='aspect-[4/5] overflow-hidden rounded-lg shadow-2xl relative'>
								<OptimizedImage
									src='https://images.pexels.com/photos/6948652/pexels-photo-6948652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
									alt='Zadig Shiferaw, Professional Photographer & Visual Storyteller, standing in a professional setting'
									fill
									className='hover:scale-105 transition-transform duration-700'
								/>
							</div>

							{/* Floating Quote Card */}
							<div className='absolute -bottom-8 -right-8 bg-background p-8 rounded-lg shadow-xl border border-secondary/20 max-w-xs'>
								<Quote className='h-8 w-8 text-primary mb-4' />
								<blockquote className='text-base italic text-foreground/70 leading-relaxed'>"Capturing love, light, and legacy"</blockquote>
							</div>
						</div>

						{/* Right Column - Content */}
						<div className='space-y-8'>
							<div>
								<h2 className='text-4xl font-light tracking-wide text-foreground mb-4'>
									HELLO, I'M <span className='text-primary'>ZADIG SHIFERAW</span>
								</h2>
								<div className='h-px w-16 bg-primary/30 mb-6'></div>
								<p className='text-sm font-medium tracking-[0.2em] text-foreground/60 uppercase mb-2'>Photographer & Visual Storyteller</p>
									<p className='text-foreground/60 font-light mb-6'>Serving Virginia, Maryland & Worldwide</p>
							</div>

							<div className='space-y-6 text-base leading-relaxed text-foreground/70'>
								<p className='text-lg font-light leading-relaxed'>
									I discovered my passion for photography by capturing special moments in my community. Seeing the impact of my work inspired
									me to pursue it professionally, turning a creative gift into a meaningful career.
								</p>

								<p>
									With over a decade of experience in photography, I specialize in capturing meaningful moments through weddings, portraits,
									and lifestyle imagery. My approach blends{" "}
									<em className='text-foreground font-medium'>technical expertise with a creative eye</em>, producing elegant, story-driven
									visuals that truly connect.
								</p>

								<p>
									My photography style is clean, emotional, and storytelling-focused. Over the years, it has evolved to become more refined
									and intentional, blending natural light with artistic composition to capture timeless moments.
								</p>

								<p>
									Over the years, I've worked with diverse clients across various cultures and events, building a strong reputation for
									professionalism and consistency. I offer detail-focused services both locally and internationally, delivering timeless
									images that truly connect.
								</p>

								<p className='text-lg font-light italic text-foreground/70 border-l-4 border-primary/20 pl-6'>
									The most rewarding part of my photography career is seeing the joy on my clients' faces when they receive their
									photos—knowing I've helped preserve a moment they'll treasure forever.
								</p>
							</div>

							{/* Stats */}
							<div className='grid grid-cols-3 gap-6 pt-8 border-t border-secondary/20'>
								<div className='text-center'>
									<div className='flex justify-center mb-2'>
										<Award className='h-6 w-6 text-primary' />
									</div>
									<div className='text-2xl font-light text-foreground'>10+</div>
									<div className='text-sm text-foreground/60'>Years Experience</div>
								</div>
								<div className='text-center'>
									<div className='flex justify-center mb-2'>
										<Users className='h-6 w-6 text-primary' />
									</div>
									<div className='text-2xl font-light text-foreground'>500+</div>
									<div className='text-sm text-foreground/60'>Clients Served</div>
								</div>
								<div className='text-center'>
									<div className='flex justify-center mb-2'>
										<MapPin className='h-6 w-6 text-primary' />
									</div>
									<div className='text-2xl font-light text-foreground'>25+</div>
									<div className='text-sm text-foreground/60'>States Covered</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Homepage version - More concise
	return (
		<section
			id='about'
			className={`bg-gradient-to-b from-stone-50 to-white px-4 py-32 sm:px-6 lg:px-8 ${className || ""}`}
		>
			<div className='mx-auto container'>
				<div className='lg:flex lg:gap-32 items-stretch'>
					{/* Left Column - Enhanced Photo Section */}
					<div className='relative flex-1 flex flex-col justify-center order-2 lg:order-1'>
						{/* Decorative Background Element */}
						<div className='absolute -inset-4 bg-gradient-to-br from-secondary to-transparent rounded-lg -z-10'></div>

						{/* Main Portrait */}
						<div className='relative lg:ml-20'>
							<div className='aspect-[4/5] overflow-hidden rounded-sm shadow-2xl h-full relative'>
								<OptimizedImage
									src='https://images.pexels.com/photos/6948652/pexels-photo-6948652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
									alt='Zadig Shiferaw, Professional Photographer & Visual Storyteller, standing in a professional setting'
									fill
									className='hover:scale-105 transition-transform duration-700'
									sizes='(max-width: 768px) 100vw, 50vw'
									priority
								/>
							</div>

							{/* Floating Quote Card */}
							<div className='absolute -bottom-6 -right-6 bg-background p-6 rounded-sm shadow-xl border border-secondary/10 max-w-xs'>
								<Quote className='h-6 w-6 text-foreground/60 mb-3' />
								<blockquote className='text-sm italic text-foreground/60 leading-relaxed'>"Capturing love, light, and legacy"</blockquote>
							</div>
						</div>
					</div>

					{/* Right Column - Enhanced Content */}
					<div className='flex-1 flex flex-col justify-center order-1 lg:order-2 lg:pl-12'>
						{/* Main Heading with Enhanced Typography */}
						<div className='mb-8'>
							<h2 className='text-5xl font-extralight tracking-wide text-stone-800 sm:text-6xl lg:text-7xl mb-4 leading-tight'>
								HELLO,
								<br />
								<span className='bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>I'M ZADIG SHIFERAW</span>
							</h2>
							<div className='h-px w-24 bg-gradient-to-r from-foreground/60 to-transparent'></div>
						</div>

						{/* Enhanced Subheading */}
						<div className='mb-10'>
							<p className='text-sm font-medium tracking-[0.2em] text-foreground/60 uppercase mb-4'>Photographer & Visual Storyteller</p>
							<p className='text-foreground/60 font-light'>Serving Virginia, Maryland & Worldwide</p>
						</div>

						{/* Enhanced Introduction - More concise for homepage */}
						<div className='space-y-6 text-base leading-relaxed text-foreground/60 mb-12'>
							<p className='text-lg font-light leading-relaxed'>
								With over a decade of experience in photography, I specialize in capturing meaningful moments through weddings, portraits, and
								lifestyle imagery.
							</p>

							<p>
								My approach blends <em className='text-foreground font-medium'>technical expertise with a creative eye</em>, producing elegant,
								story-driven visuals that truly connect.
							</p>

							<p>
								Over the years, I've worked with diverse clients across various cultures and events, building a strong reputation for
								professionalism and consistency. I offer detail-focused services both locally and internationally.
							</p>

							<p className='text-lg font-light italic text-foreground/60 border-l-2 border-primary/10 pl-6'>
								Every frame carefully composed. Deeply felt.
							</p>
						</div>

						{/* Enhanced Call to Action */}
						<div className='flex flex-col sm:flex-row gap-4'>
							<Link href='/about'>
								<Button
									variant='outline'
									className='border-primary/10 bg-background/80 backdrop-blur-sm px-8 py-4 text-foreground/60 hover:bg-primary/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300 font-medium tracking-wider'
								>
									LEARN MORE ABOUT ME
								</Button>
							</Link>
							<Link href='/portfolio'>
								<Button className='bg-primary hover:bg-primary/80 text-background px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-medium tracking-wider'>
									VIEW MY WORK
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
