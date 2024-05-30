// Import required modules
const http = require('http');
const { GoogleAIFileManager, FileState } = require("@google/generative-ai/files");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Define port number
const PORT = 8000;
const API_KEY="XXXXXXXXXXXXXXXX-XXXXXXX"
const REACT_SERVER_PORT = 3000;

// Set up the proxy middleware
const proxy = createProxyMiddleware({
    target: `http://localhost:${REACT_SERVER_PORT}`,
    changeOrigin: true,
  });

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(API_KEY);

// Create an async function to use await
async function generateText(filePath) {
  // Upload the file and specify a display name.
  const uploadResult = await fileManager.uploadFile(filePath, {
    mimeType: "video/mp4",
    displayName: "Big Buck Bunny",
  });

  console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

  let file = await fileManager.getFile(uploadResult.file.name);
  while (file.state === FileState.PROCESSING) {
    process.stdout.write(".");
    // Sleep for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    // Fetch the file from the API again
    file = await fileManager.getFile(uploadResult.file.name);
  }

  if (file.state === FileState.FAILED) {
    throw new Error("Video processing failed.");
  }

  console.log(`File ${uploadResult.file.displayName} is ready for inference as ${uploadResult.file.uri}`);

  // Initialize GoogleGenerativeAI with your API_KEY.
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Initialize the generative model with a model that supports multimodal input.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Generate content using text and the URI reference for the uploaded file.
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResult.file.mimeType,
        fileUri: uploadResult.file.uri
      }
    },
    { text: `Classify the expression of the person in below categories: happy, sad, neutral, excited, angry. 
                Output should only be one word and shouldn;t return unexpected values` },
  ]);
  console.log(result);

  const returned_res = result.response.candidates[0].content.parts[0].text;
  // Delete the uploaded file
  await fileManager.deleteFile(uploadResult.file.name);

  console.log("File deleted successfully.");

  return returned_res;  
}

const server = http.createServer(async (req, res) => {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  
    // If the request is to /api, proxy it to the React server
    if (req.url.startsWith('/api')) {
      proxy(req, res);
      return;
    }
  
    // Read the file path from the request
    let filePath = ''; // initialize filePath variable
    req.on('data', (chunk) => {
      filePath += chunk; // accumulate the data in filePath
    });
    req.on('end', async () => {
      // Call the function with the file path and send the response
      try {
        const generatedText = await generateText(filePath);
        res.end(generatedText);
      } catch (error) {
        console.error(error);
        res.end('Error occurred during text generation.');
      }
    });
  });
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });