import Grid from "../components/Grid";
import CustomCard from "../components/CustomCard";

function RemindersPage() {
  return (
    <div class="grid grid-cols-3 gap-8">
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-success"
      />
      <CustomCard
        title="Recommended 2"
        description="This is a recommended item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Recommended 2"
        description="This is a recommended item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Recommended 2"
        description="This is a recommended item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Recommended 2"
        description="This is a recommended item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
      <CustomCard
        title="Recommended 2"
        description="This is a recommended item"
        channel="Channel 2"
        airing_in="3 days"
        color="bg-success"
      />
    </div>
  );
}

export default RemindersPage;