import type { Assignment } from '@/types/activity/assignment'
import type { Task } from '@/types/activity/task'

export type MergedTask = Task & {
  managerId: string | null
  managerName: string | null
  users: { userId: string; userName: string }[]
}

export const mergeTasks = (tasks: Task[], assignments: Assignment[]) => {
  const taskMap = tasks.reduce(
    (map, task) => {
      map[task.taskId] = {
        ...task,
        managerId: null,
        managerName: null,
        users: []
      }
      return map
    },
    {} as Record<string, MergedTask>
  )

  assignments.forEach(assignment => {
    const task = taskMap[assignment.taskId]
    if (task) {
      if (assignment.isManager) {
        task.managerId = assignment.managerId
        task.managerName = assignment.managerName
      } else {
        task.users.push({
          userId: assignment.userId,
          userName: assignment.userName
        })
      }
    }
  })

  return Object.values(taskMap)
}

export type TasksByUser = Record<
  string,
  { tasks: string[]; dueDates: string[]; isFake: boolean }
>

export const getTasksByUser = (mergedTasks: MergedTask[]) =>
  mergedTasks.reduce((acc, task) => {
    task.users?.forEach(u => {
      if (!acc[u.userName]) {
        acc[u.userName] = {
          tasks: [],
          dueDates: [],
          isFake: false
        }
      }
      acc[u.userName].tasks.push(task.name)
      acc[u.userName].dueDates.push(task.dueDate)
    })

    task.fakeAssignedTo?.forEach(userName => {
      if (!acc[userName]) {
        acc[userName] = {
          tasks: [],
          dueDates: [],
          isFake: true
        }
      }
      acc[userName].tasks.push(task.name)
      acc[userName].dueDates.push(task.dueDate)
    })
    return acc
  }, {} as TasksByUser)
