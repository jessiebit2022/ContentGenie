'use client'

import { useState } from 'react'
import { PlusIcon, DocumentTextIcon, NewspaperIcon, MegaphoneIcon } from '@heroicons/react/24/outline'
import ContentGenerator from './components/ContentGenerator'

const contentTypes = [
  { id: 'article', name: 'Article', icon: DocumentTextIcon, description: 'Long-form informative content' },
  { id: 'blog', name: 'Blog Post', icon: NewspaperIcon, description: 'Engaging blog content' },
  { id: 'marketing', name: 'Marketing Copy', icon: MegaphoneIcon, description: 'Persuasive marketing content' },
]

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create amazing articles, blog posts, and marketing copy with the power of AI
          </p>
        </div>

        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
              >
                <type.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedType(null)}
              className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to content types
            </button>
            <ContentGenerator 
              contentType={selectedType}
              typeName={contentTypes.find(t => t.id === selectedType)?.name || ''}
            />
          </div>
        )}
      </div>
    </div>
  )
}