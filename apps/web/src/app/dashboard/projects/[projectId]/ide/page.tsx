"use client";
import dynamic from "next/dynamic";
const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });
export default function Ide(){return <div style={{height:"100vh",display:"grid",gridTemplateColumns:"220px 1fr 320px"}}><aside style={{padding:12,borderRight:"1px solid #233"}}>File Tree<br/>Source Control<br/>Terminal</aside><main><Monaco height="100vh" defaultLanguage="typescript" defaultValue="export const demo = true;" options={{ minimap: { enabled: true } }} /></main><aside style={{padding:12,borderLeft:"1px solid #233"}}>AI Chat<br/>Agent<br/>Diffs</aside></div>}
