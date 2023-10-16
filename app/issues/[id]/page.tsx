import { IssueStatusBadge } from "@/app/components/IssueStatusBadge";
import db from "@/lib/db";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await db.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
