"use client";

import { deepClone } from "@/lib/utils";
import { ProjectBoard, Task } from "@/types/project.types";
import { useState } from "react";

const initialBoard: ProjectBoard = {
  id: "project-1",
  title: "Website Redesign Project",
  members: ["Alice", "Bob", "Charlie", "Diana"],
  columns: [
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100",
      tasks: [
        {
          id: "task-1",
          title: "Design Homepage",
          description: "Create modern homepage design with new branding",
          assignee: "Alice",
          priority: "high",
          tags: ["design", "ui/ux"],
          dueDate: "2024-02-15",
          attachments: [
            {
              id: "file-1",
              name: "brand-guide.pdf",
              url: "/files/brand-guide.pdf",
              uploadDate: "2024-01-10",
            },
          ],
          comments: [
            {
              id: "comment-1",
              author: "Bob",
              content: "Make sure to follow accessibility guidelines",
              timestamp: "2024-01-10T10:30:00Z",
              replies: [
                {
                  id: "reply-1",
                  author: "Alice",
                  content: "Will do! Adding alt texts to all images.",
                  timestamp: "2024-01-10T11:15:00Z",
                  replies: [],
                },
              ],
            },
          ],
        },
        {
          id: "task-2",
          title: "Setup Development Environment",
          description: "Configure Next.js, TypeScript, and Tailwind",
          assignee: "Bob",
          priority: "medium",
          tags: ["development", "setup"],
          attachments: [],
          comments: [],
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-100",
      tasks: [
        {
          id: "task-3",
          title: "User Authentication",
          description: "Implement login/signup with NextAuth",
          assignee: "Charlie",
          priority: "high",
          tags: ["backend", "security"],
          dueDate: "2024-02-10",
          attachments: [],
          comments: [
            {
              id: "comment-2",
              author: "Diana",
              content: "Don't forget password reset flow",
              timestamp: "2024-01-11T09:20:00Z",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-100",
      tasks: [
        {
          id: "task-4",
          title: "API Integration",
          description: "Connect frontend to backend APIs",
          assignee: "Diana",
          priority: "medium",
          tags: ["api", "integration"],
          attachments: [],
          comments: [],
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-100",
      tasks: [
        {
          id: "task-5",
          title: "Project Planning",
          description: "Create project timeline and milestones",
          assignee: "Alice",
          priority: "low",
          tags: ["planning"],
          attachments: [],
          comments: [],
        },
      ],
    },
  ],
};

export default function ProjectBoardManagement() {
  const [board, setBoard] = useState<ProjectBoard>(deepClone(initialBoard));
  const [draggedTask, setDraggedTask] = useState<{
    task: Task;
    sourceColumnId: string;
  } | null>(null);
  const [commentInputs, setCommentInputs] = useState<{
    [taskId: string]: string;
  }>({});
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // Deep Clone in Action: Moving tasks between columns
  const moveTask = (taskId: string, targetColumnId: string) => {
    console.log("🚀 Moving task:", taskId, "to column:", targetColumnId);

    const boardCopy = deepClone(board);

    // Find task in all columns
    let taskToMove: Task | null = null;
    let sourceColumnIndex = -1;
    let taskIndex = -1;

    // Find and remove task from source column
    boardCopy.columns.forEach((column, colIdx) => {
      const taskIdx = column.tasks.findIndex((task) => task.id === taskId);
      if (taskIdx !== -1) {
        taskToMove = column.tasks[taskIdx];
        sourceColumnIndex = colIdx;
        taskIndex = taskIdx;
      }
    });

    if (taskToMove && sourceColumnIndex !== -1) {
      // Remove from source column
      boardCopy.columns[sourceColumnIndex].tasks.splice(taskIndex, 1);

      // Add to target column
      const targetColumn = boardCopy.columns.find(
        (col) => col.id === targetColumnId
      );
      if (targetColumn) {
        targetColumn.tasks.push(taskToMove);
        setBoard(boardCopy);
        console.log("✅ Task moved successfully with deepClone");
      }
    }
  };

  // Deep Clone in Action: Adding new task
  const addNewTask = (columnId: string) => {
    console.log("🆕 Adding new task to column:", columnId);

    const boardCopy = deepClone(board);
    const column = boardCopy.columns.find((col) => col.id === columnId);

    if (column) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: "New Task",
        description: "Describe this task...",
        assignee: "Unassigned",
        priority: "medium",
        tags: [],
        attachments: [],
        comments: [],
      };

      column.tasks.push(newTask);
      setBoard(boardCopy);
      console.log("✅ New task added with deepClone");
    }
  };

  // Deep Clone in Action: Updating task priority
  const updateTaskPriority = (
    taskId: string,
    newPriority: "low" | "medium" | "high"
  ) => {
    console.log("🎯 Updating task priority:", taskId, "to:", newPriority);

    const boardCopy = deepClone(board);

    boardCopy.columns.forEach((column) => {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) {
        task.priority = newPriority;
      }
    });

    setBoard(boardCopy);
    console.log("✅ Task priority updated safely with deepClone");
  };

  // Deep Clone in Action: Bulk priority update
  const bulkUpdatePriority = (newPriority: "low" | "medium" | "high") => {
    console.log("🔧 Bulk updating all tasks to priority:", newPriority);

    const boardCopy = deepClone(board);

    boardCopy.columns.forEach((column) => {
      column.tasks.forEach((task) => {
        task.priority = newPriority;
      });
    });

    setBoard(boardCopy);
    console.log("✅ All tasks priority updated with deepClone");
  };

  // Reset to initial state
  const resetBoard = () => {
    console.log("🔄 Resetting board to initial state");
    setBoard(deepClone(initialBoard));
    console.log("✅ Board reset using deepClone");
  };

  // Drag and drop handlers
  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.sourceColumnId !== targetColumnId) {
      moveTask(draggedTask.task.id, targetColumnId);
    }
    setDraggedTask(null);
  };

  // Deep Clone in Action: Adding comment to task
  const addCommentToTask = (taskId: string) => {
    const comment = commentInputs[taskId]?.trim();
    if (!comment) return;

    console.log("💬 Adding comment to task:", taskId);

    const boardCopy = deepClone(board);

    boardCopy.columns.forEach((column) => {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) {
        const newComment = {
          id: `comment-${Date.now()}`,
          author: "Current User",
          content: comment,
          timestamp: new Date().toISOString(),
          replies: [],
        };
        task.comments.push(newComment);
      }
    });

    setBoard(boardCopy);
    // Clear the input for this task
    setCommentInputs((prev) => ({ ...prev, [taskId]: "" }));
    console.log("✅ Comment added safely with deepClone");
  };

  // Deep Clone in Action: Adding reply to comment
  const addReplyToComment = (
    taskId: string,
    commentId: string,
    replyContent: string
  ) => {
    console.log("↪️ Adding reply to comment:", commentId);

    const boardCopy = deepClone(board);

    boardCopy.columns.forEach((column) => {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) {
        const comment = task.comments.find((c) => c.id === commentId);
        if (comment) {
          const newReply = {
            id: `reply-${Date.now()}`,
            author: "Current User",
            content: replyContent,
            timestamp: new Date().toISOString(),
            replies: [],
          };
          comment.replies.push(newReply);
        }
      }
    });

    setBoard(boardCopy);
    console.log("✅ Reply added safely with deepClone");
  };

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  // Update comment input
  const updateCommentInput = (taskId: string, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  return (
    <section
      id="ProjectBoard"
      className="flex flex-col items-center justify-center min-h-screen pt-34 px-4 xl:px-0 mb-6"
    >
      <div className="w-full max-w-7xl text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
          Project Management Board
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-4xl mx-auto leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <strong>Educational Purpose:</strong> This demonstrates how
          <code>deepClone</code>
          handles complex nested objects with multiple levels (tasks → comments
          → replies). Each operation safely modifies the project board without
          affecting original data structures.
        </p>
      </div>
      {/* Board Controls */}
      <div className="w-full max-w-7xl mb-6">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold">{board.title}</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => bulkUpdatePriority("high")}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Set All High Priority
            </button>
            <button
              onClick={() => bulkUpdatePriority("medium")}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
            >
              Set All Medium Priority
            </button>
            <button
              onClick={() => bulkUpdatePriority("low")}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Set All Low Priority
            </button>
            <button
              onClick={resetBoard}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Reset Board
            </button>
          </div>
        </div>

        {/* Add a visual indicator of what the bulk update will do */}
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            <strong>Bulk Update Demo:</strong> Click any priority button to
            update ALL tasks across ALL columns using deepClone
          </p>
        </div>
      </div>
      {/* Project Board */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {board.columns.map((column) => (
            <div
              key={column.id}
              className={`border border-gray-200 rounded-lg ${column.color} p-4 min-h-96`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <span className="bg-white px-2 py-1 rounded text-sm">
                  {column.tasks.length} tasks
                </span>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4
                        className="font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => toggleTaskExpansion(task.id)}
                      >
                        {task.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>👤 {task.assignee}</span>
                      {task.dueDate && (
                        <span>
                          📅 {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Comments Section */}
                    {expandedTask === task.id && (
                      <div className="mt-4 border-t pt-3">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-sm">
                            Comments ({task.comments.length})
                          </h5>
                          <button
                            onClick={() => toggleTaskExpansion(task.id)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Collapse
                          </button>
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-2 mb-4">
                          <input
                            type="text"
                            value={commentInputs[task.id] || ""}
                            onChange={(e) =>
                              updateCommentInput(task.id, e.target.value)
                            }
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addCommentToTask(task.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => addCommentToTask(task.id)}
                            className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                          >
                            Add
                          </button>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-3 max-h-40 overflow-y-auto">
                          {task.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-gray-50 rounded p-2"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-xs">
                                  {comment.author}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    comment.timestamp
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm mb-2">{comment.content}</p>

                              {/* Replies */}
                              {comment.replies.length > 0 && (
                                <div className="ml-4 border-l-2 border-gray-200 pl-2">
                                  {comment.replies.map((reply) => (
                                    <div
                                      key={reply.id}
                                      className="mb-2 last:mb-0"
                                    >
                                      <div className="flex justify-between items-start">
                                        <span className="font-medium text-xs">
                                          {reply.author}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {new Date(
                                            reply.timestamp
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Quick Reply */}
                              <div className="flex gap-2 mt-2">
                                <input
                                  type="text"
                                  placeholder="Reply..."
                                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      const target =
                                        e.target as HTMLInputElement;
                                      if (target.value.trim()) {
                                        addReplyToComment(
                                          task.id,
                                          comment.id,
                                          target.value.trim()
                                        );
                                        target.value = "";
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Task Footer */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateTaskPriority(task.id, "high")}
                          className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"
                          title="Set High Priority"
                        />
                        <button
                          onClick={() => updateTaskPriority(task.id, "medium")}
                          className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600"
                          title="Set Medium Priority"
                        />
                        <button
                          onClick={() => updateTaskPriority(task.id, "low")}
                          className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600"
                          title="Set Low Priority"
                        />
                      </div>

                      {/* Comment Toggle */}
                      <button
                        onClick={() => toggleTaskExpansion(task.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
                      >
                        💬 {task.comments.length}
                        {expandedTask === task.id ? " ▲" : " ▼"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addNewTask(column.id)}
                className="w-full mt-4 py-2 border border-dashed border-gray-400 rounded text-gray-600 hover:bg-white hover:text-gray-800 transition-colors"
              >
                + Add Task
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* DeepClone Explanation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-7xl">
        <h3 className="font-semibold text-yellow-800 mb-2">
          How DeepClone Works Here:
        </h3>
        <ul className="text-yellow-700 list-disc list-inside space-y-1">
          <li>
            <strong>Comment System:</strong> Safely adds comments to deeply
            nested arrays without mutation
          </li>
          <li>
            <strong>Reply Threads:</strong> Handles multiple levels of nesting
            (comments → replies)
          </li>
          <li>
            <strong>Task Movement:</strong> Creates completely new board
            structure when moving tasks between columns
          </li>
          <li>
            <strong>Priority Updates:</strong> Safely modifies task properties
            without affecting original objects
          </li>
          <li>
            <strong>Bulk Operations:</strong> Updates multiple tasks across
            different columns atomically
          </li>
          <li>
            <strong>State Isolation:</strong> Each operation works on isolated
            copies, preventing accidental data corruption
          </li>
        </ul>
      </div>
    </section>
  );
}
