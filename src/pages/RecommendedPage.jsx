import Grid from "../components/Grid";
import CustomCard from "../components/CustomCard";


function RecommendedPage() {
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
      <CustomCard
        title="Recommended 1"
        description="This is a recommended item"
        channel="Channel 1"
        airing_in="2 days"
        color="bg-info"
      />
    </div>
  );
}

export default RecommendedPage;
