import Link from "next/link";

const onboardingSteps: OnboardingStep[] = [
    {
        title: "Настроим цели и портфель",
        description: "Определите стратегию, валюты и допустимую волатильность. Мы подскажем готовые шаблоны.",
    },
    {
        title: "Подключим биржи и кошельки",
        description: "Интеграция с 52 биржами, cold storage и мультиподписью. Шифрование ключей на аппаратном модуле.",
    },
    {
        title: "Запустим сценарии",
        description: "Выберите готовые сценарии или настройте собственные для ребалансировки и оповещений.",
    },
];

const planHighlights: PlanHighlight[] = [
    {
        metric: "14 дней",
        hint: "Премиум-доступ без ограничений",
    },
    {
        metric: "24/7",
        hint: "Выделенный Customer Success",
    },
    {
        metric: "5 минут",
        hint: "Среднее время онбординга",
    },
];

export default function RegistrationPage() {
    return (
        <section className="auth-page">
            <div aria-hidden className="auth-gradient auth-gradient--alt" />
            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-24 lg:flex-row lg:items-center lg:justify-between">
                <div className="auth-side-panel order-2 lg:order-1">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="auth-eyebrow">Онбординг за 14 дней</span>
                            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                                Подключите команду к Crypto Trenches
                            </h1>
                            <p className="text-sm text-white/70 sm:text-base">
                                Мы изучим вашу торговую стратегию, подключим необходимые источники данных и создадим план
                                повышения эффективности. Первые две недели — с полноценной поддержкой и доступом ко всем
                                функциям.
                            </p>
                        </div>
                        <ul className="flex flex-col gap-6">
                            {onboardingSteps.map((step, index) => (
                                <li key={step.title} className="flex gap-4">
                                    <span className="auth-step p-1">{String(index + 1).padStart(2, "0")}</span>
                                    <div className="flex flex-col gap-1">
                                        <strong className="text-white">{step.title}</strong>
                                        <span className="text-sm text-white/70">{step.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {planHighlights.map((item) => (
                                <div
                                    key={item.metric}
                                    className="rounded-2xl border border-white/12 bg-white/5 p-4 text-center text-white/80 backdrop-blur"
                                >
                                    <strong className="block text-2xl font-semibold text-white">{item.metric}</strong>
                                    <span className="text-sm text-white/65">{item.hint}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="auth-card order-1 w-full max-w-xl lg:order-2">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Создайте рабочий аккаунт</h2>
                            <p className="text-sm text-white/70 sm:text-base">
                                Мы формируем закрытый пул команд. В течение 24 часов с вами свяжется Customer Success, чтобы
                                подтвердить подключение.
                            </p>
                        </div>
                        <form className="flex flex-col gap-4">
                            <label className="auth-field">
                                <span>Рабочий email</span>
                                <input className="auth-input" type="email" placeholder="team@cryptotrenches.io" required />
                            </label>
                            <label className="auth-field">
                                <span>Имя и фамилия</span>
                                <input className="auth-input" type="text" placeholder="Александр Лебедев" required />
                            </label>
                            <label className="auth-field">
                                <span>Название компании</span>
                                <input className="auth-input" type="text" placeholder="Orion Labs" />
                            </label>
                            <label className="auth-field">
                                <span>Размер команды</span>
                                <select className="auth-input" defaultValue="3-10">
                                    <option value="1-2">1-2 аналитика</option>
                                    <option value="3-10">3-10 аналитиков</option>
                                    <option value="11-20">11-20 аналитиков</option>
                                    <option value="20+">20+ аналитиков</option>
                                </select>
                            </label>
                            <label className="auth-field">
                                <span>Основная цель</span>
                                <textarea
                                    className="auth-input min-h-[120px] resize-none"
                                    placeholder="Опишите портфель и задачи, которые хотите решить"
                                    required
                                />
                            </label>
                            <label className="flex items-start gap-3 text-xs text-white/60 sm:text-sm">
                                <input className="auth-checkbox mt-1" type="checkbox" required />
                                <span>
                                    Согласен с{" "}
                                    <Link className="font-medium text-white transition hover:text-[var(--primary)]" href="#cta">
                                        условиями обработки данных
                                    </Link>
                                </span>
                            </label>
                            <button className="auth-submit" type="submit">
                                Запросить доступ
                            </button>
                        </form>
                        <p className="text-sm text-white/70">
                            Уже работаете с нами?{" "}
                            <Link className="font-medium text-white transition hover:text-[var(--primary)]" href="/login">
                                Войти в аккаунт
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface OnboardingStep {
    title: string;
    description: string;
}

interface PlanHighlight {
    metric: string;
    hint: string;
}