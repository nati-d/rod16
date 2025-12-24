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
			<div className={`relative z-40 pt-4 pb-1 ${isMobileMenuOpen ? 'bg-primary' : 'bg-background md:bg-primary'}`}>
				<div className='container'>
					{/* Desktop: info left, logo center, info right. Mobile: logo center, hamburger right, info below */}
					<div className='hidden md:flex items-center justify-between min-h-16 py-1'>
						{/* Left Info */}
						{/* <div className='text-xs tracking-wider text-foreground/80 whitespace-nowrap font-[Playfair Display,serif] italic uppercase'>
							WEDDING PHOTOGRAPHER BASED IN NORTHERN VA
						</div> */}
						{/* Logo Centered */}
						<div className='flex flex-col items-center mx-auto'>
							<span
								className='text-[2.5rem] font-bold golden-color leading-none tracking-tight imperial-script'
							>
								Rod16
							</span>

							<span
								className='golden-color text-xs sm:text-sm tracking-[0.3em] font-light mt-0.5 whitespace-nowrap block'
								style={{fontFamily: "Playfair Display, serif"}}
							>
								PHOTOGRAPHY
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
						<div className='flex flex-col items-center mx-auto'>
							<span
								className={`text-[2.5rem] font-bold leading-none tracking-tight imperial-script ${
									isMobileMenuOpen ? 'golden-color' : 'text-primary'
								}`}
							>
								Rod16
							</span>

							<span
								className={`text-xs sm:text-sm tracking-[0.3em] font-light mt-0.5 whitespace-nowrap block ${
									isMobileMenuOpen ? 'golden-color' : 'text-primary'
								}`}
								style={{fontFamily: "Playfair Display, serif"}}
							>
								PHOTOGRAPHY
							</span>
						</div>
						{/* Hamburger Menu Right */}
						<div
							className={`flex items-center h-10 w-10 justify-center cursor-pointer select-none ${
								isMobileMenuOpen ? 'golden-color' : 'text-primary'
							}`}
							onClick={toggleMobileMenu}
							aria-label='Open menu'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") toggleMobileMenu();
							}}
						>
							{isMobileMenuOpen ? <X className='h-8 w-8' /> : <Menu className='h-8 w-8' />}
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
			<div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-primary"}`}>
				<div className='container'>
					<div className='hidden md:flex h-12 items-center justify-center'>
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
													isScrolled
														? active
															? "text-primary font-semibold"
															: "text-primary/80 hover:text-primary"
														: active
															? "golden-color font-semibold"
															: "golden-color hover:golden-color"
												}`}
												style={!active && !isScrolled ? {opacity: 0.8} : {}}
											>
												{item.name}
											</Link>
											{index < navItems.length - 1 && (
												<div className={`ml-4 lg:ml-12 h-4 w-px hidden lg:block ${
													isScrolled ? "bg-primary/30" : "golden-color/30"
												}`}></div>
											)}
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
					className={`fixed inset-0 bg-primary shadow-xl transition-transform duration-300 ease-in-out flex flex-col
						${isMobileMenuOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"}`}
				>
					<div className='flex h-max items-center  justify-between p-4'>
						<div className='flex flex-col items-center'>
							<span
								className='text-[2.5rem] font-bold golden-color leading-none tracking-tight imperial-script'
							>
								Rod16
							</span>
							<span
								className='golden-color text-xs sm:text-sm tracking-[0.3em] font-light mt-0.5 whitespace-nowrap block'
								style={{fontFamily: "Playfair Display, serif"}}
							>
								PHOTOGRAPHY
							</span>
						</div>
						<div
							className='flex items-center h-14 w-14 justify-center golden-color cursor-pointer select-none'
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
					<nav className='flex-1 flex items-center justify-center'>
						<div className='space-y-6 text-center'>
							{navItems.map((item) => {
								const active = isActive(item.href);
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`block text-base font-medium tracking-wider transition-colors duration-200 ${
											active
												? "golden-color font-semibold"
												: "golden-color hover:golden-color"
										}`}
										style={!active ? {opacity: 0.8} : {}}
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
