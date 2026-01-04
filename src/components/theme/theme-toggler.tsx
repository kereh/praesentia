"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggler() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			aria-label="Toggle theme"
			className="absolute top-6 right-6 z-50 size-12 rounded-full border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-card hover:shadow-lg"
			onClick={toggleTheme}
			size="icon"
			variant="ghost"
		>
			{theme === "dark" ? (
				<Sun className="size-5 text-foreground" />
			) : (
				<Moon className="size-5 text-foreground" />
			)}
		</Button>
	);
}
