import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useGetAllEventsQuery } from "../../redux/features/events/eventApi";

const Events = () => {
  const { data: eventData, isLoading } = useGetAllEventsQuery({});

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {eventData?.events.length !== 0 && (
              <EventCard data={eventData && eventData.events[0]} />
            )}
            <h4>{eventData?.events?.length === 0 && "No Events have!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
