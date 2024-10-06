import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from "@/app/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MessageSquareIcon, PlusIcon } from 'lucide-react'

// Mock data for tasks
const mockTasks = [
  { id: 1, title: "Implement user authentication", assignedTo: "John Doe", status: "In Progress", priority: "High", startDate: "2023-06-01", dueDate: "2023-06-15", comments: 3 },
  { id: 2, title: "Design homepage", assignedTo: "Jane Smith", status: "To Do", priority: "Medium", startDate: "2023-06-05", dueDate: "2023-06-20", comments: 1 },
  { id: 3, title: "Optimize database queries", assignedTo: "Bob Johnson", status: "Completed", priority: "Low", startDate: "2023-05-25", dueDate: "2023-06-10", comments: 5 },
]

export default function ProjectTasks() {
  const [tasks, setTasks] = useState(mockTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [filter, setFilter] = useState("all")
  const { project, role } = useSelector((state: RootState) => state.projectDetails)
  const currentUser = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    // Fetch tasks from API in a real application
  }, [])

  const handleTaskClick = (task) => {
    setSelectedTask(task)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    // Implement filtering logic here
  }

  const handleStatusChange = (newStatus) => {
    // Implement status change logic here
  }

  const handleAddComment = (comment) => {
    // Implement add comment logic here
  }

  const handleAddTask = (task) => {
    // Implement add task logic here
  }

  const handleAddSubtask = (subtask) => {
    // Implement add subtask logic here
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Project Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <Select onValueChange={handleFilterChange} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="my">My Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          {role === "teamLead" && (
            <Button onClick={() => handleAddTask({})}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Task
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="cursor-pointer" onClick={() => handleTaskClick(task)}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>
                  <Badge variant={task.status === "Completed" ? "success" : task.status === "In Progress" ? "warning" : "default"}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "warning" : "default"}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                    {task.comments}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedTask && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="hidden">Open Task Details</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>{selectedTask.title}</SheetTitle>
              <SheetDescription>Task Details</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={handleStatusChange} defaultValue={selectedTask.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assigned" className="text-right">
                  Assigned To
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={selectedTask.assignedTo} />
                    <AvatarFallback>{selectedTask.assignedTo[0]}</AvatarFallback>
                  </Avatar>
                  <span>{selectedTask.assignedTo}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Badge variant={selectedTask.priority === "High" ? "destructive" : selectedTask.priority === "Medium" ? "warning" : "default"}>
                  {selectedTask.priority}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dates" className="text-right">
                  Dates
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{selectedTask.startDate} - {selectedTask.dueDate}</span>
                  </div>
                </div>
              </div>
              {role === "teamLead" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subtask" className="text-right">
                    Add Subtask
                  </Label>
                  <div className="col-span-3">
                    <Input id="subtask" placeholder="Enter subtask" />
                    <Button className="mt-2" onClick={() => handleAddSubtask({})}>Add Subtask</Button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="comment" className="text-right">
                  Add Comment
                </Label>
                <div className="col-span-3">
                  <Textarea id="comment" placeholder="Enter your comment" />
                  <Button className="mt-2" onClick={() => handleAddComment("")}>Add Comment</Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </Card>
  )
}