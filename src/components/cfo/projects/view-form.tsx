"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BriefcaseBusiness, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProject, Project } from "@/actions/cfo/project.action";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: string;
};

export const ViewSpecificProject = ({ id }: Props) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject(id);
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
        toast({
          title: "Error",
          description: "Failed to fetch project. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl w-full">
        {project.projectName}
      </h1>
      <Separator />
      <div className="flex gap-7">
        <div className="w-[600px] bg-primary-foreground flex flex-col gap-4 px-3 py-5">
          <div className="flex justify-center items-center">
            <div>
              <BriefcaseBusiness className="mr-10" />
            </div>
            <div className="w-full">
              <h5 className="font-semibold text-[25px]">
                {project.projectName}
              </h5>
              <span className="font-extralight">{project.description}</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <User className="mr-10" />
            </div>
            <div className="w-full">
              <h5 className="font-semibold text-[25px] text-primary">
                {project.customerName}
              </h5>
            </div>
          </div>
          <Separator />
          <div className="w-full flex flex-col justify-center pl-16">
            <ul>
              <li className="text-foreground">Project Code</li>
              <li className="text-primary mb-5">{project.projectCode}</li>
              <li className="text-foreground">Billing Method</li>
              <li className="text-primary">{project.billingMethod}</li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <h1 className="md:text-[25px]">Users</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.projectUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h1 className="md:text-[25px] mt-11">Project Tasks</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.ProjectTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.taskDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
