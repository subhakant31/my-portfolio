import { NextApiRequest, NextApiResponse } from "next";

export default async (req, resp) => {
  const token = "7fd972ef29c89a90c27ca8d52ca058";
  // req.body already contains the GraphQL query string from the client
  const graphQlQuery = req.body.query; // Access the 'query' property from the request body

  if (!graphQlQuery) {
    return resp
      .status(400)
      .json({ error: "GraphQL query is missing from the request body." });
  }

  try {
    const response = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: graphQlQuery, // Pass the extracted GraphQL query string
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData);
      return resp.status(response.status).json({
        error: "Failed to fetch data from DatoCMS",
        details: errorData,
      });
    }

    const responseData = await response.json();
    return resp.status(200).json(responseData);
  } catch (error) {
    console.error("Error in fetching the page data:", error);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};
