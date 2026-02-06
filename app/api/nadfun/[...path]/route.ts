import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: pathSegments } = await params;
    const searchParams = request.nextUrl.searchParams;
    const network = searchParams.get("network") || "mainnet";
    const path = pathSegments.join("/");

    const baseUrl = network === "testnet"
        ? "https://dev-api.nad.fun"
        : "https://api.nadapp.net";

    const targetUrl = `${baseUrl}/${path}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json({ error: "Failed to fetch from NadFun" }, { status: 500 });
    }
}
