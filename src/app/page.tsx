"use client";

import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Link,
} from "@heroui/react";

export default function Home() {
    return (
        <main className="relative flex flex-col overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
            <CursorGlow />
            <HeroSection />
            <FeatureSection />
            <TestimonialsSection />
            <PricingSection />
            <AccessSection />
            <FinalCtaSection />
        </main>
    );
}

function HeroSection() {
    return (
        <section id="hero" className="hero-banner relative overflow-hidden">
            <ParallaxLayer className="hero-gradient hero-gradient--left" speed={0.08} />
            <ParallaxLayer className="hero-gradient hero-gradient--right" speed={0.16} />
            <div aria-hidden className="hero-noise" />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-32 sm:flex-row sm:items-center sm:justify-between sm:pt-40">
                <Reveal className="flex max-w-xl flex-col gap-7">
                    <Chip
                        className="p-2 w-fit border border-white/25 bg-white/10 text-sm font-medium uppercase tracking-wide text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
                        variant="flat"
                    >
                        Финансовый интеллект
                    </Chip>
                    <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Управляйте крипто-портфелем с платформой, которая дышит рынком
                    </h1>
                    <p className="text-lg text-white/80 sm:text-xl">
                        Crypto Trenches трансформирует поток данных в ясные решения. Отслеживайте сделки, автоматизируйте
                        риски и получайте AI-комментарии в момент, когда это действительно важно.
                    </p>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                        <Button
                            as={Link}
                            className="hero-cta-primary rounded-xl px-6 py-3 text-base font-semibold"
                            color="primary"
                            href="#pricing"
                            size="lg"
                        >
                            Попробовать бесплатно
                        </Button>
                        <Button
                            as={Link}
                            className="rounded-xl px-6 py-3 text-base font-semibold text-white/90 hover:text-white"
                            href="#benefits"
                            size="lg"
                            variant="light"
                        >
                            Как это работает
                        </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {heroStats.map((stat) => (
                            <div key={stat.label} className="hero-statistic">
                                <strong className="text-2xl font-semibold text-white sm:text-3xl">{stat.value}</strong>
                                <span className="text-sm text-white/70">{stat.label}</span>
                                <p className="text-xs text-white/60">{stat.hint}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
                <Reveal className="w-full max-w-xl">
                    <div className="hero-product">
                        <div className="hero-product__header">
                            <span className="hero-product__badge">Живой дашборд</span>
                            <span className="hero-product__timestamp">Обновлено 3 сек назад</span>
                        </div>
                        <div className="hero-product__body">
                            {heroShowcaseMetrics.map((metric) => (
                                <div key={metric.label} className="hero-product__metric">
                                    <span className="text-xs uppercase tracking-wide text-white/60">{metric.label}</span>
                                    <strong className="text-lg font-semibold text-white lg:text-xl">{metric.value}</strong>
                                    <span
                                        className={`text-sm font-medium ${
                                            metric.positive ? "text-[var(--success)]" : "text-[var(--danger)]"
                                        }`}
                                    >
                                        {metric.trend}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Divider className="hero-product__divider" />
                        <div className="hero-product__footer">
                            <div>
                                <p className="text-sm font-medium text-white/80">AI-комментарий</p>
                                <p className="text-sm text-white/70">
                                    Ликвидность превышает среднее значение. Оптимальный диапазон покупки — $92.4K.
                                </p>
                            </div>
                            <Button
                                as={Link}
                                className="rounded-xl px-4 py-2 text-base font-semibold shadow-[0_8px_28px_-16px_rgba(129,140,248,0.75)]"
                                color="primary"
                                href="#cta"
                                size="md"
                            >
                                Получить сигнал
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function FeatureSection() {
    return (
        <section id="benefits" className="relative overflow-hidden bg-[var(--background)]">
            <ParallaxLayer className="feature-gradient" speed={0.04} />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-15">
                <Reveal className="flex flex-col gap-4 text-center sm:gap-5">
                    <Chip className="p-2 mx-auto w-fit rounded-full bg-[var(--accent)]/10 text-[var(--accent)]" variant="flat">
                        Возможности
                    </Chip>
                    <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                        Всё, что нужно для уверенной торговли и управления капиталом
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-[var(--text-secondary)] sm:text-lg">
                        Мы объединяем аналитику, автоматизацию и совместную работу. Каждый элемент построен на
                        исследованиях поведения профессиональных команд и помогает быстрее принимать решения.
                    </p>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featureCards.map((card, index) => (
                        <Reveal key={card.title} className="h-full" delay={index * 90}>
                            <Card
                                className="feature-card h-full border border-[var(--card-border)]/70 bg-[var(--card-bg)]/85"
                                style={{ backgroundImage: card.gradient }}
                            >
                                <CardHeader className="flex flex-col gap-3 px-6 pt-6">
                                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80">
                                        {card.badge}
                                    </span>
                                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-4 px-6 pb-6 text-sm text-white/75">
                                    <p>{card.description}</p>
                                    <Divider className="border-white/10 bg-white/10" />
                                    <ul className="flex flex-col gap-2">
                                        {card.points.map((point) => (
                                            <li key={point} className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-6 rounded-full bg-white/40" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBody>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Link className="text-base font-medium text-white/80 transition hover:text-white" href="#pricing">
                                        Смотреть тарифы
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((previous) => (previous + 1) % testimonials.length);
        }, 6400);

        return () => window.clearInterval(timer);
    }, []);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section id="testimonials" className="relative bg-[var(--background)]">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 text-center sm:gap-12">
                <Reveal className="flex flex-col gap-4">
                    <Chip className="p-2 mx-auto w-fit rounded-full bg-[var(--secondary)]/15 text-[var(--secondary)]" variant="flat">
                        Отзывы клиентов
                    </Chip>
                    <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                        Команды, которым мы помогаем выигрывать на рынке
                    </h2>
                    <p className="max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
                        Crypto Trenches раскрывает сценарии роста и защищает от неожиданных просадок. Вот что говорят
                        лидеры трейдинговых desks и венчурные фонды.
                    </p>
                </Reveal>
                <Reveal className="w-full">
                    <Card className="testimonial-card mx-auto max-w-3xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 shadow-[0_40px_120px_-60px_rgba(79,70,229,0.5)]">
                        <CardBody className="flex flex-col gap-6 px-8 py-10">
                            <p className="text-lg leading-relaxed text-[var(--text-primary)] sm:text-xl">
                                “{activeTestimonial.quote}”
                            </p>
                            <Divider className="bg-[var(--card-border)]" />
                            <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-base font-semibold text-[var(--text-primary)]">
                                        {activeTestimonial.name}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {activeTestimonial.role}, {activeTestimonial.company}
                                    </p>
                                </div>
                                <Chip
                                    className="rounded-full bg-[var(--success)]/15 px-4 py-1 text-sm font-medium text-[var(--success)]"
                                    variant="flat"
                                >
                                    {activeTestimonial.performance}
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>
                </Reveal>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                        className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        size="sm"
                        variant="light"
                        onPress={() => setActiveIndex((previous) => (previous - 1 + testimonials.length) % testimonials.length)}
                    >
                        Предыдущий
                    </Button>
                    <div className="flex items-center gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Показать отзыв ${index + 1}`}
                                className={`h-2.5 w-2.5 rounded-full transition ${
                                    index === activeIndex ? "bg-[var(--primary)] w-6" : "bg-[var(--card-border)]/70 hover:bg-[var(--primary)]/60"
                                }`}
                                onClick={() => setActiveIndex(index)}
                                type="button"
                            />
                        ))}
                    </div>
                    <Button
                        className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        size="sm"
                        variant="light"
                        onPress={() => setActiveIndex((previous) => (previous + 1) % testimonials.length)}
                    >
                        Следующий
                    </Button>
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section id="pricing" className="relative overflow-hidden bg-[var(--background)]">
            <ParallaxLayer className="pricing-gradient" speed={0.06} />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-15">
                <Reveal className="flex flex-col gap-4 text-center">
                    <Chip className="p-2 mx-auto w-fit rounded-full bg-[var(--primary)]/15 text-[var(--primary)]" variant="flat">
                        Тарифы
                    </Chip>
                    <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                        Гибкие планы для аналитиков, трейдеров и инвестиционных команд
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-[var(--text-secondary)] sm:text-lg">
                        Начните бесплатно, а затем масштабируйтесь без боли. Мы не берем комиссию с ваших сделок — только за
                        ценность, которую создаём.
                    </p>
                </Reveal>
                <div className="grid gap-6 lg:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                        <Reveal key={plan.name} delay={index * 110}>
                            <Card
                                className={`pricing-card h-full border border-[var(--card-border)] bg-[var(--card-bg)]/90 ${
                                    plan.isPopular ? "pricing-card--popular" : ""
                                }`}
                            >
                                <CardHeader className="flex flex-col gap-3 px-6 pt-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">{plan.name}</h3>
                                        {plan.isPopular ? (
                                            <span className="ml-2 rounded-full bg-[var(--primary)]/15 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                                                Популярно
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">{plan.description}</p>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-5 px-6 pb-6">
                                    <p className="text-3xl font-semibold text-[var(--text-primary)]">
                                        {plan.price}
                                        <span className="text-base font-normal text-[var(--text-secondary)]"> / месяц</span>
                                    </p>
                                    <Divider className="bg-[var(--card-border)]" />
                                    <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--primary)]" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBody>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Button
                                        as={Link}
                                        className="w-full rounded-xl px-4 py-3 text-base font-semibold"
                                        color="primary"
                                        href="#cta"
                                        variant={plan.isPopular ? "solid" : "flat"}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="flex flex-col gap-2 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]/70 p-6 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:text-base">
                    <p>
                        Нужен персональный тариф на несколько desk-команд? Расскажите о задачах — подготовим предложение за 24
                        часа.
                    </p>
                    <Link className="text-base font-medium text-[var(--primary)] transition hover:text-[var(--primary-hover)]" href="#cta">
                        Связаться с отделом Customer Success
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

function AccessSection() {
    return (
        <section id="auth" className="bg-[var(--background)]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-15">
                <Reveal className="flex flex-col gap-4 text-center">
                    <Chip className="p-2 mx-auto w-fit rounded-full bg-[var(--accent)]/10 text-[var(--accent)]" variant="flat">
                        Доступ
                    </Chip>
                    <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                        Подключайтесь безопасно и работайте командой без ограничений
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-[var(--text-secondary)] sm:text-lg">
                        Мы поддерживаем корпоративные аккаунты, аппаратные кошельки и SSO. Настройте роли, аудит и двухфакторную
                        авторизацию за считанные минуты.
                    </p>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-3">
                    {accessMethods.map((method, index) => (
                        <Reveal key={method.title} delay={index * 120}>
                            <Card className="h-full border border-[var(--card-border)] bg-[var(--card-bg)]/90 transition hover:-translate-y-2 hover:shadow-[0_28px_60px_-32px_rgba(129,140,248,0.5)]">
                                <CardHeader className="flex flex-col gap-3 px-6 pt-6">
                                    <span className="w-fit rounded-full bg-[var(--hover)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                        {method.badge}
                                    </span>
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{method.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">{method.description}</p>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-3 px-6 pb-6 text-sm text-[var(--text-secondary)]">
                                    {method.benefits.map((benefit) => (
                                        <div key={benefit} className="flex items-start gap-3">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-[var(--primary)]/80" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </CardBody>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Link className="text-base font-medium text-[var(--primary)] transition hover:text-[var(--primary-hover)]" href="#cta">
                                        Узнать подробнее
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FinalCtaSection() {
    return (
        <section id="cta" className="bg-[var(--background)]">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-24">
                <Reveal className="hero-cta flex flex-col items-center gap-6 rounded-[32px] border border-[var(--card-border)] bg-gradient-to-br from-[var(--primary)] via-[#8b5cf6] to-[#ec4899] px-6 py-16 text-center text-white sm:px-12">
                    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                        Присоединяйтесь к закрытому доступу Crypto Trenches сегодня
                    </h2>
                    <p className="max-w-2xl text-base text-white/80 sm:text-lg">
                        Получите демо, подключите свою команду и протестируйте автоматизацию портфеля с поддержкой Customer
                        Success. Мы поможем сделать первые шаги и построить устойчивый рост.
                    </p>
                    <div className="flex w-full flex-col gap-4 sm:max-w-xl sm:flex-row">
                        <input
                            aria-label="Рабочий email"
                            className="w-full rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-base text-white placeholder-white/60 outline-none transition focus:border-white focus:bg-white/20"
                            placeholder="Введите рабочий email"
                            type="email"
                        />
                        <Button className="rounded-xl px-6 py-3 text-base font-semibold" color="primary" size="lg">
                            Получить приглашение
                        </Button>
                    </div>
                    <span className="text-xs uppercase tracking-wide text-white/60">
                        Уже 1 240 команд в листе ожидания · Поддержка 24/7
                    </span>
                </Reveal>
            </div>
        </section>
    );
}

function Reveal({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        currentObserver.disconnect();
                    }
                });
            },
            {
                threshold: 0.2,
            },
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transform-gpu transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className ?? ""}`}
        >
            {children}
        </div>
    );
}

function ParallaxLayer({ className, speed }: { className: string; speed: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        function updatePosition() {
            if (!node) return
            const offset = window.scrollY * speed
            node.style.transform = `translate3d(0, ${offset}px, 0)`
        }

        updatePosition()
        window.addEventListener("scroll", updatePosition, { passive: true })

        return () => {
            window.removeEventListener("scroll", updatePosition);
        };
    }, [speed]);

    return <div aria-hidden className={className} ref={ref} />;
}

function CursorGlow() {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }
        function handlePointerMove(event: PointerEvent) {
            if (!node) return
            node.style.setProperty("--cursor-x", `${event.clientX}px`)
            node.style.setProperty("--cursor-y", `${event.clientY}px`)
        }

        window.addEventListener("pointermove", handlePointerMove, { passive: true })

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return <div aria-hidden className="cursor-glow pointer-events-none fixed inset-0 z-30 hidden lg:block" ref={ref} />;
}

const heroStats: HeroStat[] = [
    {
        label: "Команды в закрытом доступе",
        value: "1 240+",
        hint: "Фонды, маркет-мейкеры и трейдинговые дески",
    },
    {
        label: "Точность сигналов",
        value: "92,7%",
        hint: "По данным внутреннего бенчмарка за последние 90 дней",
    },
    {
        label: "Экономия времени",
        value: "18 ч",
        hint: "Среднее сокращение ручных операций в неделю",
    },
];

const heroShowcaseMetrics: HeroShowcaseMetric[] = [
    {
        label: "BTC / USDT",
        value: "$98 540",
        trend: "+4.12%",
        positive: true,
    },
    {
        label: "ETH / USDT",
        value: "$4 520",
        trend: "+2.67%",
        positive: true,
    },
    {
        label: "SOL / USDT",
        value: "$228",
        trend: "-1.92%",
        positive: false,
    },
];

const featureCards: FeatureCard[] = [
    {
        badge: "Аналитика",
        title: "Тепловая карта ликвидности и настроений",
        description:
            "Отражаем поведение крупных игроков и динамику ордербука в одном экране. Получайте готовые выводы от AI-аналитика.",
        points: [
            "18 потоков данных и on-chain метрики",
            "Гибкие фильтры и тегирование сигналов",
            "Smart-алерты для критичных движений",
        ],
        gradient: "linear-gradient(140deg, rgba(99,102,241,0.45), rgba(14,165,233,0.35))",
    },
    {
        badge: "Автоматизация",
        title: "Сценарии ребалансировки без кода",
        description:
            "Создавайте условия, реагируйте на волатильность и фиксируйте прибыль по заданным правилам. Всё хранится в вашей песочнице.",
        points: [
            "Триггеры по волатильности и корреляциям",
            "История изменений и roll-back",
            "Готовые шаблоны для DeFi и CEX",
        ],
        gradient: "linear-gradient(140deg, rgba(236,72,153,0.45), rgba(79,70,229,0.35))",
    },
    {
        badge: "Совместная работа",
        title: "Командный дашборд и роль-плей",
        description:
            "Разделяйте ответственность за сделки, назначайте ревьюеров и работайте с единой базой сигналов и заметок.",
        points: [
            "Мгновенные уведомления и лента действий",
            "Гранулярные права доступа и SSO",
            "Экспорт отчётов для инвесторов",
        ],
        gradient: "linear-gradient(140deg, rgba(45,212,191,0.45), rgba(56,189,248,0.35))",
    },
    {
        badge: "Поддержка",
        title: "Персональное сопровождение команды",
        description:
            "Выделенный Customer Success, который помогает построить процессы и адаптировать платформу под ваш стиль работы.",
        points: [
            "Онбординг и обучение в первые 14 дней",
            "Настройка интеграций и автоматизации",
            "Поддержка 24/7 в любом часовом поясе",
        ],
        gradient: "linear-gradient(140deg, rgba(129,140,248,0.45), rgba(168,85,247,0.35))",
    },
    {
        badge: "Безопасность",
        title: "Шифрование и контроль доступа уровня банка",
        description:
            "Ваши данные остаются только у вас. Используем аппаратное шифрование, мониторим аномалии и проводим аудит.",
        points: [
            "HSM-модули и распределённое хранение ключей",
            "Аудит логов и алерты при подозрительной активности",
            "Соответствие требованиям SOC 2 Type II",
        ],
        gradient: "linear-gradient(140deg, rgba(251,191,36,0.45), rgba(248,113,113,0.35))",
    },
    {
        badge: "Иновации",
        title: "Рекомендации на базе модели поведения",
        description:
            "AI предлагает сценарии, учитывая историю ваших сделок и чувствительность к риску. Стратегии становятся персональными.",
        points: [
            "Адаптивные подсказки и сценарии",
            "Режим A/B тестирования стратегий",
            "Прогноз PnL с визуализацией",
        ],
        gradient: "linear-gradient(140deg, rgba(14,165,233,0.45), rgba(129,140,248,0.35))",
    },
];

const testimonials: Testimonial[] = [
    {
        name: "Антон Кривцов",
        role: "Head of Trading",
        company: "Orion Labs",
        quote:
            "Команда стала быстрее реагировать на всплески волатильности. Мы сократили время на ручной анализ почти вдвое и перешли на осознанные сделки.",
        performance: "+18% к доходности за квартал",
    },
    {
        name: "Мария Колесникова",
        role: "Portfolio Manager",
        company: "Northern Capital",
        quote:
            "Раньше мы работали в пяти разных инструментах. Теперь риск-менеджмент, отчёты и сигналы живут в одном окне — и команда наконец синхронизирована.",
        performance: "-32% к просадкам портфеля",
    },
    {
        name: "Артем Ли",
        role: "Digital Assets Lead",
        company: "Nova VC",
        quote:
            "Кастомные сценарии ребалансировки и live-комментарии AI позволили нам масштабировать портфель без увеличения штата аналитиков.",
        performance: "+3 часа свободного времени ежедневно",
    },
];

const pricingPlans: PricingPlan[] = [
    {
        name: "Starter",
        description: "Для небольших команд и первых шагов в автоматизации",
        price: "$0",
        features: [
            "До 3 портфелей и 5 сценариев",
            "Live-котировки и базовые алерты",
            "Экспорт отчётов в CSV и PDF",
        ],
        cta: "Начать бесплатно",
    },
    {
        name: "Growth",
        description: "Для трейдинговых desks и инвестиционных компаний",
        price: "$249",
        features: [
            "Неограниченные портфели и сигналы",
            "AI-комментарии и авт ребалансировка",
            "Совместная работа и роли для команды",
            "Интеграции с биржами и мессенджерами",
        ],
        cta: "Оформить подписку",
        isPopular: true,
    },
    {
        name: "Enterprise",
        description: "Для фондов и корпораций с расширенными требованиями",
        price: "$649",
        features: [
            "SLA 24/7 и выделенный Success",
            "SSO, кастомные роли и аудит действий",
            "Встроенные отчёты для инвесторов",
            "Доступ к roadmap и закрытым функциям",
        ],
        cta: "Запросить демо",
    },
];

const accessMethods: AccessMethod[] = [
    {
        badge: "API & CEX",
        title: "Подключение бирж",
        description: "Поддерживаем 52+ биржи с шифрованием ключей и гибкими лимитами.",
        benefits: [
            "Хранилище ключей с аппаратным модулем",
            "Доступ по ролям и 4 уровня подтверждения",
            "Контроль лимитов и журнал событий",
        ],
    },
    {
        badge: "Wallets",
        title: "Аппаратные кошельки",
        description: "Синхронизируйте Ledger, Trezor, Keystone и мультиподписные кошельки.",
        benefits: [
            "Поддержка cold storage и DeFi активов",
            "Мгновенные уведомления о движениях",
            "Настраиваемые списки разрешенных адресов",
        ],
    },
    {
        badge: "SSO",
        title: "Корпоративная авторизация",
        description: "Готовые интеграции с Okta, Azure AD, Google Workspace и SAML.",
        benefits: [
            "Централизованное управление доступом",
            "Синхронизация с HRIS и IAM",
            "Автоотключение при увольнении сотрудника",
        ],
    },
];

interface HeroStat {
    label: string;
    value: string;
    hint: string;
}

interface HeroShowcaseMetric {
    label: string;
    value: string;
    trend: string;
    positive: boolean;
}

interface FeatureCard {
    badge: string;
    title: string;
    description: string;
    points: string[];
    gradient: string;
}

interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    performance: string;
}

interface PricingPlan {
    name: string;
    description: string;
    price: string;
    features: string[];
    cta: string;
    isPopular?: boolean;
}

interface AccessMethod {
    badge: string;
    title: string;
    description: string;
    benefits: string[];
}

