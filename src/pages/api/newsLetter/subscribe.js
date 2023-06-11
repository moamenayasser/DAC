// External Imports
import { createRouter } from "next-connect";

const router = createRouter();

router.post(async (req, res) => {
  const { email, locale } = req?.query;

  if (!email || !locale) throw new Error("REquire Email & Locle");

  const subscribeRes = await fetch(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/NewsLetter/${process.env.COUNTRY_CODE}/${locale}/Subscribe?email=${email}`,
    {
      method: "POST",
      headers: { Authorization: process.env.AUTHORIZATION },
    }
  );

  if (subscribeRes.status === 400) {
    res.send({ error: true, message: "Email Already Exist" });
  } else if (subscribeRes.status === 200) {
    const subscribeData = await subscribeRes.json();

    res.send(subscribeData);
  } else {
    throw "Error from newsletter subscribe api";
  }
});

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
