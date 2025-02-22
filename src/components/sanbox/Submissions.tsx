"use client";

import React from "react";
import { useGetSubmissionsQuery } from "@/slices/rtk-query/apis";
import { Badge, Code, DataList, Flex, IconButton, Skeleton } from "@radix-ui/themes";
import { Copy } from "lucide-react";

function Submissions() {
  const { data: submissions, isLoading, error } = useGetSubmissionsQuery();

  if (isLoading) return (
        <Skeleton width="100%" height="100%">
            Loading...
        </Skeleton>
  );
  if (error) return <p className="text-red-500">Error fetching submissions</p>;
  if (!submissions || submissions.length === 0) return <p className="text-red-500">No submissions found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
      {submissions.map((submission) => (
        <DataList.Root key={submission.id} className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {/* Status */}
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Status</DataList.Label>
            <DataList.Value>
              <Badge color={submission.status === "success" ? "green" : "red"} variant="soft" radius="full">
                {submission.status}
              </Badge>
            </DataList.Value>
          </DataList.Item>

          {/* Submission ID */}
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{submission.id}</Code>
                <IconButton className="cursor-pointer" size="1" aria-label="Copy ID" color="gray" variant="ghost"
                  onClick={() => navigator.clipboard.writeText(submission.id)}
                >
                  <Copy />
                </IconButton>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          {/* Language */}
          <DataList.Item>
            <DataList.Label minWidth="88px">Language</DataList.Label>
            <DataList.Value>{submission.language}</DataList.Value>
          </DataList.Item>

          {/* Created At */}
          <DataList.Item>
            <DataList.Label minWidth="88px">Submitted At</DataList.Label>
            <DataList.Value>{new Date(submission.createdAt).toLocaleString()}</DataList.Value>
          </DataList.Item>
          {/* Code Block */}
          <DataList.Item>
            <DataList.Label minWidth="88px">Code</DataList.Label>
            <DataList.Value>
              <Code className="block bg-gray-200 dark:bg-gray-700 p-2 rounded">
                {submission.code}
              </Code>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      ))}
    </div>
  );
}

export default Submissions;
