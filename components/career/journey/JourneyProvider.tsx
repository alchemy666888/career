"use client";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { createInitialJourneyState } from "./fixtures";
import { journeyReducer } from "./journeyReducer";
import { loadJourneyState, saveJourneyState } from "./storage";
import type { JourneyAction, JourneyState } from "./types";
const Ctx=createContext<{state:JourneyState;dispatch:React.Dispatch<JourneyAction>}|null>(null);
export function JourneyProvider({children}:{children:React.ReactNode}){const [state,dispatch]=useReducer(journeyReducer,undefined,createInitialJourneyState); useEffect(()=>{const loaded=loadJourneyState(); dispatch({type:"hydrate",state:loaded.state,warning:loaded.warning})},[]); useEffect(()=>{if(state.hydrated) saveJourneyState(state)},[state]); const value=useMemo(()=>({state,dispatch}),[state]); return <Ctx.Provider value={value}>{children}</Ctx.Provider>}
export function useJourney(){const v=useContext(Ctx); if(!v) throw new Error("useJourney must be used inside JourneyProvider"); return v}
