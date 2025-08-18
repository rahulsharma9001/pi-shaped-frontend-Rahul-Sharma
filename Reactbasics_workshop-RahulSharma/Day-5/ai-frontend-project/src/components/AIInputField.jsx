import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Lightbulb, Wand2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const AIInputField = () => {
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTone, setSelectedTone] = useState('neutral')
  const [grammarIssues, setGrammarIssues] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef(null)

  const tones = [
    { value: 'neutral', label: 'Neutral', color: 'bg-gray-100' },
    { value: 'formal', label: 'Formal', color: 'bg-blue-100' },
    { value: 'casual', label: 'Casual', color: 'bg-green-100' },
    { value: 'persuasive', label: 'Persuasive', color: 'bg-purple-100' },
    { value: 'creative', label: 'Creative', color: 'bg-pink-100' }
  ]

  // Mock AI service - In a real app, this would call your backend API
  const generateSuggestions = async (inputText, tone) => {
    if (!inputText.trim()) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock suggestions based on input and tone
    const mockSuggestions = [
      {
        id: 1,
        text: `${inputText} Additionally, consider exploring the broader implications of this topic.`,
        type: 'continuation',
        confidence: 0.9
      },
      {
        id: 2,
        text: tone === 'formal' 
          ? `Furthermore, it is important to note that ${inputText.toLowerCase()}`
          : `Also, ${inputText.toLowerCase()}`,
        type: 'enhancement',
        confidence: 0.85
      },
      {
        id: 3,
        text: `To summarize: ${inputText}`,
        type: 'summary',
        confidence: 0.8
      }
    ]

    setSuggestions(mockSuggestions)
    setShowSuggestions(true)
    setIsLoading(false)
  }

  // Mock grammar checking
  const checkGrammar = (inputText) => {
    const issues = []
    
    // Simple mock grammar checks
    if (inputText.includes('there is')) {
      issues.push({
        id: 1,
        text: 'Consider using more specific language instead of "there is"',
        type: 'style',
        position: inputText.indexOf('there is')
      })
    }
    
    if (inputText.includes('very')) {
      issues.push({
        id: 2,
        text: 'Consider using a stronger adjective instead of "very"',
        type: 'enhancement',
        position: inputText.indexOf('very')
      })
    }

    setGrammarIssues(issues)
  }

  // Debounced text processing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (text.length > 10) {
        generateSuggestions(text, selectedTone)
        checkGrammar(text)
      } else {
        setSuggestions([])
        setGrammarIssues([])
        setShowSuggestions(false)
      }
    }, 500)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [text, selectedTone])

  const applySuggestion = (suggestion) => {
    setText(suggestion.text)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600'
    if (confidence >= 0.8) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'continuation': return <Wand2 className="w-4 h-4" />
      case 'enhancement': return <Lightbulb className="w-4 h-4" />
      case 'summary': return <CheckCircle className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Tone Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Writing Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <Badge
              key={tone.value}
              variant={selectedTone === tone.value ? "default" : "secondary"}
              className={`cursor-pointer transition-all ${
                selectedTone === tone.value ? '' : tone.color
              }`}
              onClick={() => setSelectedTone(tone.value)}
            >
              {tone.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Input Area */}
      <div className="relative">
        <Textarea
          placeholder="Start typing your content here... AI will provide suggestions as you write."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] resize-none"
          data-testid="ai-input-field"
        />
        
        {isLoading && (
          <div className="absolute top-2 right-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          </div>
        )}
      </div>

      {/* Grammar Issues */}
      {grammarIssues.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">Writing Suggestions:</p>
              {grammarIssues.map((issue) => (
                <p key={issue.id} className="text-sm">
                  • {issue.text}
                </p>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* AI Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            AI Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-3 border rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => applySuggestion(suggestion)}
                data-testid={`suggestion-${suggestion.id}`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {suggestion.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {suggestion.type}
                      </Badge>
                      <span className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}>
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>Words: {text.split(/\s+/).filter(word => word.length > 0).length}</span>
        <span>Characters: {text.length}</span>
        {suggestions.length > 0 && (
          <span className="text-blue-600 dark:text-blue-400">
            {suggestions.length} suggestions available
          </span>
        )}
      </div>
    </div>
  )
}

export default AIInputField

