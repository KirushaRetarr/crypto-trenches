"use client"

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";

import React from "react";

import Image from "next/image"

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

    const menuItems = [
        "Криптовалюта",
        "Портфель",
        "Удобства",
        "Войти",
        "Зарегистрироваться",
    ];

    const navItems = [
        {
            label: "Криптовалюта",
            href: "/crypto",
        },
        {
            label: "Портфель",
            href: "/portfolio",
        },
        {
            label: "Удобства",
            href: "/utilities",
        },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="flex justify-between items-center h-[64px] px-[20px]">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-inherit ml-2">Crypto Trenches</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="flex items-center justify-center gap-[20px]! hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.label}>
                        <Link color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Войти</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Зарегистрироваться
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}   