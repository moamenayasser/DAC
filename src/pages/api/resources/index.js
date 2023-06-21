// External Imports
import { createRouter } from "next-connect";
// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(process.cwd(), "public", "resourses", "data.json");

const router = createRouter();

router
  .get(async (req, res) => {
    // try {
    //   const apiData = fs.readFileSync(filePath, "utf-8");

    //   res.send(apiData);
    // } catch (error) {
    //   throw error;
    // }

   
    const apiRes = await fetch(
      `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Retrieve`,
      { headers: { Authorization: process.env.AUTHORIZATION } }
    );

    if (apiRes.status !== 200) throw "Error from fetch resources api";

    const apiData = await apiRes.json();

    res.send(apiData);
  })
  .post(async (req, res) => {
    const key = req?.body;

    if (key) {
      const newResourceRes = await fetch(
        `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Resources/${process.env.COUNTRY_CODE}/Insert?Resource=${key}`,
        {
          method: "POST",
          headers: { Authorization: process.env.AUTHORIZATION },
        }
      );

      const newResourceData = await newResourceRes.json();

      res.send(newResourceData);
    } else {
      res.send("Please, Insert Key");
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
