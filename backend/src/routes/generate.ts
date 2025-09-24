import express from 'express'
import { z } from 'zod'
import { generateContent } from '../services/aiService'

const router = express.Router()

const generateSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  contentType: z.enum(['article', 'blog', 'marketing']),
  tone: z.string().optional().default('professional'),
  length: z.string().optional().default('medium')
})

router.post('/', async (req, res) => {
  try {
    const validatedData = generateSchema.parse(req.body)
    
    const content = await generateContent(validatedData)
    
    res.json({ 
      success: true, 
      content,
      metadata: {
        contentType: validatedData.contentType,
        tone: validatedData.tone,
        length: validatedData.length,
        generatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Generation error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate content'
    })
  }
})

export { router as generateRouter }