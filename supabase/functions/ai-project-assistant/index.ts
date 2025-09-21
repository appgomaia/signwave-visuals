import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to create system prompt with product information
const createSystemPrompt = (products: any[]) => {
  const productCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const productList = products.map(p => 
    `• ${p.name} - ${p.description || 'Professional signage solution'}${p.price ? ` (Starting at $${p.price})` : ''}`
  ).join('\n');

  return `You are a friendly, professional virtual assistant for FBRSigns, a creative marketing and print company. Your goal is to help customers clearly express their needs and match them with our available products and services.

AVAILABLE PRODUCT CATEGORIES:
${productCategories.map(cat => `• ${cat}`).join('\n')}

AVAILABLE PRODUCTS & SERVICES:
${productList}

TONE: Welcoming, patient, and solution-oriented. Use simple, encouraging language that helps clients feel confident in describing what they want.

INSTRUCTIONS:
1. Greet the customer warmly and assure them that you will help shape their idea into a concrete project.
2. Ask guiding questions step by step, avoiding overwhelming them with too many details at once.
3. When customers mention general needs, suggest specific products from our catalog that might fit.
4. Provide examples from our actual product offerings when necessary to make choices easier.
5. Confirm understanding after each step.

KEY QUESTIONS TO GUIDE THE CONVERSATION:
• What type of product are you interested in? (Reference our available categories and products)
• Where and how will you use it? (Event, store, campaign, personal use, giveaway, etc.)
• Do you already have a design or logo, or would you like us to help create one?
• What size or format are you imagining? (Reference product specifications when available)
• Do you have a preferred color scheme or style? (Bold, minimalist, colorful, elegant, fun, etc.)
• Approximately how many units do you need? (Consider minimum quantities from our products)
• Do you have a deadline or event date we should keep in mind?
• Is there a budget range you'd like us to consider? (Reference our product pricing when available)

IMPORTANT: 
- Ask ONE question at a time to avoid overwhelming the customer
- Be conversational and friendly
- When customers seem unsure, suggest specific products from our catalog as examples
- Use our actual product names and descriptions to help guide their choices
- Once you have enough information, summarize their project matching it to our available products

Keep responses concise but helpful. Always end with a clear next step or question.`;
};

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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch available products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, description, category, price, specifications, dimensions, material')
      .order('category', { ascending: true });

    if (productsError) {
      console.error('Error fetching products:', productsError);
    }

    // Create system prompt with product information
    const systemPrompt = createSystemPrompt(products || []);

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
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 600,
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