// terraDebugger/index.js
import { breakpoints } from "../breakpoints/index.js";
import { u_get_browser } from "@andresclua/jsutil";

/**
 * Terra Debugger (minimal UI + custom renderer)
 * - Sin botón de cerrar
 * - Sin acciones de copiar
 * - Entrega a `custom(ctx, ui)` un contenedor para renderizar contenido
 *
 * @param {{
 *  submitQA?: string,
 *  custom?: (ctx: {
 *    url: string,
 *    width: number,
 *    height: number,
 *    breakpoint: string,
 *    browser: string,
 *    headers: Record<string,string>,
 *    nowISO: string
 *  }, ui: {
 *    mount: HTMLElement,        // donde renderizas TU contenido
 *    fetchText: () => Promise<string>, // GET no-cache a la URL actual (server HTML)
 *    getDomHTML: () => string,  // HTML actual del DOM (post-hidratación)
 *  }) => (void|Promise<void>)
 * }} payload
 */
export const terraDebugger = (payload = {}) => {
  const { submitQA, custom } = payload;

  // --- UI base: tarjeta fija, sin cerrar ---
  const wrap = document.createElement("div");
  wrap.id = "terra-debugger";
  Object.assign(wrap.style, {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    width: "min(560px, 92vw)",
    maxHeight: "48vh",
    overflow: "auto",
    borderRadius: "12px",
    background: "#2c2222",
    color: "#fff",
    zIndex: "100000",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,.35)",
  });

  const header = document.createElement("div");
  Object.assign(header.style, {
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,.12)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  });

  const title = document.createElement("div");
  title.textContent = "🧭 Terra Debugger";
  Object.assign(title.style, { fontWeight: "700" });

  const meta = document.createElement("div");
  Object.assign(meta.style, { marginLeft: "auto", opacity: ".85" });

  const linkQA = submitQA
    ? (() => {
        const a = document.createElement("a");
        a.href = submitQA;
        a.target = "_blank";
        a.textContent = "Open ClickUp";
        Object.assign(a.style, { color: "#fff", textDecoration: "underline" });
        return a;
      })()
    : null;

  header.appendChild(title);
  if (linkQA) header.appendChild(linkQA);
  header.appendChild(meta);

  const mount = document.createElement("div");
  Object.assign(mount.style, { padding: "10px 12px" });

  wrap.append(header, mount);
  document.body.appendChild(wrap);

  // --- helpers ---
  const getBreakpointName = (w) => {
    if (w <= breakpoints[0].mobile) return "mobile";
    if (w <= breakpoints[1].tablets) return "tablets";
    if (w <= breakpoints[2].tabletm) return "tabletm";
    if (w <= breakpoints[3].tabletl) return "tabletl";
    if (w <= breakpoints[4].laptop) return "laptop";
    return "desktop";
  };

  const updateMeta = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bp = getBreakpointName(w);
    meta.textContent = `BP:${bp} • ${w}×${h} • ${u_get_browser()}`;
  };

  const collectHeaders = async () => {
    const url = window.location.href;
    /** @type {Record<string,string>} */
    const headers = {};
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store", credentials: "include" });
      if (!res.ok) throw new Error(`HEAD ${res.status}`);
      res.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
    } catch {
      try {
        const res2 = await fetch(url, { method: "GET", cache: "no-store", credentials: "include" });
        res2.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
      } catch (e2) {
        headers["error"] = `No se pudieron leer headers: ${e2?.message || "unknown"}`;
      }
    }
    return headers;
  };

  const fetchText = async () => {
    const res = await fetch(window.location.href, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });
    return res.text();
  };

  const getDomHTML = () => document.documentElement.outerHTML;

  // --- ciclo de vida ---
  const render = async () => {
    updateMeta();

    const ctx = {
      url: window.location.href,
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: getBreakpointName(window.innerWidth),
      browser: u_get_browser(),
      headers: await collectHeaders(),
      nowISO: new Date().toISOString(),
    };

    if (typeof custom === "function") {
      try {
        await custom(ctx, { mount, fetchText, getDomHTML });
      } catch (err) {
        mount.innerHTML = `<div style="color:#ffb4b4">custom() error: ${String(err)}</div>`;
        // además en consola
        console.error("[Terra Debugger] custom() error:", err);
      }
    } else {
      // default: muestra info básica si no se define custom
      mount.innerHTML = `
        <div style="opacity:.9">
          <div><b>URL:</b> ${ctx.url}</div>
          <div><b>Cache-Control:</b> ${ctx.headers["cache-control"] || "—"}</div>
          <div><b>Content-Encoding:</b> ${ctx.headers["content-encoding"] || "—"}</div>
          <div><b>CF-Cache-Status:</b> ${ctx.headers["cf-cache-status"] || "—"}</div>
          <div style="margin-top:8px;opacity:.7">Define <code>custom(ctx, ui)</code> para render propio.</div>
        </div>
      `;
    }

    // Implementación de custom
    if (typeof custom === "function") {
      try {
        await custom(ctx, { 
          mount, 
          fetchText, 
          getDomHTML,
          getHeadHTML: () => document.head.outerHTML
        });
      } catch (err) {
        mount.innerHTML = `<div style="color:#ffb4b4">custom() error: ${String(err)}</div>`;
        console.error("[Terra Debugger] custom() error:", err);
      }
    }
  };

  // inicial + resize
  render();
  window.addEventListener("resize", () => {
    updateMeta();
  }, { passive: true });
};
