import { useRouter } from "next/router";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  // const events = getAllEvents();

  const { events } = props;
  function findEventsHandler(year, month) {
    console.log(year, month);
    const fullPath = `/events/${year}/${month}`;
    // console.log(fullPath);
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>NextJS All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that help you evolve'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
