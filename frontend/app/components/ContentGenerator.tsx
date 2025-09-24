'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ContentGeneratorProps {
  contentType: string
  typeName: string
}

interface FormData {
  prompt: string
  tone: string
  length: string
}

export default function ContentGenerator({ contentType, typeName }: ContentGeneratorProps) {
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`, {
        ...data,
        contentType
      })
      setGeneratedContent(response.data.content)
      toast.success('Content generated successfully!')
    } catch (error) {
      toast.error('Failed to generate content')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    toast.success('Content copied to clipboard!')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate {typeName}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Prompt
          </label>
          <textarea
            {...register('prompt', { required: 'Prompt is required' })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe what you want to generate..."
          />
          {errors.prompt && (
            <p className="mt-1 text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <select
              {...register('tone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <select
              {...register('length')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="short">Short (200-400 words)</option>
              <option value="medium">Medium (400-800 words)</option>
              <option value="long">Long (800+ words)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : `Generate ${typeName}`}
        </button>
      </form>

      {generatedContent && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
            <button
              onClick={copyToClipboard}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
            >
              Copy
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {generatedContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}