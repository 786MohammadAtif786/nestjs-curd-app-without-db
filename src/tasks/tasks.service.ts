import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-fillter.dto';

@Injectable()
export class TasksService {
  private tasks:Task[] = [];

  public getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if(status) {
      tasks = tasks.filter((tasks) => tasks.status === status);
    }
    if(search) {
      tasks = tasks.filter((task) => {
        if(task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false
      });
    }
    return tasks
    throw new Error('Method not implemented.');
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;
    const task: Task  = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const tasks = this.getTaskById(id);
    tasks.status = status;
    return tasks
  }
}
