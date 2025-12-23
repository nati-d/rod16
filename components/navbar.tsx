"use client";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import type {NavItem} from "@/types";
import {navItems} from "@/data/navbar";
import OptimizedImage from "@/components/ui/optimized-image";

interface NavbarProps {
	opacity: number;
	blur: number;
}

export default function Navbar({opacity, blur}: NavbarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<>
			{/* Top Row: Responsive Info and Logo */}
			<div className='relative z-40 bg-background pt-6 pb-2'>
				<div className='container'>
					{/* Desktop: info left, logo center, info right. Mobile: logo center, hamburger right, info below */}
					<div className='hidden md:flex items-center justify-between min-h-20 py-2'>
						{/* Left Info */}
						{/* <div className='text-xs tracking-wider text-foreground/80 whitespace-nowrap font-[Playfair Display,serif] italic uppercase'>
							WEDDING PHOTOGRAPHER BASED IN NORTHERN VA
						</div> */}
						{/* Logo Centered */}
						<div className='flex flex-col items-center mx-auto'>
							{/* <span
								className='text-[2.5rem] font-bold text-primary leading-none tracking-tight'
								style={{fontFamily: "Playfair Display, serif"}}
							>
								RP
							</span> */}
							<div className='relative w-24 h-24 mb-2'>
								<OptimizedImage 
									src="/logo.png" 
									alt="Rod16 Photography" 
									fill
									className="object-contain"
									priority
								/>
							</div>

							<span
								className='text-primary text-base sm:text-lg tracking-[0.3em] font-light mt-1 whitespace-nowrap block'
								style={{fontFamily: "Playfair Display, serif", color: "#2F3D3F"}}
							>
								ROD16 PHOTOGRAPHY
							</span>
						</div>
						{/* Right Info */}
						{/* <div className='text-xs tracking-wider text-foreground/80 whitespace-nowrap font-[Playfair Display,serif] italic uppercase'>
							SERVING THE DMV AND WORLDWIDE.ESTD. 2016
						</div> */}
					</div>
					{/* Mobile: logo left, hamburger right, info below */}
					<div className='flex md:hidden items-center justify-between relative'>
						{/* Logo Left */}
						<div className='flex flex-col items-start'>
							<div className='relative w-16 h-16 mb-1'>
								<OptimizedImage 
									src="/logo.png" 
									alt="Rod16 Photography" 
									fill
									className="object-contain"
									priority
								/>
							</div>
							<span
								className='text-primary text-sm tracking-[0.2em] font-light mt-1 whitespace-nowrap'
								style={{fontFamily: "Playfair Display, serif", color: "#2F3D3F"}}
							>
								ROD16 PHOTOGRAPHY
							</span>
						</div>
						{/* Hamburger Menu Right */}
						<div
							className='flex items-center h-14 w-14 justify-center text-primary cursor-pointer select-none'
							onClick={toggleMobileMenu}
							aria-label='Open menu'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") toggleMobileMenu();
							}}
						>
							{isMobileMenuOpen ? <X className='h-12 w-12' /> : <Menu className='h-12 w-12' />}
						</div>
					</div>
					{/* Mobile: Info Text Below Logo */}
					<div className='md:hidden mt-2 mb-2 text-center'>
						{/* <div className='font-[Playfair Display,serif] italic tracking-widest text-[0.85rem] text-foreground/80 leading-snug'>
							<div className='uppercase'>WEDDING PHOTOGRAPHER BASED IN NORTHERN VA</div>
							<div className='uppercase'>SERVING THE DMV AND WORLDWIDE.ESTD. 2016</div>
						</div> */}
					</div>
				</div>
			</div>

			{/* Sticky Navigation Menu (Desktop) */}
			<div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"}`}>
				<div className='container'>
					<div className='hidden md:flex h-14 items-center justify-center'>
						<nav className='w-full'>
							<div className='flex items-center justify-center space-x-4 lg:space-x-12'>
								{navItems.map((item, index) => {
									const active = isActive(item.href);
									return (
										<div
											key={item.name}
											className='flex items-center'
										>
											<Link
												href={item.href}
												className={`text-xs font-medium tracking-wider transition-colors duration-200 whitespace-nowrap ${
													active
														? "text-primary font-semibold"
														: "text-foreground/80 hover:text-primary"
												}`}
											>
												{item.name}
											</Link>
											{index < navItems.length - 1 && <div className='ml-4 lg:ml-12 h-4 w-px bg-primary/30 hidden lg:block'></div>}
										</div>
									);
								})}
							</div>
						</nav>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			<div className={`fixed inset-0 z-40 md:hidden pointer-events-none`}>
				{/* Backdrop */}
				<div
					className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
						isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
					}`}
					onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
				/>
				{/* Sidebar Panel */}
				<div
					className={`fixed right-0 top-0 h-full w-[280px] bg-background shadow-xl transition-transform duration-300 ease-in-out
						${isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
				>
					<div className='flex h-16 items-center justify-end px-4 border-b border-primary/10'>
						<div
							className='flex items-center h-14 w-14 justify-center text-primary cursor-pointer select-none'
							onClick={toggleMobileMenu}
							aria-label='Close menu'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") toggleMobileMenu();
							}}
						>
							<X className='h-12 w-12' />
						</div>
					</div>
					<nav className='px-4 py-6'>
						<div className='space-y-6'>
							{navItems.map((item) => {
								const active = isActive(item.href);
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`block text-base font-medium tracking-wider transition-colors duration-200 ${
											active
												? "text-primary font-semibold"
												: "text-foreground/80 hover:text-primary"
										}`}
										onClick={toggleMobileMenu}
									>
										{item.name}
									</Link>
								);
							})}
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
