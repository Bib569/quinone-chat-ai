import { useState, useRef, useEffect, FormEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Send, Atom, Trash2, ChevronDown, ChevronUp, Loader2, Home, BookOpen } from 'lucide-react'
import MethodsLibrary from './components/MethodsLibrary'
import ExportMenu from './components/ExportMenu'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  moleculeSmiles?: string
}

const SMILES_REGEX = /(?:^|\s)([A-Z][A-Za-z0-9@+\-\[\]\(\)\\\/=#$.%]*(?:[0-9]|[\]\)])){3,}(?:\s|$)/g
const SIMPLE_SMILES = /^[A-Za-z0-9@+\-\[\]\(\)\\\/=#$.%]+$/

const EXAMPLE_QUERIES = [
  { text: "What is the HOMO-LUMO gap of 1,4-benzoquinone?", icon: "🔬" },
  { text: "Analyze the molecule with SMILES: O=C1C=CC(=O)C=C1", icon: "🧪" },
  { text: "Compare benzoquinone and anthraquinone electronic properties", icon: "📊" },
  { text: "Explain DFT B3LYP/6-31G* level of theory", icon: "📖" },
  { text: "What substituents decrease the HOMO-LUMO gap in quinones?", icon: "⚗️" },
  { text: "Predict properties of this molecule: O=C1c2ccccc2C(=O)c2ccccc21", icon: "🎯" },
]

function extractSmiles(text: string): string | null {
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (SIMPLE_SMILES.test(trimmed) && trimmed.length > 5 && /[=\(\)\[\]]/.test(trimmed)) {
      return trimmed
    }
  }
  const match = text.match(/SMILES[:\s]+([A-Za-z0-9@+\-\[\]\(\)\\\/=#$.%]+)/i)
  if (match) return match[1]
  return null
}

function MoleculeImage({ smiles }: { smiles: string }) {
  const [error, setError] = useState(false)
  if (error) return null
  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/PNG?record_type=2d&image_size=300x300`
  return (
    <div className="my-3 inline-block bg-white rounded-xl p-3 shadow-lg">
      <img
        src={url}
        alt={`2D structure of ${smiles}`}
        className="max-w-[280px] max-h-[280px]"
        onError={() => setError(true)}
      />
      <p className="text-xs text-gray-500 mt-1 font-mono text-center truncate max-w-[280px]">{smiles}</p>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="typing-dot w-2 h-2 bg-quantum-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-quantum-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-quantum-400 rounded-full" />
    </div>
  )
}

function ThinkingBlock({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false)
  if (!content) return null
  return (
    <div className="mb-3 border border-purple-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 transition-colors text-sm text-purple-300"
      >
        <span className="font-medium">Reasoning</span>
        <span className="ml-auto">{expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>
      {expanded && (
        <div className="px-3 py-2 text-sm text-gray-400 bg-gray-900/50 max-h-60 overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const detectedSmiles = !isUser ? extractSmiles(message.content) : null

  return (
    <div className={`animate-fade-in flex gap-3 px-4 py-4 ${isUser ? 'bg-gray-900/30' : 'bg-gray-950'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-quantum-600' : 'bg-emerald-600'}`}>
        {isUser ? <span className="text-sm">You</span> : <Atom size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 mb-1 font-medium">
          {isUser ? 'You' : 'QuantumChat'}
        </div>
        {message.thinking && <ThinkingBlock content={message.thinking} />}
        <div className="markdown-content text-gray-200 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
        {(detectedSmiles || message.moleculeSmiles) && (
          <MoleculeImage smiles={(message.moleculeSmiles || detectedSmiles)!} />
        )}
        {!isUser && (
          <div className="flex justify-end mt-2">
            <ExportMenu
              title="QuantumChat Response"
              markdownContent={message.content}
              baseFilename={`quantumchat_${message.id}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    }

    const smilesInInput = extractSmiles(content)
    if (smilesInInput) {
      userMessage.moleculeSmiles = smilesInInput
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const chatMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errMsg = data?.error?.message || data?.error || `API error: ${response.status}`
        throw new Error(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg))
      }

      let assistantContent = ''
      let thinkingContent = ''

      if (data.choices && data.choices[0]) {
        const choice = data.choices[0]
        assistantContent = choice.message?.content || 'I apologize, I could not generate a response.'

        if (choice.message?.reasoning_content) {
          thinkingContent = choice.message.reasoning_content
        }
        if (choice.message?.reasoning) {
          thinkingContent = choice.message.reasoning
        }
      } else if (data.error) {
        assistantContent = `Error: ${data.error.message || 'Unknown error occurred'}`
      } else {
        assistantContent = 'Unexpected response format. Please try again.'
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        thinking: thinkingContent || undefined,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const raw = error instanceof Error ? error.message : 'Unknown error'
      const is502 = raw.includes('502') || raw.toLowerCase().includes('overloaded') || raw.toLowerCase().includes('non-json')
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: is502
          ? `⚠️ **The OpenRouter free router is temporarily overloaded (502).** This is a known intermittent issue with free-tier routing — it usually resolves within seconds.\n\n**What to do:** Simply send your message again. The server already retried 3 times automatically. If errors persist, wait 30–60 seconds and try once more.`
          : `Sorry, I encountered an error: ${raw}. Please check that the API is configured correctly and try again.`,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-quantum-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-quantum-500/20">
              <Atom size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">QuantumChat</h1>
              <p className="text-xs text-gray-400">AI Quantum Chemistry Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Home Button */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); clearChat(); }}
              className="p-2 rounded-lg text-gray-400 hover:text-quantum-400 hover:bg-gray-800 transition-colors"
              title="Home"
            >
              <Home size={16} />
            </a>

            {/* Methods Library */}
            <button
              onClick={() => setShowLibrary(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-quantum-400 hover:bg-gray-800 transition-colors"
              title="QC Methods Library"
            >
              <BookOpen size={16} />
            </button>

            {/* Clear Chat */}
            <button
              onClick={clearChat}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="px-4 py-12">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-quantum-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-quantum-500/20">
                  <Atom size={36} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to QuantumChat</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Your AI-powered quantum chemistry assistant. Ask about molecular properties,
                  HOMO-LUMO gaps, DFT calculations, and quinone derivatives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {EXAMPLE_QUERIES.map((query, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(query.text)}
                    className="text-left p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 hover:border-quantum-600/50 transition-all group"
                  >
                    <span className="text-lg mb-2 block">{query.icon}</span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {query.text}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-xs text-gray-500">
                  Powered by OpenRouter Free Router | DFT B3LYP/6-31G* quinone dataset (25 molecules)
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <div className="flex gap-3 px-4 py-4 bg-gray-950">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-600">
                    <Atom size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1 font-medium">QuantumChat</div>
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about molecules, HOMO-LUMO gaps, or enter a SMILES string..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-quantum-500/50 focus:border-quantum-500/50 transition-all text-sm leading-relaxed"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                }}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 bg-quantum-600 hover:bg-quantum-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl transition-all shadow-lg shadow-quantum-600/20 disabled:shadow-none"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-600">
              Press Enter to send, Shift+Enter for new line
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-quantum-500" />
              OpenRouter Free Router
            </div>
          </div>
        </form>
      </footer>

      {showLibrary && <MethodsLibrary onClose={() => setShowLibrary(false)} />}
    </div>
  )
}
