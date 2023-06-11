import { createRouter } from "next-connect";
const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "public", "resourses", "data.json");

const router = createRouter();

router.get(async (req, res) => {
  try {
    const apiRes = await fetch(
      `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Retrieve`,
      { headers: { Authorization: process.env.AUTHORIZATION } }
    );

    if (apiRes.status !== 200) throw "Error from revalidate resources api";

    const apiData = await apiRes.json();

    fs.writeFileSync(filePath, JSON.stringify(apiData));

    res.send({ revalidate: "success" });
  } catch (error) {
    throw error;
  }
});

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke! ", err);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
