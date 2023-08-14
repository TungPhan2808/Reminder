const { ChatOpenAI } = require("langchain/chat_models/openai");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");
const {
  StructuredOutputParser,
  OutputFixingParser,
} = require("langchain/output_parsers");
const { z } = require("zod");

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      todo: z.string().describe(
        `Please provide a clear and concise description of the user's task based on the extracted information from the input.
        The task should represent an action to be performed by the user, from the user's perspective. 
        For example: 
        - "Remind me to do homework" would be "Do homework"
        - "Wake me up" would be "Wake up"
        If you believe the text can be further improved for brevity and clarity, please make the necessary revisions.`
      ),
      time: z.string().describe(
        `The time of the task, which is extracted from the input.
          The time should be in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'.
          If there is no date mention, the date should be the current day.
          Moreover, if current time is greater than the record time, it should be tomorrow.`
      ),
    })
  )
);

const chatModel = new ChatOpenAI({
  temperature: 0, // For best results with the output fixing parser,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const outputFixingParser = OutputFixingParser.fromLLM(chatModel, parser);

const textTemplate = `You are an assistant AI who helps people create their tasks based on their input.
Your mission is to extract a list of tasks and their corresponding time to remind them to finish the tasks. The output should be a JSON ARRAY, without any other contexts.
The user's input is delimited by the quotes.

GIVEN THE CURRENT DATE AND TIME IS: ${new Date().toISOString()}

{format_instruction}

REMEMBER 1: The output should be a JSON Array.
REMEMBER 2: If the input is blank, you should return an empty array.

INPUT: "{input}"`;

const prompTemplate = new PromptTemplate({
  template: textTemplate,
  inputVariables: ["input"],
  partialVariables: {
    format_instruction: outputFixingParser.getFormatInstructions(),
  },
});

const chat = new ChatOpenAI({
  openAIApiKey: "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",
});

const chain = new LLMChain({
  llm: chat,
  prompt: prompTemplate,
  outputParser: outputFixingParser,
});

const textToTask = async (input) => {
  return resp = await chain.call({
    input: input,
  });
};

module.exports = textToTask
