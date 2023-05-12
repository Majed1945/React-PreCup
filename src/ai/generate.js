import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const prompt =
  "Koala swimming in alkhobar sea while eating banana on sunny day wearing sunglasses on";

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});

const url = result.data.data[0].url;
console.log(url);
// Save Image URL to Disk

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./Assets/${Date.now()}.png`, buffer);
