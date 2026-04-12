const OpenAI = require("openai");
const db = require("../config/db");
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

exports.analyzeArticle = async (req, res) => {
  try {
   const { articleText, contextMode, articleId } = req.body;
  const prompt = `
Analyze the following news article and return ONLY valid JSON in this exact format:

{
  "summary": "",
  "key_points": [],
  "why_it_matters": "",
  "simplified_version": "",
  "personalized_insight": "",
  "bias_tone": "",
  "relevance_score": "",
  "relevance_reason": ""
}

The user type is: ${contextMode}

Customize the "personalized_insight" section based on the user type.

For "bias_tone", identify whether the article is:
- Neutral
- Slightly Biased
- Opinionated
- Sensational

For "relevance_score", return only:
- High
- Medium
- Low

For "relevance_reason", explain why the article has that score.

Article:
${articleText}
`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

   const result = response.choices[0].message.content;

let parsedResult;

try {
  parsedResult = JSON.parse(result);
} catch (parseError) {
  return res.status(500).send({
    success: false,
    message: "Failed to parse AI response",
  });
}

const sql = `
  INSERT INTO insights (
    article_id,
    summary,
    key_points,
    why_matters,
    exam_notes,
    simplified,
    bias,
    relevance_score
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

db.query(
  sql,
  [
    articleId,
    parsedResult.summary,
    JSON.stringify(parsedResult.key_points),
    parsedResult.why_it_matters,
    parsedResult.personalized_insight,
    parsedResult.simplified_version,
    parsedResult.bias_tone,
    parsedResult.relevance_score
  ],
  (dbError) => {
    if (dbError) {
      console.error("Error saving insight:", dbError);

      return res.status(500).send({
        success: false,
        message: "Analysis generated but failed to save insight",
      });
    }

    res.send({
      success: true,
      analysis: parsedResult,
    });
  }
);
  } catch (error) {
    console.error("AI analysis error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to analyze article",
    });
  }
};