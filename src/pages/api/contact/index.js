// External Imports
import { createRouter } from "next-connect";

const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

router.post(async (req, res) => {
  const buf = await buffer(req);
  const rawBody = buf;

  try {
    const contactRes = await fetch(
      `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ContactUs/${process.env.COUNTRY_CODE}`,
      {
        method: "POST",
        body: rawBody,
        headers: {
          "Content-Type": req.headers["content-type"],
          Authorization: process.env.AUTHORIZATION,
        },
      }
    );
    if (contactRes.status !== 200)
      throw new Error(`Invalid response: ${contactRes.status}`);

    const data = await contactRes.json();

    res.send(data);
  } catch (error) {
    throw error;
  }
});

router.get(async (req, res) => {
  const { locale } = req.query;

  const apiRes = await fetch(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/ContactInformation/${locale}`,
    { headers: { Authorization: process.env.AUTHORIZATION } }
  );

  if (apiRes.status !== 200) throw "Error from fetch resources api";

  const apiData = await apiRes.json();

  res.send(apiData);
})


// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
