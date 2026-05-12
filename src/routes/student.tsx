import { createFileRoute } from "@tanstack/react-router";
import { StudentLayout } from "@/components/soma/StudentLayout";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});