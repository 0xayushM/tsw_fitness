import { NextRequest, NextResponse } from "next/server";

function env() {
  return {
    apiKey: process.env.BREWMYAGENT_API_KEY ?? "",
    submitUrl: process.env.BREWMYAGENT_SUBMIT_URL ?? "",
  };
}

function toStringRecord(
  data: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v == null) continue;
    if (typeof v === "string") out[k] = v;
    else if (typeof v === "number" || typeof v === "boolean")
      out[k] = String(v);
  }
  return out;
}

export async function POST(request: NextRequest) {
  const { apiKey, submitUrl } = env();
  if (!apiKey || !submitUrl) {
    return NextResponse.json(
      { error: "Lead capture is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { form_name: rawName, data: rawData } = body as {
    form_name?: unknown;
    data?: unknown;
  };

  const formName =
    typeof rawName === "string" && rawName.length > 0 ? rawName : "contact";

  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) {
    return NextResponse.json({ error: "Missing data object." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "";

  const serverTracking = {
    server_ip: clientIp,
    server_user_agent: request.headers.get("user-agent") ?? "",
    server_referer: request.headers.get("referer") ?? "",
    recorded_at: new Date().toISOString(),
  };

  const merged: Record<string, string> = {
    ...toStringRecord(rawData as Record<string, unknown>),
    ...serverTracking,
  };

  if (formName === "contact") {
    const name = merged.name?.trim();
    const email = merged.email?.trim();
    const message = merged.message?.trim();
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }
  }

  const upstream = await fetch(submitUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      form_name: formName,
      data: merged,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: "Upstream error.", detail: text.slice(0, 200) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
