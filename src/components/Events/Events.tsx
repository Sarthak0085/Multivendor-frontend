import styles from "../../styles/styles";
import { IEvent } from "../../types/event";
import EventCard from "./EventCard";

const Events = ({ eventData }: { eventData: IEvent[] }) => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className="w-full grid">
          {eventData?.length !== 0 && (
            <EventCard data={eventData && eventData[0]} />
          )}
          <h4>{eventData?.length === 0 && "No Events have!"}</h4>
        </div>
      </div>
    </div>
  );
};

export default Events;
