import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Upload, Image as ImageIcon, Wand2, Copy, Download, Loader2, CheckCircle } from 'lucide-react'

const ImageCaptionGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [captions, setCaptions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [captionLength, setCaptionLength] = useState('medium')
  const [captionStyle, setCaptionStyle] = useState('descriptive')
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const fileInputRef = useRef(null)

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '1-2 sentences' },
    { value: 'medium', label: 'Medium', description: '3-4 sentences' },
    { value: 'long', label: 'Long', description: '5+ sentences' }
  ]

  const styleOptions = [
    { value: 'descriptive', label: 'Descriptive', description: 'Detailed visual description' },
    { value: 'creative', label: 'Creative', description: 'Artistic and imaginative' },
    { value: 'technical', label: 'Technical', description: 'Precise and analytical' },
    { value: 'accessibility', label: 'Accessibility', description: 'Alt-text optimized' }
  ]

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      
      // Clear previous captions
      setCaptions([])
    }
  }

  const generateCaptions = async () => {
    if (!selectedImage) return

    setIsGenerating(true)
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock caption generation based on settings
    const mockCaptions = [
      {
        id: 1,
        text: captionLength === 'short' 
          ? "A beautiful landscape with mountains in the background."
          : captionLength === 'medium'
          ? "A stunning landscape photograph featuring rolling hills and majestic mountains in the distance. The scene is bathed in golden sunlight, creating a serene and peaceful atmosphere."
          : "A breathtaking landscape photograph showcasing the natural beauty of rolling hills that stretch toward towering mountains in the distance. The golden hour lighting casts warm hues across the terrain, while wispy clouds drift lazily across the azure sky. The composition draws the viewer's eye from the foreground vegetation through the undulating hills to the dramatic mountain peaks, creating a sense of depth and grandeur that speaks to the majesty of the natural world.",
        confidence: 0.92,
        keywords: ['landscape', 'mountains', 'nature', 'scenic']
      },
      {
        id: 2,
        text: captionStyle === 'creative'
          ? "Nature's canvas painted with golden brushstrokes, where earth meets sky in perfect harmony."
          : captionStyle === 'technical'
          ? "Landscape composition utilizing rule of thirds, captured during golden hour with optimal lighting conditions."
          : captionStyle === 'accessibility'
          ? "Landscape image showing mountains and hills under natural lighting, suitable for nature enthusiasts."
          : "A picturesque view of natural terrain with mountainous backdrop and varied topography.",
        confidence: 0.88,
        keywords: ['scenic', 'outdoor', 'photography', 'vista']
      },
      {
        id: 3,
        text: selectedLanguage === 'spanish'
          ? "Un hermoso paisaje con montañas y colinas bajo la luz dorada del atardecer."
          : selectedLanguage === 'french'
          ? "Un magnifique paysage avec des montagnes et des collines sous la lumière dorée du coucher de soleil."
          : selectedLanguage === 'german'
          ? "Eine wunderschöne Landschaft mit Bergen und Hügeln im goldenen Licht des Sonnenuntergangs."
          : "An expansive natural landscape featuring diverse geological formations and atmospheric lighting.",
        confidence: 0.85,
        keywords: ['terrain', 'geology', 'atmosphere', 'natural']
      }
    ]

    setCaptions(mockCaptions)
    setIsGenerating(false)
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadCaption = (caption, index) => {
    const element = document.createElement('a')
    const file = new Blob([caption.text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `caption_${index + 1}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50'
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-4">
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          data-testid="image-upload-area"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            data-testid="image-input"
          />
          
          {imagePreview ? (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Upload an image
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to select or drag and drop
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Options */}
      {selectedImage && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Caption Length */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Caption Length
            </label>
            <div className="space-y-1">
              {lengthOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 border rounded cursor-pointer transition-colors ${
                    captionLength === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setCaptionLength(option.value)}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Caption Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Caption Style
            </label>
            <div className="space-y-1">
              {styleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 border rounded cursor-pointer transition-colors ${
                    captionStyle === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setCaptionStyle(option.value)}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </label>
            <div className="space-y-1">
              {languageOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 border rounded cursor-pointer transition-colors ${
                    selectedLanguage === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedLanguage(option.value)}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {selectedImage && (
        <Button
          onClick={generateCaptions}
          disabled={isGenerating}
          className="w-full"
          data-testid="generate-captions-btn"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Captions...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Captions
            </>
          )}
        </Button>
      )}

      {/* Generated Captions */}
      {captions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Generated Captions
          </h3>
          
          <div className="space-y-3">
            {captions.map((caption, index) => (
              <Card key={caption.id} data-testid={`caption-${index}`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                      {caption.text}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getConfidenceColor(caption.confidence)}>
                          {Math.round(caption.confidence * 100)}% confidence
                        </Badge>
                        <div className="flex gap-1">
                          {caption.keywords.map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(caption.text, index)}
                          data-testid={`copy-btn-${index}`}
                        >
                          {copiedIndex === index ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadCaption(caption, index)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageCaptionGenerator

