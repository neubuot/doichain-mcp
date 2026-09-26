"""Check a proof of existence with the official MCP Python SDK (mcp>=2.2).

    pip install "mcp>=2.2,<3"
    python examples/check_proof.py path/to/file.pdf

The file is hashed locally, only the SHA-256 is sent to the server.
"""

import asyncio
import hashlib
import json
import sys

from mcp import Client

URL = "https://doi-api.sendlabs.de/mcp"


def sha256_of(path: str) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


async def main(path: str) -> None:
    digest = sha256_of(path)
    async with Client(URL) as client:
        result = await client.call_tool("check_proof", {"sha256": digest})
    print(json.dumps(result.structured_content, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python examples/check_proof.py <file>")
    asyncio.run(main(sys.argv[1]))
