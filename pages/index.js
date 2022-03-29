import React from "react";
import { Fragment, useEffect, useState } from "react/cjs/react.production.min";
import Link from "next/link";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title> React ceva</title>
        <meta name ="descriere" content="ceva tara faina "></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data
  //this function work only in index.js
  const client = await MongoClient.connect(
    "mongodb+srv://leobej:1234567890@cluster0.aphvl.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req=context.req;
//   const res=context.res;
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export default HomePage;
