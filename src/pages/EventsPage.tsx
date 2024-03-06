import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import { useGetAllEventsQuery } from "../redux/features/events/eventApi";

const EventsPage = () => {
  const { data: eventData, isLoading } = useGetAllEventsQuery({});
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className="pt-8 mr-7">
            <EventCard active={true} data={eventData && eventData?.events[0]} />
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
