
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, FolderPlus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Project {
  id: number;
  name: string;
  description: string;
  folder: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Personal Blog",
    description: "A personal blog about technology and design",
    folder: "Personal",
  },
  {
    id: 2,
    name: "E-commerce Site",
    description: "Online store for handmade products",
    folder: "Work",
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "Showcase of my design work",
    folder: "Personal",
  },
  {
    id: 4,
    name: "Client Dashboard",
    description: "Analytics dashboard for client project",
    folder: "Client Projects",
  },
];

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [folders, setFolders] = useState<string[]>(["Personal", "Work", "Client Projects"]);
  const [newFolder, setNewFolder] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    folder: "",
  });

  const filteredProjects = selectedFolder
    ? projects.filter((project) => project.folder === selectedFolder)
    : projects;

  const handleAddFolder = () => {
    if (newFolder && !folders.includes(newFolder)) {
      setFolders([...folders, newFolder]);
      setNewFolder("");
    }
  };

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      folder: newProject.folder,
    };
    
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "", folder: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Management</CardTitle>
        <CardDescription>
          Organize and manage your projects in custom folders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedFolder === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedFolder(null)}
            >
              All Projects
            </Button>
            {folders.map((folder) => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedFolder(folder)}
                className="flex items-center gap-1"
              >
                <Folder className="h-3.5 w-3.5" />
                {folder}
              </Button>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FolderPlus className="h-3.5 w-3.5" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Add a new folder to organize your projects.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="folder-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="folder-name"
                      value={newFolder}
                      onChange={(e) => setNewFolder(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddFolder}>Create Folder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                {selectedFolder ? `${selectedFolder} Projects` : "All Projects"}
              </h4>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3.5 w-3.5 mr-1" /> New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Add a new project to your workspace.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        placeholder="My Awesome Project"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({ ...newProject, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="A brief description of your project"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({ ...newProject, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="folder">Folder</Label>
                      <select
                        id="folder"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newProject.folder}
                        onChange={(e) =>
                          setNewProject({ ...newProject, folder: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Select a folder
                        </option>
                        {folders.map((folder) => (
                          <option key={folder} value={folder}>
                            {folder}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddProject}>Create Project</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 border rounded-md hover:bg-accent/10 cursor-pointer"
                >
                  <div className="flex justify-between">
                    <h5 className="font-medium">{project.name}</h5>
                    <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded">
                      {project.folder}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              ))}
              
              {filteredProjects.length === 0 && (
                <p className="text-center text-muted-foreground col-span-2 py-6">
                  No projects found in this folder. Create a new project to get started.
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectManagement;
