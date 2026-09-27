# Changelog

All notable changes to the Doichain MCP server. The format follows [Keep a Changelog](https://keepachangelog.com/),
versions follow [Semantic Versioning](https://semver.org/).

## [1.5.0] - 2026-09-27

Fixes from an external review by @NiKrause (issues #3 and #4). Requires Doichain REST API 1.5.0 or later for the
expired-hash protection: older APIs ignore the `reanchor` flag.

### Changed
- **Breaking:** `check_proof` no longer mixes two registrations. The top level describes only the first anchoring,
  including its own record (`record_untrusted`) and, when known, `first_owner_address`. Holder, record and expiry of
  a later registration are reported in `latest_registration` with a `kind` of `re-registration after expiry` or
  `update by the holder`. `owner_address` and `expires_in_blocks` stay at the top level only for a single registration.
- **Breaking:** `anchor_proof` returns `reanchored_expired_proof` instead of `renewed_expired_proof`.
- An expired hash is no longer registered again silently. `anchor_proof` returns the existing proof with a hint,
  and only registers again when `reanchor_expired=true` is passed.
- `Authorization: Bearer` is interpreted as a Doichain API key only when `DOI_MCP_ACCEPT_BEARER=true` (default false).
- Wording: no more "notary". The server describes what the chain shows, a tamper-evident timestamp proving that a
  document existed no later than the block time, and explains expiry and who holds the anchored names.
- The 0.01 DOI per name is described as a cost that is lost at expiry, not as a deposit.
- Workflows pin all actions to commit SHAs.

### Added
- `search_names` accepts `include_expired` to list expired names as well, for example old proofs.
- `api()` refuses to combine a response cache with keyed requests (cache entries are not separated per caller).

## [1.4.1] - 2026-09-26

First public release and listing in the MCP Registry as `io.github.neubuot/doichain`.

### Changed
- `check_proof` reports the first anchoring of a hash, also when an expired proof was anchored again later (`latest_registration` shows the newer one).
- Expired names report their real expiry date from the chain (`expired_at_utc`) instead of an estimate.
- Names read from the chain are returned as `name_untrusted` in `search_names` and `get_transaction`.
- Names are looked up via query parameter, so names ending in `/history` resolve correctly.
- Error messages are English, with the original detail of the REST API.
- `hash_text` accepts at most 40,000 characters. `get_block` accepts numbers. `get_transaction` accepts `0x` prefixes.
- Bearer tokens that do not look like Doichain keys (for example gateway JWTs) are ignored.
- At most six concurrent REST calls per worker, short cache for name and block lookups, `/health` cached for 15 seconds.
- `anchoring_available` in `get_chain_status` reflects the operating reserve of the node wallet.

### Security
- systemd unit restricted to local network connections, system call filter, no capabilities.
- nginx example with JSON-RPC error responses for 405, 413 and 429 and a rate limit on `/mcp/health`.
- Landing page without third-party resources.

## [1.4.0] - 2026-09-26

### Added
- MCP server with 13 tools: `anchor_proof`, `check_proof`, `hash_text`, `get_anchoring_quota`, `lookup_name`, `get_name_history`, `check_name_expiry`, `search_names`, `get_chain_status`, `get_block`, `get_transaction`, `get_address`, `verify_message`.
- Streamable HTTP, stateless, JSON responses, protocol versions 2024-11-05 to 2026-07-28.
- Landing page (German and English) served at the MCP URL for browsers.
- Hosted endpoint `https://doi-api.sendlabs.de/mcp`.

[1.4.1]: https://github.com/neubuot/doichain-mcp/releases/tag/v1.4.1
[1.4.0]: https://doi-api.sendlabs.de/mcp
