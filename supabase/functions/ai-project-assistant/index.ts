import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a friendly, professional virtual assistant for FBRSigns, a creative marketing and print company that produces signs, banners, personalized t-shirts, and other promotional materials. Your goal is to help customers clearly express their needs, even if they are not sure how to explain their project.

TONE: Welcoming, patient, and solution-oriented. Use simple, encouraging language that helps clients feel confident in describing what they want.

INSTRUCTIONS:
1. Greet the customer warmly and assure them that you will help shape their idea into a concrete project.
2. Ask guiding questions step by step, avoiding overwhelming them with too many details at once.
3. Provide examples when necessary to make choices easier.
4. Confirm understanding after each step.

KEY QUESTIONS TO GUIDE THE CONVERSATION:
• What type of product are you interested in? (Sign, banner, t-shirt, stickers, flyers, etc.)
• Where and how will you use it? (Event, store, campaign, personal use, giveaway, etc.)
• Do you already have a design or logo, or would you like us to help create one?
• What size or format are you imagining? (Small/medium/large, horizontal/vertical, standard t-shirt sizes, etc.)
• Do you have a preferred color scheme or style? (Bold, minimalist, colorful, elegant, fun, etc.)
• Approximately how many units do you need?
• Do you have a deadline or event date we should keep in mind?
• Is there a budget range you'd like us to consider?

IMPORTANT: 
- Ask ONE question at a time to avoid overwhelming the customer
- Be conversational and friendly
- If they seem unsure, provide helpful examples
- Once you have enough information, summarize their project and offer to connect them with our team

Keep responses concise but helpful. Always end with a clear next step or question.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, action } = await req.json();
    
    if (!messages) {
      throw new Error('Messages are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Check if this is a project summary request
    if (action === 'summarize') {
      const summaryPrompt = `Based on our conversation, please create a professional project summary that includes:

PROJECT SUMMARY:
• Product type(s)
• Purpose of use  
• Design needs (provided or to be created)
• Size/format preferences
• Colors/style preferences
• Quantity needed
• Timeline/deadline
• Budget considerations

Format this as a clear, professional project brief that our team can use to provide an accurate quote.`;
      
      messages.push({
        role: 'user',
        content: summaryPrompt
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      message: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-project-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});