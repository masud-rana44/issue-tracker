import db from "@/lib/db";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import { DeleteIssueButton } from "./DeleteIssueButton";
import authOptions from "@/app/api/auth/AuthOptions";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issueId = parseInt(params.id);
  const session = await getServerSession(authOptions);

  if (!issueId) {
    notFound();
  }

  const issue = await db.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issue) {
    notFound(); // Return null to exit the component
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
