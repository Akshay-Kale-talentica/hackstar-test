import { projectTemplate, technologyTemplate } from 'services/langchain/ProjectTemplate';
import { LLMChain, OpenAI, PromptTemplate } from 'langchain';
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";

const llm = new OpenAI({ concurrency: 10, temperature: 0.2, modelName: "gpt-3.5-turbo" });
const parser = new CommaSeparatedListOutputParser();

export const projectMatcher = async ({ description, techs}: { description: string, techs : string[]}) => {
  const promptTemplate = new PromptTemplate({
    template: technologyTemplate,
    inputVariables: ["description", "techs"],
  });
  const chain = new LLMChain({
    prompt: promptTemplate,
    llm
  })

  try {
    const result = await chain.call({
      prompt: promptTemplate,
      description,
      techs
    })

    console.log(result)

    return result.text;
  } catch (e) {
    console.log(e)
  }
}