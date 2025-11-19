"use client"

import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import SignUpModal from "@/components/modal/SignUpModal";

export function Logo() {
    return (
        <Image
            src="/favicon.ico"
            alt="Logo"
            width={36}
            height={36}
            priority
            className="rounded"
        />
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 24);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinkClassName =
        "relative px-3 py-2 text-base font-medium text-[var(--text-secondary)] transition-all duration-200 ease-out hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full";

    const menuLinkClassName =
        "w-full rounded-md px-3 py-2 text-base font-medium text-[var(--text-primary)] transition-all duration-200 ease-out hover:bg-[var(--hover)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-hover)]";

    const sectionLinks = [
        {
            label: "Главная",
            href: "#hero",
        },
        {
            label: "Возможности",
            href: "#benefits",
        },
        {
            label: "Отзывы",
            href: "#testimonials",
        },
        {
            label: "Тарифы",
            href: "#pricing",
        },
    ];

    const actionLinks = [
        {
            label: "Войти",
            href: "/login",
        },
        {
            label: "Присоединиться",
            href: "/registration",
        },
    ];

    const navbarClassName = [
        "fixed inset-x-0 top-0 z-50 flex h-[72px] items-center px-[20px] transition-all duration-300",
        "backdrop-blur-lg",
        isScrolled
            ? "bg-[rgba(9,10,18,0.82)] shadow-[0_12px_32px_-22px_rgba(15,23,42,0.75)]"
            : "bg-transparent",
    ].join(" ");

    return (
        <Navbar className={navbarClassName} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand>
                    <span className="hidden min-[401px]:inline">
                        <Logo />
                    </span>
                    <a
                        className="ml-2 font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--primary)]"
                        href="#hero"
                    >
                        Crypto Trenches
                    </a>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden items-center justify-center gap-[20px]! gap-4 sm:flex" justify="center">
                {sectionLinks.map((item) => (
                    <NavbarItem key={item.label}>
                        <Link className={navLinkClassName} color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link className="text-base font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]" href="/login">
                        Войти
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <SignUpModal />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}