<p align="center">
  <img src="web/mcp-site/icon.svg" width="96" height="96" alt="Doichain-MCP-Logo">
</p>

<h1 align="center">Doichain MCP-Server</h1>

<p align="center">
  <strong>Zeitstempel und Existenznachweise für Ihren KI-Agenten.</strong><br>
  Belegen Sie, dass ein Dokument zu einem bestimmten Zeitpunkt schon existierte: den Hash mit Zeitstempel in der Doichain verankern, Nachweise prüfen, Namen, Blöcke und Adressen lesen.<br>
  Eine Adresse genügt, ohne Konto, ohne Schlüssel, ohne Installation.
</p>

<p align="center"><a href="README.md">English</a> · <a href="docs/tools.md">Werkzeugreferenz (englisch)</a> · <a href="docs/self-hosting.md">Selbst betreiben (englisch)</a></p>

---

**Adresse:** `https://doi-api.sendlabs.de/mcp` · Streamable HTTP · zustandslos · keine Anmeldung

Die [Doichain](https://www.doichain.org/en/) ist eine öffentliche Blockchain mit eingebautem Namensspeicher (ein Namecoin-Abkömmling, per Merged Mining mit Bitcoin gesichert). Dieser Server macht sie für jeden Agenten nutzbar, der das [Model Context Protocol](https://modelcontextprotocol.io) spricht: Claude, ChatGPT, Cursor, VS Code und viele mehr. Man sagt dem Agenten einfach, was man möchte, das passende Werkzeug wählt er selbst:

> „Verankere den Hash von angebot-2026.pdf in der Doichain.“
> „Gab es diesen Vertrag schon vor dem 1. Oktober?“
> „Laufen d/beispiel oder id/alice bald ab?“

Im Browser zeigt dieselbe Adresse die [Landingpage](https://doi-api.sendlabs.de/mcp) mit Anleitung.

## Einbinden

| Programm | So geht es |
|---|---|
| Claude Code | `claude mcp add --scope user --transport http doichain https://doi-api.sendlabs.de/mcp` |
| Claude (Web und Desktop) | Anpassen → Konnektoren → + → Benutzerdefinierten Konnektor hinzufügen, Name „Doichain“, Adresse eintragen. Im Chat über + → Konnektoren einschalten. Auch im kostenlosen Tarif möglich (ein eigener Konnektor) |
| ChatGPT | Einstellungen → Sicherheit und Anmeldung → Entwicklermodus, dann unter Plugins mit + eine App mit der Adresse anlegen, Authentifizierung „Keine“ (Plus, Pro, Business, Enterprise, Education) |
| Cursor | `~/.cursor/mcp.json`: `{"mcpServers": {"doichain": {"url": "https://doi-api.sendlabs.de/mcp"}}}` |
| VS Code | `.vscode/mcp.json`: `{"servers": {"doichain": {"type": "http", "url": "https://doi-api.sendlabs.de/mcp"}}}` |

## Werkzeuge

| Werkzeug | Zweck |
|---|---|
| `anchor_proof` | Hash eines Dokuments als Zeitstempel verankern (einziges schreibendes Werkzeug). Ist er schon verankert, kommt der bestehende Nachweis zurück. Einen abgelaufenen Hash registriert das Werkzeug nur mit `reanchor_expired` erneut |
| `check_proof` | Ist der Hash verankert, seit wann, in welchem Block. Nennt immer die erste Verankerung und zeigt eine spätere Registrierung des Namens getrennt an |
| `hash_text` | SHA-256 eines kurzen Textes, im Server berechnet, nichts wird gespeichert |
| `get_anchoring_quota` | verbleibende Nachweise des Tages |
| `lookup_name`, `get_name_history`, `search_names` | Namen lesen, Historie, Suche nach Präfix (abgelaufene Namen mit `include_expired`) |
| `check_name_expiry` | bis zu 25 Namen auf einmal: aktiv, läuft bald ab, abgelaufen oder frei, mit Datum |
| `get_chain_status`, `get_block`, `get_transaction`, `get_address`, `verify_message` | Zustand der Kette, Blöcke, Transaktionen, Guthaben, signierte Nachrichten |

## Was ein Nachweis belegt

- Der Zeitstempel bleibt dauerhaft in der Blockchain, die Verankerungstransaktion und ihre Blockzeit gehen nicht verloren.
- Der Name `poe/<sha256>` läuft nach 36.000 Blöcken (rund 250 Tage bei zehn Minuten je Block) ab und kann danach von jedem neu registriert werden. `check_proof` nennt weiterhin die erste Verankerung als Nachweiszeitpunkt und zeigt eine spätere Registrierung getrennt an. `anchor_proof` registriert einen abgelaufenen Hash nur auf ausdrücklichen Wunsch (`reanchor_expired`) erneut.
- Ein Nachweis belegt, dass ein Dokument mit diesem Hash spätestens zur Blockzeit existierte. Wer ihn eingereicht hat, belegt er nicht. Die Namen registriert der Betreiber des Endpunkts aus seinem Wallet, er bezahlt und hält sie.

## Kontingent und Grenzen

- Verankern ist für Nutzer kostenlos: 10 Nachweise am Tag je IP-Adresse, für alle zusammen höchstens 200 am Tag.
- 10 Anfragen je Sekunde und IP-Adresse, Anfragen bis 256 KB.
- Gehostete Apps (Claude im Browser, ChatGPT) verbinden sich aus den Rechenzentren ihrer Anbieter. Deren Nutzer teilen sich deshalb das Kontingent dieser Adressen. Für regelmäßiges Verankern eignen sich Claude Code, Cursor oder VS Code.

## Sicherheit und Datenschutz

- Der Server nimmt keine Dateien an, auf die Kette kommt nur der Hash (und auf Wunsch eine öffentliche Notiz).
- Keine Wallet-Funktionen: Der Server kann keine Coins senden und keine Namen ändern. Sein einziger Schreibzugriff ist `anchor_proof`, dafür registriert die REST-API den Namen aus dem Wallet des Betreibers. Er läuft getrennt von der Node unter eigenem Systembenutzer.
- Namen und Werte, die Fremde in die Kette geschrieben haben, sind als `_untrusted` gekennzeichnet (Schutz gegen Prompt-Injection).
- Keine Cookies, kein Tracking, keine Inhalte von Dritten.

Sicherheitslücken bitte über die [vertrauliche Meldung auf GitHub](https://github.com/neubuot/doichain-mcp/security/advisories/new) melden, siehe [SECURITY.md](SECURITY.md).

## Lizenz und Betreiber

[MIT](LICENSE), © 2026 DOI Labs AG. Den öffentlichen Endpunkt betreibt [DOI Labs](https://www.doichain.org/en/), [Impressum](https://www.doichain.org/en/imprint/).
