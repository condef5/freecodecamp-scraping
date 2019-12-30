import React from "react";
import Head from "next/head";

function Meta() {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="FreeCodeCamp group Tingo María." />
      <meta name="keywords" content="freecodecamp points group condef5" />
      <meta name="robots" content="index" />
      {/* OpenGraph metadata */}
      <meta property="og:locale" content="es_LA" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="FreeCodeCamp Survivor" />
      <meta
        property="og:description"
        content="This site was created for motivate the study group of freecodecamp(Tingo María)"
      />
      <meta property="og:site_name" content="FreeCodeCamp Survivor" />
      <meta property="og:image" content="https://i.imgur.com/YZ9Ja85.jpg" />
      <title>FreeCodeCamp Survivor</title>
      <link rel="icon" href="/favicon.png" />
      <link
        href="https://fonts.googleapis.com/css?family=Inconsolata"
        rel="stylesheet"
      />
    </Head>
  );
}

export default Meta;
