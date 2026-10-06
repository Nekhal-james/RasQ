import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/codeSnippets';
import { CodeSnippet } from '../types';
import { Terminal, Copy, Check, Play, FileCode, CheckCircle2 } from 'lucide-react';

interface CodePlaygroundProps {
  onRunSnippet: (demoMode: string) => void;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ onRunSnippet }) => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(CODE_SNIPPETS[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '# RasQ Developer SDK Ready',
    '# Select a script and click "Run in Testbench"',
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsExecuting(true);
    setConsoleLogs([
      `$ python3 ${selectedSnippet.filename}`,
      `[RasQ-HAL] Discovering USB-C devices on /dev/ttyUSB0...`,
      `[RasQ-HAL] Handshake acknowledged: ESP32-S3 firmware v0.9.4`,
      `[RasQ-Vision] Initializing camera ISP (1280x720 @ 60fps)...`,
      `[RasQ-NPU] Compiling TFLite graph to Hexagon/Tensor NPU accelerator...`,
      `[RasQ-NPU] Ready. Inference latency: 11.2ms`,
      `[CLOSED-LOOP] Pipeline active. Streaming telemetry to bridge...`
    ]);

    setTimeout(() => {
      setIsExecuting(false);
      onRunSnippet(selectedSnippet.demoMode);
    }, 1200);
  };

  return (
    <section id="sdk" className="py-24 border-b border-neutral-900 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <span>04. DEVELOPER SDK & RUNTIME</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">PYTHON & C++ APIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Write simple code. Let the NPU and Bridge handle the rest.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            The RasQ SDK bridges your phone's high-level AI runtime directly with low-level microsecond hardware control. No boilerplate USB drivers, no custom firmware flashing.
          </p>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CODE_SNIPPETS.map(snippet => (
            <button
              key={snippet.id}
              onClick={() => {
                setSelectedSnippet(snippet);
                setConsoleLogs([
                  `# Loaded ${snippet.filename}`,
                  `# Target Demo: ${snippet.title}`,
                ]);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedSnippet.id === snippet.id
                  ? 'bg-neutral-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{snippet.filename}</span>
            </button>
          ))}
        </div>

        {/* Code Editor & Console Terminal Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Code Editor */}
          <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Top Bar of Editor */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  </div>
                  <span className="text-neutral-300 ml-2 font-medium">{selectedSnippet.filename}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleRun}
                    disabled={isExecuting}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-[11px] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isExecuting ? 'Compiling...' : 'Run in Rig'}</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Content */}
              <div className="bg-neutral-950 rounded-xl p-4 font-mono text-xs text-neutral-200 overflow-x-auto max-h-[460px] leading-relaxed border border-neutral-800/80">
                <pre>
                  <code>{selectedSnippet.code}</code>
                </pre>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between">
              <span>{selectedSnippet.description}</span>
              <span className="font-mono text-cyan-400 uppercase text-[10px]">{selectedSnippet.language}</span>
            </div>
          </div>

          {/* Right Column: Execution Console & Quick Installation */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            
            {/* Terminal Console */}
            <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5 shadow-2xl flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs font-mono">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  STDOUT / LIVE BRIDGE TELEMETRY
                </span>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="bg-neutral-950 rounded-xl p-3 font-mono text-xs text-neutral-300 flex-1 overflow-y-auto space-y-1.5 border border-neutral-800/80 max-h-[280px]">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="leading-snug">
                    {log.startsWith('$') ? (
                      <span className="text-cyan-400 font-bold">{log}</span>
                    ) : log.startsWith('[CLOSED-LOOP]') ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : log.startsWith('[RasQ-NPU]') ? (
                      <span className="text-teal-300">{log}</span>
                    ) : (
                      <span className="text-neutral-400">{log}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Pip Install Card */}
            <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5">
              <div className="text-xs font-mono text-neutral-400 mb-2">QUICKSTART PACKAGE INSTALL</div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 font-mono text-xs text-cyan-300 flex items-center justify-between">
                <span>pip install rasq-sdk</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("pip install rasq-sdk");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-1 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Works with standard Termux or Android NDK</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Pre-compiled OpenCV and TFLite binaries</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
