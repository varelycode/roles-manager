// import express from "express";
import express from "express";
import fetch from "node-fetch";

type appAccess = {
  accessToken: string;
  expiration: number;
  type: string;
};

const run = async (): Promise<appAccess | Error> => {
  var client_id = "client_id=" + process.env.CLIENT_ID;

  var client_secret = "client_secret=" + process.env.CLIENT_SECRET;

  console.log(client_id, client_secret);
  var grant_type = "grant_type=client_credentials";

  const base_url = "https://id.twitch.tv/oauth2/token?";

  const url = base_url + client_id + "&" + client_secret + "&" + grant_type;

  const requestOptions = {
    method: "POST",
    redirectTo: "follow",
    headers: {
      Accept: "applicatxion/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  const res: appAccess = {
    accessToken: response["access_token"],
    expiration: response["expires_in"],
    type: response["token_type"],
  };
  console.log(res);
  return res;
};

const handleResponse = async (
  response: appAccess
): Promise<appAccess | Error> => {
  const requestOptions = {
    method: "GET",
    headers: {
      "client-id": process.env.CLIENT_ID ?? "",
      Authorization: "Bearer " + response.accessToken,
    },
  };

  const url = "https://api.twitch.tv/helix/search/channels?query=hasanbi";

  const res = await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("errror", error));

  console.log("res", res);
  return res;
};

const result = run()
  .catch((error: any) => error)
  .then((response: appAccess) =>
    console.log("Please work", handleResponse(response))
  );

export default { run };
