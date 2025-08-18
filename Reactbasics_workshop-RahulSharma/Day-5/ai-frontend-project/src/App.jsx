import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import AIInputField from './components/AIInputField'
import ImageCaptionGenerator from './components/ImageCaptionGenerator'
import EnhancedFeatures from './components/EnhancedFeatures'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Frontend - LLMs & Generative Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore the power of AI in frontend development with intelligent input fields and generative components
          </p>
        </header>

        <Tabs defaultValue="ai-input" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-input">AI-Powered Input Field</TabsTrigger>
            <TabsTrigger value="image-caption">Image Caption Generator</TabsTrigger>
            <TabsTrigger value="enhanced-features">Enhanced Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-input" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Content Assistant</CardTitle>
                <CardDescription>
                  An AI-powered input field that provides real-time suggestions, auto-completion, 
                  and grammar corrections as you type.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIInputField />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="image-caption" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Image Caption Generator</CardTitle>
                <CardDescription>
                  Upload an image and let AI generate descriptive captions with customizable options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageCaptionGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enhanced-features" className="mt-6">
            <EnhancedFeatures />
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Built with React, Tailwind CSS, and AI-powered components</p>
        </footer>
      </div>
    </div>
  )
}

export default App

