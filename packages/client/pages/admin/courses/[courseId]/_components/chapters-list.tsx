"use client";

import { useState, useEffect } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Grip, Pencil } from "lucide-react";

import { Lesson } from "@/types";
import { cn } from "@/libs/utils";

interface ChaptersListProps {
  items: Lesson[];
  onReorder: (
    updateData: {
      id: string;
      position: number;
    }[]
  ) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {

  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState<Lesson[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {

    if (!result.destination) return;

    const newItems = Array.from(chapters);

    const [reorderedItem] = newItems.splice(result.source.index, 1);

    newItems.splice(result.destination.index, 0, reorderedItem);

    setChapters(newItems);

    const bulkUpdateData = newItems.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>

            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center gap-2 mb-3 rounded-md border bg-white p-3"
                  >

                    {/* Drag handle */}
                    <div
                      {...provided.dragHandleProps}
                      className="cursor-grab text-gray-500"
                    >
                      <Grip size={18} />
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      {chapter.name}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">

                      {/* {chapter.isFree && (
                        <span className="text-xs px-2 py-1 rounded bg-[#FFF1DC]">
                          Free
                        </span>
                      )} */}

                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded",
                          chapter.published
                            ? "bg-[#FFB347]"
                            : "bg-gray-200"
                        )}
                      >
                        {chapter.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      {/* Edit */}
                      <Pencil
                        size={16}
                        onClick={() => onEdit(chapter.id)}
                        className="cursor-pointer hover:opacity-70"
                      />

                    </div>

                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};