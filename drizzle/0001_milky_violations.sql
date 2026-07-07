CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`slug` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text,
	`category` enum('tips','inspiration','news','recipes','trends') NOT NULL,
	`imageUrl` text,
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` enum('ordering','delivery','payment','storage','customization','lead_time') NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageUrl` text NOT NULL,
	`title` varchar(255),
	`category` enum('wedding','birthday','kids','corporate','cupcakes','desserts') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gallery_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(50),
	`occasion` varchar(255),
	`cakeSize` varchar(100),
	`cakeFlavor` varchar(100),
	`cakeFrosting` varchar(100),
	`tiers` int,
	`decorations` text,
	`cakeMessage` text,
	`preferredDate` varchar(50),
	`deliveryType` enum('pickup','delivery'),
	`deliveryAddress` text,
	`budget` varchar(100),
	`additionalNotes` text,
	`estimatedPrice` decimal(10,2),
	`status` enum('new','contacted','confirmed','completed','cancelled') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('birthday_cakes','wedding_cakes','kids_cakes','cupcakes','cookies','pastries','desserts','corporate_cakes','seasonal_specials') NOT NULL,
	`startingPrice` decimal(10,2) NOT NULL,
	`imageUrl` text,
	`featured` boolean NOT NULL DEFAULT false,
	`available` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerPhoto` text,
	`rating` int NOT NULL,
	`review` text NOT NULL,
	`occasion` varchar(255),
	`featured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
