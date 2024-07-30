"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { getUserData, User } from "@/actions/auth/user.action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Customer, getAllCustomers } from "@/actions/cfo/customer.action";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { addProject } from "@/actions/cfo/project.action";

const formSchema = z.object({
  projectName: z.string({
    message: "Project Name is Required!",
  }),
  projectCode: z.string({
    message: "Project Code is Required!",
  }),
  customerId: z.string({
    message: "Customer is Required!",
  }),
  billingMethod: z.string({
    message: "Billing Method is Required!",
  }),
  description: z.string({
    message: "description is Required!",
  }),
  users: z.array(
    z.object({
      userName: z.string(),
      userEmail: z.string(),
    })
  ),
  tasks: z.array(
    z.object({
      taskName: z.string(),
      taskDescription: z.string(),
    })
  ),
});

export const AddProjectForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectCode: "",
      customerId: "",
      billingMethod: "",
      description: "",
      users: [
        {
          userName: "",
          userEmail: "",
        },
      ],
      tasks: [
        {
          taskName: "",
          taskDescription: "",
        },
      ],
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        toast({
          description: "Failed to fetch user data.",
        });
      }
    }
    fetchUserData();
  }, [toast]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const userData = await getUserData();
      if ("error" in userData) {
        toast({
          description: userData.error,
        });
      } else {
        setUser(userData);

        const fetchedCustomers = await getAllCustomers(userData.id);
        if ("error" in fetchedCustomers) {
          toast({
            description: fetchedCustomers.error,
          });
        } else {
          setCustomers(fetchedCustomers);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast({
        description: "Failed to fetch data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const {
    fields: userFields,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const addUserRow = () => {
    appendUser({
      userName: "",
      userEmail: "",
    });
  };

  const addProjectRow = () => {
    appendProject({
      taskName: "",
      taskDescription: "",
    });
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        description: "You need to be logged in to create a project.",
      });
      return;
    }
  
    try {
      const projectData = {
        ...values,
        userId: user.id,
        customerId: parseInt(values.customerId),
      };
  
      const response = await addProject(projectData);
      if ('error' in response) {
        throw new Error(response.error);
      }
  
      toast({
        description: "Project added successfully!",
      });
      form.reset();
      setIsDialogOpen(false);
      router.push("/projects");
    } catch (error) {
      console.error("Failed to add project:", error);
      toast({
        description: error instanceof Error ? error.message : "Failed to add project.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    toast({
      description: "Changes have been discarded.",
    });
    router.push("/items");
  };

  return (
    <Form {...form}>
      <form
        className="w-auto flex flex-col gap-5 pb-[150px]"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem className="md:flex md:items-center">
              <FormLabel className="md:w-60 md:text-lg font-light flex items-center gap-2">
                Project Name
              </FormLabel>
              <FormControl>
                <Input className="md:w-[400px]" required {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectCode"
          render={({ field }) => (
            <FormItem className="md:flex md:items-center">
              <FormLabel className="md:w-60 md:text-lg font-light flex items-center gap-2">
                Project Code
              </FormLabel>
              <FormControl>
                <Input className="md:w-[400px]" required {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem className="md:flex md:items-center">
              <FormLabel className="md:w-60 md:text-lg font-light">
                Customer Name
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="md:w-[400px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={String(customer.id)}>
                      {customer.firstName} {customer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingMethod"
          render={({ field }) => (
            <FormItem className="md:flex md:items-center">
              <FormLabel className="md:w-60 md:text-lg font-light flex items-center gap-2">
                Billing Method
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="md:w-[400px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a billing method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Fixed Cost for Project">
                    Fixed Cost for Project
                  </SelectItem>
                  <SelectItem value="Based on Project Hours">
                    Based on Project Hours
                  </SelectItem>
                  <SelectItem value="Based on Task Hours">
                    Based on Task Hours
                  </SelectItem>
                  <SelectItem value="Based on Staff Hours">
                    Based on Staff Hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:flex md:items-center">
              <FormLabel className="md:w-60 md:text-lg font-light">
                Description
              </FormLabel>
              <FormControl>
                <Textarea required {...field} className="md:w-[400px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <h1 className="mt-5 text-[23px]">Users</h1>
        <Table className="md:w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">S.No</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`users.${index}.userName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="border-none " required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`users.${index}.userEmail`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="border-none " required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeUser(index)}
                  >
                    <Trash2 color="#ff0000" className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          type="button"
          variant="ghost"
          onClick={addUserRow}
          className=" w-[120px]"
        >
          <CirclePlus className="h-5 w-5 mr-3" /> Add User
        </Button>
        <div className="md:w-[1000px]">
          <Separator />
        </div>
        <h1 className="mt-5 text-[23px]">Project Tasks</h1>
        <Table className="md:w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">S.No</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Task Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`tasks.${index}.taskName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="border-none " required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`tasks.${index}.taskDescription`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="border-none min-h-5"
                            required
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 color="#ff0000" className="h-4 w-4" /> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          type="button"
          variant="ghost"
          onClick={addProjectRow}
          className=" w-[170px]"
        >
          <CirclePlus className="h-5 w-5 mr-3" /> Add Project Task
        </Button>
        <footer className="fixed bottom-0 w-full flex py-5 space-x-4">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="default"
                className="w-[150px]"
                onClick={() => setIsDialogOpen(true)}
              >
                Save
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to save these changes?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-[150px]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-[150px]"
                  onClick={form.handleSubmit(handleSubmit)}
                >
                  Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel? Unsaved changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel}>
                  Discard
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </footer>
      </form>
    </Form>
  );
};
