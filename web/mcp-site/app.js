/* Doichain MCP Landingpage: Sprache, Reiter, Kopieren, Live-Status. Alle Texte hier sind statisch. */
(function () {
  "use strict";

  var EN = {
    "nav.demo": "Examples", "nav.connect": "Connect", "nav.tools": "Tools", "nav.trust": "Security",
    "hero.eyebrow": "Model Context Protocol · Doichain",
    "hero.title": 'Your AI agent proves <span class="g">a document already existed</span>.',
    "hero.lead": "One link is all it takes: Claude, ChatGPT, Cursor or any other MCP-capable agent anchors a document's fingerprint on the Doichain with a timestamp that cannot be changed afterwards. It also checks proofs and reads names and blocks. No account, no key, no installation.",
    "hero.endpoint": "MCP address", "hero.cta1": "Connect in 30 seconds", "hero.cta2": "See the 13 tools",
    "copy": "Copy", "copied": "Copied",
    "status.loading": "Querying the Doichain …",
    "demo.title": "Just tell your agent", "demo.sub": "No code, no commands. The agent picks the right tool by itself.",
    "demo.q1": "Anchor the hash of offer-2026.pdf on the Doichain.",
    "demo.a1": "Done. I computed the SHA-256 locally and anchored it. Transaction <code>8067f0df…</code>, confirmed with the next block (usually under 10 minutes). Anyone can verify it at <code>verifile.it/#3f9a…c21e</code>.",
    "demo.q2": "Did this document already exist before October 1?",
    "demo.a2": "Yes. Exactly this file was anchored on 25 Sep 2026 at 23:21 UTC in block 433,335. Changing a single character would produce a different hash.",
    "demo.q3": "Are d/example or id/alice about to expire?",
    "demo.a3": "<strong>d/example</strong> stays active for about 228 more days (until around 12 May 2027). <strong>id/alice</strong> is not registered, the name is free.",
    "demo.q4": "How is the Doichain doing right now?",
    "demo.a4": "Synced at block 433,427, last block 7 minutes ago, 9 minutes average block interval, fork check fine, 15 connections.",
    "how.title": "How a proof comes about", "how.sub": "The document never leaves your computer. Only its digital fingerprint goes on chain.",
    "how.s1t": "Compute the fingerprint", "how.s1": 'The agent computes the file\'s SHA-256 on your computer, for example with <code>sha256sum</code>. It needs access to the file for that, as in Claude Code, Cursor or VS Code. In a plain chat, <a href="https://verifile.it/">verifile.it</a> is the easiest way.',
    "how.s2t": "Anchor it on the Doichain", "how.s2": "<code>anchor_proof</code> writes the name <code>poe/&lt;hash&gt;</code> to the blockchain. With the next block the point in time is recorded and cannot be changed afterwards.",
    "how.s3t": "Verify any time", "how.s3": 'Later anyone can show with <code>check_proof</code> or on <a href="https://verifile.it/">verifile.it</a> that exactly this document existed no later than that time.',
    "connect.title": "Connected in 30 seconds", "connect.sub": "Transport Streamable HTTP, no sign-in needed. Add the address and you are done.",
    "connect.other": "Other",
    "connect.cc": "Run once in your terminal, then the server is available in all your projects:",
    "connect.cc2": "Check with <code>claude mcp list</code>. Without <code>--scope user</code> the server only applies to the current project. With your own key and no daily quota, append <code>--header \"X-API-Key: …\"</code>.",
    "connect.ca1": "In Claude open <strong>Customize → Connectors</strong> and click <strong>+</strong>.",
    "connect.ca2": "Choose <strong>Add custom connector</strong>.",
    "connect.ca3": "Name <strong>Doichain</strong>, paste the MCP address as URL and save.",
    "connect.ca4": "In a chat, enable “Doichain” via <strong>+ → Connectors</strong> at the lower left and start.",
    "connect.ca5": "Also works on the free plan (one custom connector there). On Team and Enterprise an owner adds the connector in the organization settings.",
    "connect.gp1": "In ChatGPT open <strong>Settings → Security and login</strong> and turn on <strong>Developer mode</strong>.",
    "connect.gp2": "Under <strong>Plugins</strong> use <strong>+</strong> to create an app: name <strong>Doichain</strong>, the MCP address, authentication <strong>None</strong>.",
    "connect.gp3": "Select the app in the chat.",
    "connect.gp4": "Developer mode is available on the web for Plus, Pro, Business, Enterprise and Education. Menu names may differ by version.",
    "connect.cu": "In <code>~/.cursor/mcp.json</code> (all projects) or <code>.cursor/mcp.json</code> (this project only):",
    "connect.vs": "In the project's <code>.vscode/mcp.json</code>, then use it in Copilot chat in agent mode:",
    "connect.ot": "Any desktop, command line or server client with Streamable HTTP works. The usual settings:",
    "connect.k1": "Address", "connect.k2": "Transport", "connect.k2b": "stateless, JSON responses, no JSON-RPC batches", "connect.k3": "Sign-in",
    "connect.k3b": "none. Optionally your own key in the <code>X-API-Key</code> header",
    "connect.k4": "Protocol", "connect.k4b": "to",
    "connect.k5": "Browser", "connect.k5b": "Clients running directly in a web browser are not supported (no CORS)",
    "tools.title": "13 tools for your agent", "tools.sub": "Reading is free. Only anchoring writes to the chain, free of charge within a daily quota.",
    "tools.write": "writes", "tools.read": "reads", "tools.server": "server-side",
    "tools.anchor": "Anchor the hash of a document as proof. Already anchored hashes are detected. An expired hash is only anchored again with <code>reanchor_expired</code>. That adds a later timestamp. The first one still counts.",
    "tools.check": "Is this hash anchored, since when, in which block? Always reports the first anchoring and lists a later registration separately.",
    "tools.hash": "SHA-256 of a short text, computed on the server without storing it. Hash files and confidential texts locally.",
    "tools.quota": "How many proofs are still free today?",
    "tools.lookup": "Value, owner and expiry of a name like <code>d/…</code> or <code>id/…</code>.",
    "tools.expiry": "Up to 25 names at once: active, expiring soon, expired or free, with a date.",
    "tools.history": "Every registration and change of a name, newest first.",
    "tools.search": "List names by prefix, for example all <code>poe/</code> proofs. With <code>include_expired</code> expired ones too.",
    "tools.status": "Block height, sync state, last block, fork check, block interval.",
    "tools.block": "A block by height or hash with time and transactions.",
    "tools.tx": "A transaction with outputs, addresses and name operations.",
    "tools.address": "Balance of an address, optionally with its latest transactions.",
    "tools.verify": "Check whether a message was really signed by the holder of an address.",
    "trust.title": "Security and privacy", "trust.sub": "Built for public operation with any agent.",
    "trust.c1t": "Hashes only, no files", "trust.c1": "The server accepts no files. A SHA-256 cannot be turned back into the content. Only <code>hash_text</code> sees a short text and forgets it right away.",
    "trust.c2t": "Free, with a quota", "trust.c2": "Anchoring is free: 10 proofs per day per internet connection, at most 200 per day for all users together. More with your own key.",
    "trust.c3t": "No wallet functions", "trust.c3": "The MCP server cannot send coins and knows neither private keys nor the wallet. It runs as a separate service, apart from the node. DOI Labs pays for anchorings from its own wallet.",
    "trust.c4t": "Prompt injection protection", "trust.c4": "Names and values that strangers wrote to the chain are marked <code>_untrusted</code>. The agent treats them as data, never as instructions.",
    "trust.c5t": "Own node", "trust.c5": "Behind it runs a full Doichain Core node v31.1.6 with fork check, operated by DOI Labs.",
    "trust.c6t": "No cookies, no tracking", "trust.c6": "This page loads nothing from third parties and sets no cookies. Like on any web server, IP addresses appear in the access logs and count toward the daily quota. Content is not stored.",
    "faq.title": "Frequently asked questions",
    "faq.q1": "What is MCP?", "faq.a1": "The Model Context Protocol is an open standard that lets AI applications connect tools and data. Once added, your agent can use the Doichain tools on its own.",
    "faq.q2": "What does it cost?", "faq.a2": "Nothing for users. Each anchoring costs a small fee plus 0.01 DOI for the name. The 0.01 DOI is not a refundable deposit and is lost when the name expires. DOI Labs pays both from its own wallet, which is why there is a daily quota per connection.",
    "faq.q3": "How long is a proof valid?", "faq.a3": "The timestamp stays in the chain history permanently. The name <code>poe/&lt;hash&gt;</code>, however, is only active for 36,000 blocks (about 250 days at ten minutes per block). Afterwards it is free and could be registered again, even by someone else. <code>check_proof</code> always reports the first anchoring as the proof time and shows a later registration separately.",
    "faq.q4": "Do I need DOI or a wallet?", "faq.a4": "No. The server anchors through the DOI Labs node. If you want to own names yourself, use the REST API with your own key or your own wallet.",
    "faq.q8": "Who owns a proof?", "faq.a8": "The name <code>poe/&lt;hash&gt;</code> is held by the DOI Labs wallet, which also pays the fee and the 0.01 DOI for the name. The proof shows that a document with this hash existed no later than that time, not who submitted it.",
    "faq.q5": "What does the public see?", "faq.a5": "The hash, the point in time and an optional note or file name if you explicitly want that. No content, no personal data.",
    "faq.q7": "Why does the quota run out quickly in Claude on the web or in ChatGPT?", "faq.a7": "These apps connect from their providers' data centers, so all their users share the quota of those addresses. Reading and checking are unlimited. For regular anchoring use Claude Code, Cursor or VS Code (connection from your own computer) or your own key.",
    "faq.q6": "Is there a way without AI?", "faq.a6": 'Yes. <a href="https://verifile.it/">Verifile</a> is the drag-and-drop web app, the <a href="/">Doichain REST API</a> the interface for your own programs.',
    "links.api": "The interface behind this server, with a playground", "links.docs": "Try every REST API endpoint",
    "links.verifile": "Proofs by drag and drop in the browser", "links.mcp": "Specification and clients of the protocol",
    "links.github": "Source code, tool reference and self-hosting guide (MIT license)",
    "foot.imprint": "Legal notice", "foot.by": "A DOI Labs service built on the Doichain. No cookies, no tracking."
  };
  var DE = { "copy": "Kopieren", "copied": "Kopiert" };
  var TITLE = { de: "Doichain MCP: Zeitstempel für Dokumente, direkt aus dem KI-Agenten", en: "Doichain MCP: document timestamps for your AI agent" };

  var lang = "de";
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  nodes.forEach(function (el) { el.setAttribute("data-de", el.innerHTML); });
  var lastStatus = null;

  function t(key) { return (lang === "en" ? EN[key] : DE[key]) || EN[key] || key; }

  function readStore(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writeStore(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privater Modus */ } }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.innerHTML = lang === "en" && EN[key] ? EN[key] : el.getAttribute("data-de");
    });
    document.getElementById("langBtn").textContent = lang === "en" ? "DE" : "EN";
    document.title = TITLE[lang];
    renderStatus();
    writeStore("doichain-mcp-lang", lang);
  }

  document.getElementById("langBtn").addEventListener("click", function () { applyLang(lang === "en" ? "de" : "en"); });

  // Reiter der Einbauanleitung (Pfeiltasten wie bei einer Tab-Liste)
  var tabs = Array.prototype.slice.call(document.querySelectorAll("#connectTabs .tab"));
  function selectTab(tab, focus) {
    var target = tab.getAttribute("data-t");
    tabs.forEach(function (x) {
      var on = x === tab;
      x.classList.toggle("on", on);
      x.setAttribute("aria-selected", on ? "true" : "false");
      x.setAttribute("tabindex", on ? "0" : "-1");
    });
    Array.prototype.forEach.call(document.querySelectorAll(".pane"), function (p) { p.classList.toggle("on", p.getAttribute("data-p") === target); });
    if (focus) { tab.focus(); }
  }
  tabs.forEach(function (tab, i) {
    tab.setAttribute("tabindex", tab.classList.contains("on") ? "0" : "-1");
    tab.addEventListener("click", function () { selectTab(tab, false); });
    tab.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
        ev.preventDefault();
        var next = tabs[(i + (ev.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(next, true);
      }
    });
  });

  // Kopieren
  function copyText(text, btn) {
    var done = function () {
      btn.textContent = t("copied"); btn.classList.add("done");
      setTimeout(function () { btn.textContent = t("copy"); btn.classList.remove("done"); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* nichts */ }
    document.body.removeChild(ta);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".copy"), function (btn) {
    btn.addEventListener("click", function () {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      if (src) { copyText(src.textContent.trim(), btn); }
    });
  });

  // Live-Status der Node (gleiche Origin, REST-API)
  function fmt(n) { return typeof n === "number" ? n.toLocaleString(lang === "en" ? "en-US" : "de-DE") : String(n); }
  function renderStatus() {
    var dot = document.getElementById("dot"), text = document.getElementById("statusText");
    if (!lastStatus) { return; }
    if (lastStatus.error) {
      dot.className = "dot bad";
      text.textContent = lang === "en" ? "Doichain node not reachable right now" : "Doichain-Node gerade nicht erreichbar";
      return;
    }
    var s = lastStatus, chain = s.chain || {}, wallet = s.wallet || {};
    var ok = chain.fork_check && chain.fork_check.ok && !chain.initial_block_download;
    var mins = chain.best_block_time ? Math.max(0, Math.round((Date.now() / 1000 - chain.best_block_time) / 60)) : null;
    var anchoring = wallet.public_poe_available !== undefined ? wallet.public_poe_available : wallet.funded;
    dot.className = "dot " + (ok ? "ok" : "bad");
    if (lang === "en") {
      text.textContent = (ok ? "Live: " : "Check: ") + "block " + fmt(chain.blocks) + (mins !== null ? (mins < 1 ? ", last block just now" : ", last block " + mins + " min ago") : "") + (anchoring ? ", anchoring available" : ", anchoring paused");
    } else {
      text.textContent = (ok ? "Live: " : "Prüfen: ") + "Block " + fmt(chain.blocks) + (mins !== null ? (mins < 1 ? ", letzter Block gerade eben" : ", letzter Block vor " + mins + " Min.") : "") + (anchoring ? ", Verankern verfügbar" : ", Verankern pausiert");
    }
  }
  function loadStatus() {
    fetch("/v1/status", { headers: { "Accept": "application/json" } })
      .then(function (r) { if (!r.ok) { throw new Error(String(r.status)); } return r.json(); })
      .then(function (data) { lastStatus = data; renderStatus(); })
      .catch(function () { lastStatus = { error: true }; renderStatus(); });
  }

  var saved = readStore("doichain-mcp-lang");
  var initial = saved === "en" || saved === "de" ? saved : ((navigator.language || "de").toLowerCase().indexOf("de") === 0 ? "de" : "en");
  if (initial === "en") { applyLang("en"); }
  loadStatus();
  setInterval(loadStatus, 60000);
})();
