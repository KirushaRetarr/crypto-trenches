import Link from "next/link";

const loginHighlights: Highlight[] = [
    {
        title: "AI-поддержка",
        description: "Персональные инсайты и комментарии к сделкам в реальном времени.",
    },
    {
        title: "Командная работа",
        description: "Назначайте роли, делитесь сигналами и контролируйте действия коллег.",
    },
    {
        title: "Безопасность",
        description: "Шифрование ключей и аудит действий уровня enterprise.",
    },
];

const socialProviders: SocialProvider[] = [
    {
        label: "Войти через Google",
        icon: (
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M21.35 11.1H12v2.76h5.32c-.23 1.34-1.41 3.94-5.32 3.94a5.63 5.63 0 0 1 0-11.26 5.1 5.1 0 0 1 3.59 1.41l2.45-2.36A8.58 8.58 0 0 0 12 4.5 9 9 0 1 0 21.35 11.1Z"
                />
            </svg>
        ),
    },
    {
        label: "Войти через Telegram",
        icon: (
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M20.665 3.048a1.5 1.5 0 0 1 2.02 1.691l-3.34 14.676c-.247 1.086-1.455 1.625-2.434 1.018l-5.234-3.243-2.53 2.777c-.79.87-2.204.463-2.446-.705l-.937-4.495-4.04-1.457c-1.201-.433-1.214-2.15-.02-2.6l18.96-7.662Zm-5.335 15.247 2.806-12.333L6.51 12.282l2.417.873a1.5 1.5 0 0 1 .964 1.113l.507 2.431 3.202-3.514a1.5 1.5 0 0 1 1.92-.274l.81.506Z"
                />
            </svg>
        ),
    },
];

export default function LoginPage() {
    return (
        <section className="auth-page">
            <div aria-hidden className="auth-gradient" />
            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-24 lg:flex-row lg:items-center lg:justify-between">
                <div className="auth-card w-full max-w-xl">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="auth-eyebrow">С возвращением</span>
                            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Войдите в Crypto Trenches</h1>
                            <p className="text-sm text-white/70 sm:text-base">
                                Отслеживайте портфель, получайте сигналы и управляйте командами из одной точки. Используйте
                                рабочий email и двуфакторную защиту.
                            </p>
                        </div>
                        <form className="flex flex-col gap-4">
                            <label className="auth-field">
                                <span>Email</span>
                                <input
                                    aria-label="Email"
                                    className="auth-input"
                                    type="email"
                                    placeholder="team@cryptotrenches.io"
                                    required
                                />
                            </label>
                            <label className="auth-field">
                                <span>Пароль</span>
                                <input className="auth-input" type="password" placeholder="••••••••" required />
                            </label>
                            <div className="flex items-center justify-between text-xs text-white/60 sm:text-sm">
                                <label className="flex items-center gap-2">
                                    <input className="auth-checkbox" type="checkbox" />
                                    <span>Запомнить устройство</span>
                                </label>
                                <Link className="transition hover:text-white" href="#cta">
                                    Забыли пароль?
                                </Link>
                            </div>
                            <button className="auth-submit" type="submit">
                                Войти в аккаунт
                            </button>
                        </form>
                        <div className="flex flex-col gap-3">
                            <div className="auth-divider">
                                <span>или</span>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {socialProviders.map((provider) => (
                                    <button key={provider.label} className="auth-social" type="button">
                                        {provider.icon}
                                        {provider.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-white/70">
                        Нет аккаунта?{" "}
                        <Link className="font-medium text-white transition hover:text-[var(--primary)]" href="/registration">
                            Зарегистрироваться
                        </Link>
                    </p>
                </div>
                <div className="auth-side-panel">
                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 backdrop-blur">
                            <p>
                                📈 Среднее повышение эффективности команд после подключения Crypto Trenches —{" "}
                                <span className="font-semibold text-white">+18% к доходности</span> и{" "}
                                <span className="font-semibold text-white">—32% к просадкам</span>.
                            </p>
                        </div>
                        <ul className="flex flex-col gap-5">
                            {loginHighlights.map((item) => (
                                <li key={item.title} className="flex items-start gap-3 text-white/75">
                                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
                                    <div className="flex flex-col gap-1">
                                        <strong className="text-white">{item.title}</strong>
                                        <span className="text-sm text-white/70">{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--primary)]/25 to-[var(--accent)]/20 p-4 text-sm text-white/80">
                            <p>Помощь 24/7: команда Customer Success реагирует в течение 15 минут.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface Highlight {
    title: string;
    description: string;
}

interface SocialProvider {
    label: string;
    icon: React.ReactNode;
}