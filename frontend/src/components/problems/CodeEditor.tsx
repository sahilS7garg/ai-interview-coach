"use client";

import { useEffect, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Play, Send, Settings, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  onSubmit: () => void;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value);
  };

  return (
    <div className="flex flex-col h-full glass rounded-3xl overflow-hidden border-white/10">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-gray-900/40">
        <div className="flex items-center gap-4">
          <select
            className="bg-transparent text-sm font-medium text-gray-400 focus:outline-none cursor-pointer hover:text-white transition-colors"
            value={language}
            onChange={(e) => {}} // Handle language change if needed
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRun}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gray-800 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            Run code
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary text-xs font-bold text-white hover:bg-opacity-80 transition-all shadow-lg shadow-primary/20"
          >
            <Send className="w-3.5 h-3.5" />
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage={language}
          theme="vs-dark"
          value={value}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 20, bottom: 20 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>

      <div className="px-6 py-3 border-t border-white/5 bg-gray-900/40 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Keybindings: VS Code</span>
          <span>Theme: AI Dark</span>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
