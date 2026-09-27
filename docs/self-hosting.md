# Self-hosting

The public endpoint `https://doi-api.sendlabs.de/mcp` is free to use. Run your own instance if you want your own quota rules, your own hostname or a server next to your own Doichain node.

## What you need

| Component | Purpose |
|---|---|
| Python 3.11 or newer | runs the MCP server |
| A Doichain REST API | the MCP server calls it for every tool. Either the public API `https://doi-api.sendlabs.de` (reading and checking work without a key, anchoring needs a key) or your own instance next to a Doichain Core node. Ask [DOI Labs](https://www.doichain.org/en/) about running the REST API yourself |
| nginx (or another TLS reverse proxy) | TLS, rate limiting, the browser landing page and the client IP header |

The REST API endpoints used by the server are:

| Endpoint | Used by |
|---|---|
| `GET /v1/status`, `GET /v1/blocks`, `GET /v1/block/{id}` | `get_chain_status`, `get_block`, block interval, expiry dates |
| `GET /v1/poe/{sha256}`, `POST /v1/poe`, `GET /v1/poe/quota` | `check_proof`, `anchor_proof`, `get_anchoring_quota` |
| `GET /v1/name?name=…`, `GET /v1/names/history?name=…`, `GET /v1/names` | name tools |
| `GET /v1/tx/{txid}`, `GET /v1/address/{address}` (+ `/history`), `POST /v1/message/verify` | chain tools |
| `GET /health` | the server's own `/health` |

## Install

```bash
sudo useradd --system --home-dir /opt/doichain-mcp --shell /usr/sbin/nologin doimcp
sudo install -d -o doimcp -g doimcp -m 0750 /opt/doichain-mcp
sudo -u doimcp git clone https://github.com/neubuot/doichain-mcp /opt/doichain-mcp/app
sudo -u doimcp python3 -m venv /opt/doichain-mcp/venv
sudo -u doimcp /opt/doichain-mcp/venv/bin/pip install /opt/doichain-mcp/app
```

## Configure

Copy `deploy/doichain-mcp.env.example` to `/etc/doichain-mcp/doichain-mcp.env` (owner `root:doimcp`, mode `0640`) and adjust it:

| Variable | Default | Meaning |
|---|---|---|
| `DOI_MCP_API_URL` | `http://127.0.0.1:8080` | REST API base URL |
| `DOI_MCP_PUBLIC_URL` | `https://doi-api.sendlabs.de` | public base URL of this instance (icon and website link in `serverInfo`) |
| `DOI_MCP_VERIFILE_URL` | `https://verifile.it` | verification page linked in results |
| `DOI_MCP_POE_KEY` | empty | API key with the `poe` tier used for public anchoring. Empty disables anchoring for callers without their own key |
| `DOI_MCP_ACCEPT_BEARER` | `false` | `true` (or `1`, `yes`) also accepts a caller's own Doichain key as `Authorization: Bearer <key>`, in addition to `X-API-Key`. Off by default, because clients and gateways often send their own tokens in this header, which would otherwise be passed on to the REST API. If the REST API rejects a bearer token, the call is retried with the public key and an info message is logged (never the token) |
| `DOI_MCP_ALLOWED_HOSTS` | `doi-api.sendlabs.de,api.doi.zone,127.0.0.1:*,localhost:*` | accepted `Host` headers, add your hostname |
| `DOI_MCP_ALLOWED_ORIGINS` | our hostnames, `claude.ai`, `chatgpt.com`, localhost | accepted `Origin` headers (requests without `Origin` are always accepted) |
| `DOI_MCP_HOST`, `DOI_MCP_PORT`, `DOI_MCP_WORKERS` | `127.0.0.1`, `8081`, `1` | only for `python -m doichain_mcp` |

Never expose the server port directly. The server trusts `X-Real-IP` for the per-IP quota, which is only safe behind a proxy that overwrites the header.

## Run with systemd

`deploy/doichain-mcp.service` runs two uvicorn workers on `127.0.0.1:8081` with a strict sandbox (`ProtectSystem=strict`, only local network connections via `IPAddressAllow=localhost`, system call filter, no capabilities). Adjust the paths if you installed elsewhere, then:

```bash
sudo cp /opt/doichain-mcp/app/deploy/doichain-mcp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now doichain-mcp
curl -s http://127.0.0.1:8081/health
```

If `DOI_MCP_API_URL` points to a remote API, relax `IPAddressDeny`/`IPAddressAllow` in the unit, because the sandbox only allows local connections.

## nginx

`deploy/nginx-mcp.conf` contains a complete example: rate zone, the browser switch that serves the landing page at `/mcp`, `405` for `GET` without HTML, JSON-RPC error pages for `405`, `413` and `429`, `/mcp/health` and the landing page with a strict Content Security Policy. Copy `web/mcp-site/` to `/var/www/doichain-mcp-site/`. The landing page shows a live status from `GET /v1/status` on the same origin, so serve the REST API under the same hostname or remove that part of `app.js`.

## Check

```bash
curl -s https://mcp.example.org/mcp/health
curl -s -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}' \
  https://mcp.example.org/mcp
npx @modelcontextprotocol/inspector   # Streamable HTTP, https://mcp.example.org/mcp
```
