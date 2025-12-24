import {MetadataRoute} from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rod16.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: siteUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${siteUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${siteUrl}/portfolio`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${siteUrl}/portfolio?category=wedding`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/portfolio?category=baby-shower`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/portfolio?category=portrait`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/portfolio?category=maternity`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/portfolio?category=event`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/portfolio?category=landscape`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}

