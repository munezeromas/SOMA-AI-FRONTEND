import { createFileRoute } from "@tanstack/react-router";
import { TeacherLayout } from "@/components/soma/TeacherLayout";

export const Route = createFileRoute("/teacher")({
  component: TeacherLayout,
});
