import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface GenerateContentParams {
  prompt: string
  contentType: 'article' | 'blog' | 'marketing'
  tone: string
  length: string
}

const getSystemPrompt = (contentType: string, tone: string, length: string) => {
  const lengthMap = {
    short: '200-400 words',
    medium: '400-800 words',
    long: '800+ words'
  }

  const contentTypeMap = {
    article: 'informative article with clear structure, headings, and well-researched content',
    blog: 'engaging blog post with a conversational tone and compelling narrative',
    marketing: 'persuasive marketing copy that drives action and highlights benefits'
  }

  return `You are a professional content writer. Create a ${contentTypeMap[contentType as keyof typeof contentTypeMap]} with a ${tone} tone. The content should be approximately ${lengthMap[length as keyof typeof lengthMap]} long. Make it engaging, well-structured, and valuable to the reader.`
}

export async function generateContent(params: GenerateContentParams): Promise<string> {
  try {
    const systemPrompt = getSystemPrompt(params.contentType, params.tone, params.length)
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: params.prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || 'Failed to generate content'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate content with AI service')
  }
}