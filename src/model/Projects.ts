import { projectModelData } from "@/modules/projects/project.scema";

export interface ProjectResponse extends projectModelData{
  id: string
  createdAt: string
  updatedAt: string
  studentId: string
}