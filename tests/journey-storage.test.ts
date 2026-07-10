import { describe, expect, it } from "vitest";
import { createInitialJourneyState } from "../components/career/journey/fixtures";
import { parseJourneyState, serializeJourneyState, STORAGE_KEY } from "../components/career/journey/storage";

describe("journey storage",()=>{
 it("uses versioned key",()=>{expect(STORAGE_KEY).toBe("careerai-journey-ui-v2")});
 it("round trips mutable state",()=>{const s=createInitialJourneyState(); const parsed=parseJourneyState(serializeJourneyState(s)); expect(parsed.state.roles).toHaveLength(6); expect(parsed.warning).toBeUndefined()});
 it("falls back on corrupt or old JSON",()=>{expect(parseJourneyState("{").state.roles).toHaveLength(6); expect(parseJourneyState(JSON.stringify({version:1})).warning).toContain("unsupported")});
});
