# Contributing

Issues and pull requests are welcome.

## Development setup

```bash
python -m venv .venv
. .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
pytest -q
ruff check .
```

The tests run offline: the Doichain REST API is replaced by an `httpx.MockTransport` and the MCP client talks
to the server in process. Please add a test for every behavior change.

## Guidelines

- Keep the server a thin, stateless layer over the REST API. No new writing tools without discussion.
- Tool descriptions and results are in English and should be clear enough for an agent to use without further
  documentation. Mark every value that users can write to the chain as `_untrusted`.
- Update `CHANGELOG.md` and `docs/tools.md` together with the code.

## Releases

1. Update the version in `pyproject.toml`, `server.json`, `doichain_mcp/__init__.py` and `VERSION` in
   `doichain_mcp/server.py`, and add a `CHANGELOG.md` entry.
2. Merge to `main`, then push a tag `vX.Y.Z`.
3. The `Publish` workflow runs the tests, checks that the versions match the tag and publishes `server.json`
   to the MCP Registry via GitHub OIDC.

Report security problems privately, see [SECURITY.md](SECURITY.md).
