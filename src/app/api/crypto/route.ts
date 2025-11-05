import { NextResponse } from "next/server";

const COINGECKO_API_KEY = "CG-nFgq96xhkiNEKSWak1HSda9B";
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "100";

    // Если ids не указан, получаем топ криптовалют по капитализации
    let url = `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
    
    if (ids) {
      url += `&ids=${ids}`;
    }

    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 60 }, // Кешируем на 60 секунд
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Invalid request. 'ids' must be an array" },
        { status: 400 }
      );
    }

    const idsString = ids.join(",");
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=250&page=1&sparkline=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto data" },
      { status: 500 }
    );
  }
}


