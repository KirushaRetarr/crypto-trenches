import React from "react";
import Link from "next/link";

interface FooterNavigationGroup {
    title: string;
    links: FooterLink[];
}

interface FooterLink {
    label: string;
    href: string;
}

interface SocialLink {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navigation: FooterNavigationGroup[] = [
    {
        title: "Продукт",
        links: [
            { label: "Возможности", href: "#benefits" },
            { label: "Отзывы", href: "#testimonials" },
            { label: "Тарифы", href: "#pricing" },
            { label: "Доступ", href: "#auth" },
        ],
    },
    {
        title: "Ресурсы",
        links: [
            { label: "Поддержка", href: "#cta" },
            { label: "Руководства", href: "#cta" },
            { label: "API-статус", href: "#cta" },
            { label: "Сообщество", href: "#cta" },
        ],
    },
    {
        title: "Компания",
        links: [
            { label: "О нас", href: "#hero" },
            { label: "Команда", href: "#benefits" },
            { label: "Вакансии", href: "#cta" },
            { label: "Контакты", href: "#cta" },
        ],
    },
];

const socialLinks: SocialLink[] = [
    {
        label: "X (Twitter)",
        href: "https://twitter.com",
        icon: (
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2H21.5l-7.5 8.56L22 22h-6.938l-5.43-6.64L3.5 22H.244l8.024-9.15L2 2h6.938l5.03 6.15L18.244 2Zm-2.43 17.4h1.4L8.31 4.517H6.812l8.999 14.883Z" />
            </svg>
        ),
    },
    {
        label: "Telegram",
        href: "https://t.me",
        icon: (
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.665 3.048a1.5 1.5 0 0 1 2.02 1.691l-3.34 14.676c-.247 1.086-1.455 1.625-2.434 1.018l-5.234-3.243-2.53 2.777c-.79.87-2.204.463-2.446-.705l-.937-4.495-4.04-1.457c-1.201-.433-1.214-2.15-.02-2.6l18.96-7.662Zm-5.335 15.247 2.806-12.333L6.51 12.282l2.417.873a1.5 1.5 0 0 1 .964 1.113l.507 2.431 3.202-3.514a1.5 1.5 0 0 1 1.92-.274l.81.506Z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.88V15.31c0-1.225-.025-2.799-1.707-2.799-1.708 0-1.971 1.337-1.971 2.714v5.227H9.634V9h3.401v1.561h.048c.474-.9 1.632-1.848 3.36-1.848 3.595 0 4.26 2.368 4.26 5.451v6.288ZM5.337 7.433a1.963 1.963 0 1 1 0-3.926 1.963 1.963 0 0 1 0 3.926ZM3.56 20.452h3.553V9H3.56v11.452Z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-background mt-24 w-full overflow-hidden text-white">
            <div aria-hidden className="footer-gradient" />
            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-16 sm:py-20">
                <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex max-w-sm flex-col gap-5">
                        <Link className="text-xl font-semibold text-white transition hover:text-[var(--primary)]" href="#hero">
                            Crypto Trenches
                        </Link>
                        <p className="text-sm text-white/70">
                            Платформа для аналитики, автоматизации и совместной работы с криптоактивами. Действуйте уверенно и
                            опережайте рынок.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    className="footer-social"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="grid w-full gap-10 sm:grid-cols-3">
                        {navigation.map((group) => (
                            <div key={group.title} className="flex flex-col gap-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-white/70">
                                    {group.title}
                                </span>
                                <ul className="flex flex-col gap-3 text-sm text-white/70">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link className="transition hover:text-white" href={link.href}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                    <span>© {currentYear} Crypto Trenches. Все права защищены.</span>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link className="transition hover:text-white" href="#cta">
                            Политика конфиденциальности
                        </Link>
                        <Link className="transition hover:text-white" href="#cta">
                            Условия использования
                        </Link>
                        <Link className="transition hover:text-white" href="#cta">
                            Настройки cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}