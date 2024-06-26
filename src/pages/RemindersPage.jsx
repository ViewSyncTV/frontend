import Grid from "../components/Grid";
import CustomCard from "../components/CustomCard";

function RemindersPage() {
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      <CustomCard
        title="Reminders 1"
        description="This is a reminders item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-success"
      />
      <CustomCard
        title="Reminders 2"
        description="This is a reminders item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Reminders 3"
        description="This is a reminders item"
        channel="Channel 3"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Reminders 4"
        description="This is a reminders item"
        channel="Channel 4"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Reminders 5"
        description="This is a reminders item"
        channel="Channel 5"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Reminders 6"
        description="This is a reminders item"
        channel="Channel 6"
        airing_in="3 days"
        color="bg-success"
      />
    </div>
  );
}

export default RemindersPage;