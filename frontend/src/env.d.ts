/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly HUBSPOT_PORTAL_ID?: string;
  readonly HUBSPOT_FORM_ID?: string;
}
