import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
  const { locale } = req.query;

  const apiRes = await fetch(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/projects/${locale}/Category`,
    { headers: { Authorization: process.env.AUTHORIZATION } }
  );

  if (apiRes.status !== 200) throw "Error from fetch resources api";

  const apiData = await apiRes.json();
  res.send(apiData);
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
