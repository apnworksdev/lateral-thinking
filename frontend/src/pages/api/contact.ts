import type { APIRoute } from "astro";

export const prerender = false;

const hubspotFields = [
  ["name", "firstname"],
  ["company", "company"],
  ["email", "email"],
  ["lookingFor", "what_are_you_looking_for"],
  ["where", "where_is_it_happening"],
  ["project", "message"],
] as const;

export const POST: APIRoute = async ({ request }) => {
  const portalId = import.meta.env.HUBSPOT_PORTAL_ID;
  const formId = import.meta.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    return Response.json({ ok: false }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ ok: false }, { status: 400 });
  }

  const value = (key: string) => {
    const raw = (body as Record<string, unknown>)[key];
    return typeof raw === "string" ? raw.trim().slice(0, 2000) : "";
  };

  const email = value("email");
  if (!email.includes("@") || !value("name") || !value("project")) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const fields = hubspotFields.flatMap(([key, name]) => {
    const fieldValue = value(key);
    return fieldValue ? [{ name, value: fieldValue }] : [];
  });

  const hubspot = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: request.headers.get("referer") ?? "",
          pageName: "Us",
        },
      }),
    },
  );

  if (!hubspot.ok) {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
};
