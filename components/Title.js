import React from "react";
import Head from "next/head";

const Title = ({title}) => {
  return (
      <Head>
        <title>{title} | Be Wallet</title>
      </Head>
  )
}
export default Title