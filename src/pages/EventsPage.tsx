import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { useGetAllEventsQuery } from "../redux/features/events/eventApi";

const EventsPage = () => {
  const { data: eventData, isLoading } = useGetAllEventsQuery({});
  return (
    !isLoading && (
      <div>
        <Header activeHeading={4} />
        <div className="pt-8 mr-7">
          {eventData?.events?.length !== 0 ? (
            <EventCard active={true} data={eventData && eventData?.events[0]} />
          ) : (
            <div className="flex my-20 items-center text-[red] font-bold justify-center">
              No events at the moment! Stay tuned for our upcoming events! We're
              working on bringing you new and exciting experiences.
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default EventsPage;
