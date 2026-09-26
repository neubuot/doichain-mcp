"""Start the server with uvicorn: ``python -m doichain_mcp`` or the ``doichain-mcp`` command.

Host and port come from DOI_MCP_HOST (default 127.0.0.1) and DOI_MCP_PORT (default 8081). Put a TLS
reverse proxy such as nginx in front of it for public use, see docs/self-hosting.md.
"""

import os

import uvicorn


def main() -> None:
    uvicorn.run(
        "doichain_mcp.server:app",
        host=os.environ.get("DOI_MCP_HOST", "127.0.0.1"),
        port=int(os.environ.get("DOI_MCP_PORT", "8081")),
        workers=int(os.environ.get("DOI_MCP_WORKERS", "1")),
        proxy_headers=True,
        forwarded_allow_ips="127.0.0.1",
        server_header=False,
        access_log=False,
    )


if __name__ == "__main__":
    main()
