import express from "express";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";
const app = express();
const PORT = 4000  || process.env.PORT ;

app.use(express.json());
app.use(cors());

app.post("/api/plag", async (req, res) => {
  const { text } = req.body;

  const data = new FormData();
  data.append("text", text);
  const options = {
    method: "POST",
    url: "https://plagiarism-source-checker-with-links.p.rapidapi.com/data",
    headers: {
      'x-rapidapi-key': '6465dd854fmsh045123ea0fe383cp171999jsn5385b234c4a0',
      'x-rapidapi-host': 'plagiarism-source-checker-with-links.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data,
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Plagiarism check failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
