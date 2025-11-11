"use client";

export default function Home() {
    return (
        <>
            <main className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
                <h1 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                    Привет! Здесь осталась только шапка и одна страница.
                </h1>
                <p className="text-base text-[var(--text-secondary)] sm:text-lg">
                    Весь функционал очищен по просьбе, так что можно смело начинать с чистого листа и
                    строить новый интерфейс вокруг этой шапки.
                </p>
            </main>
        </>
    );
}

