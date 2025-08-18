import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  FileText, 
  Sparkles,
  BarChart3,
  Clock,
  CheckCircle2
} from 'lucide-react'

const EnhancedFeatures = () => {
  const [analysisText, setAnalysisText] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sentimentScore, setSentimentScore] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [keywordDensity, setKeywordDensity] = useState([])

  // Real-time text analysis
  useEffect(() => {
    if (analysisText.length > 50) {
      performTextAnalysis(analysisText)
    } else {
      setAnalysisResults(null)
      setSentimentScore(0)
      setReadabilityScore(0)
      setKeywordDensity([])
    }
  }, [analysisText])

  const performTextAnalysis = async (text) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock sentiment analysis
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing']
    
    const words = text.toLowerCase().split(/\s+/)
    const positiveCount = words.filter(word => positiveWords.includes(word)).length
    const negativeCount = words.filter(word => negativeWords.includes(word)).length
    
    const sentiment = ((positiveCount - negativeCount) / words.length) * 100 + 50
    setSentimentScore(Math.max(0, Math.min(100, sentiment)))
    
    // Mock readability score (based on sentence length and word complexity)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const avgWordsPerSentence = words.length / sentences.length
    const readability = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2))
    setReadabilityScore(readability)
    
    // Mock keyword density
    const wordFreq = {}
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      }
    })
    
    const topKeywords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / words.length) * 100).toFixed(1)
      }))
    
    setKeywordDensity(topKeywords)
    
    setAnalysisResults({
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
      readingTime: Math.ceil(words.length / 200), // 200 words per minute
      complexity: avgWordsPerSentence > 20 ? 'High' : avgWordsPerSentence > 15 ? 'Medium' : 'Low'
    })
    
    setIsAnalyzing(false)
  }

  const getSentimentColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-50'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getReadabilityColor = (score) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Text Analysis",
      description: "Real-time sentiment analysis, readability scoring, and keyword extraction",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Auto-Complete",
      description: "Context-aware suggestions that adapt to your writing style",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Content Optimization",
      description: "SEO-friendly suggestions and content structure recommendations",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "Track engagement potential and content effectiveness",
      color: "bg-orange-50 text-orange-600"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Text Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Advanced Text Analysis
          </CardTitle>
          <CardDescription>
            Get detailed insights about your content including sentiment, readability, and keyword analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Enter text for analysis
            </label>
            <Textarea
              placeholder="Paste or type your content here for comprehensive AI analysis..."
              value={analysisText}
              onChange={(e) => setAnalysisText(e.target.value)}
              className="min-h-[120px]"
              data-testid="analysis-input"
            />
          </div>

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Analyzing content...
            </div>
          )}

          {analysisResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Metrics */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Content Metrics
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Words:</span>
                    <span className="font-medium">{analysisResults.wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sentences:</span>
                    <span className="font-medium">{analysisResults.sentenceCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg words/sentence:</span>
                    <span className="font-medium">{analysisResults.avgWordsPerSentence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Reading time:
                    </span>
                    <span className="font-medium">{analysisResults.readingTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Complexity:</span>
                    <Badge variant={analysisResults.complexity === 'High' ? 'destructive' : 
                                   analysisResults.complexity === 'Medium' ? 'default' : 'secondary'}>
                      {analysisResults.complexity}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Sentiment & Readability */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Quality Scores
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sentiment</span>
                      <Badge className={getSentimentColor(sentimentScore)}>
                        {sentimentScore.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={sentimentScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Readability</span>
                      <span className={`text-sm font-medium ${getReadabilityColor(readabilityScore)}`}>
                        {readabilityScore.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={readabilityScore} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Top Keywords
                </h4>
                <div className="space-y-2">
                  {keywordDensity.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{keyword.word}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{keyword.count}x</span>
                        <Badge variant="outline" className="text-xs">
                          {keyword.density}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Capabilities Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Capabilities Showcase
          </CardTitle>
          <CardDescription>
            Demonstrating advanced AI integration in frontend components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Implemented Features
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time AI-powered text suggestions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Context-aware content generation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Grammar and style checking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Sentiment analysis and scoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Image caption generation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Multi-language support
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                Technical Implementation
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Debounced API calls for performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  React hooks for state management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Comprehensive test coverage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Responsive design with Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Accessible UI components
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Mock AI services for demonstration
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EnhancedFeatures

