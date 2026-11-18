import { describe, expect, it, vi } from "vitest";
import { createSaltCache, visitorHash } from "./visit";

const salt = (day: string, s = "a".repeat(64)) => ({ day, salt: s });

describe("visitorHash", () => {
  it("is stabiel binnen een dag met dezelfde salt", () => {
    expect(visitorHash("2026-11-18", "1.2.3.4", "ua", "s".repeat(64))).toBe(visitorHash("2026-11-18", "1.2.3.4", "ua", "s".repeat(64)));
  });
  it("wisselt met de salt (en dus per dag)", () => {
    expect(visitorHash("2026-11-18", "1.2.3.4", "ua", "a".repeat(64))).not.toBe(visitorHash("2026-11-18", "1.2.3.4", "ua", "b".repeat(64)));
  });
  it("bevat het IP-adres niet en is 16 tekens hex", () => {
    const h = visitorHash("2026-11-18", "1.2.3.4", "ua", "a".repeat(64));
    expect(h).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe("createSaltCache", () => {
  it("haalt de salt één keer per dag op", async () => {
    const fetch = vi.fn().mockResolvedValue(salt("2026-11-18"));
    const saltFor = createSaltCache(fetch);
    await saltFor("2026-11-18");
    await saltFor("2026-11-18");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("vervangt de salt op een nieuwe dag", async () => {
    const fetch = vi.fn().mockResolvedValueOnce(salt("2026-11-18", "a".repeat(64))).mockResolvedValueOnce(salt("2026-11-19", "b".repeat(64)));
    const saltFor = createSaltCache(fetch);
    expect((await saltFor("2026-11-18"))?.salt).toBe("a".repeat(64));
    expect((await saltFor("2026-11-19"))?.salt).toBe("b".repeat(64));
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("geeft null (niet tellen) bij een fout, geen database of een te korte salt", async () => {
    expect(await createSaltCache(() => Promise.reject(new Error("x")))("2026-11-18")).toBeNull();
    expect(await createSaltCache(async () => null)("2026-11-18")).toBeNull();
    expect(await createSaltCache(async () => salt("2026-11-18", "kort"))("2026-11-18")).toBeNull();
  });
  it("cachet niet als de database al op een andere dag staat (rond middernacht)", async () => {
    const fetch = vi.fn().mockResolvedValue(salt("2026-11-19"));
    const saltFor = createSaltCache(fetch);
    expect((await saltFor("2026-11-18"))?.day).toBe("2026-11-19");
    await saltFor("2026-11-18");
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
