import React from "react";
import type { RegisteredStock } from "../types/registeredStock";
import type { DartDisclosure } from "../types/dartDisclosure";
import type { NewsArticle } from "../types/news";
import RegisteredStockItem, {
  type RegisteredStockItemProps,
} from "./RegisteredStockItem";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface RegisteredStockListProps {
  registered: RegisteredStock[];
  disclosures: Record<number, DartDisclosure[]>;
  news: Record<number, NewsArticle[]>;
  openLayers: Record<number, boolean>;
  openNewsLayers: Record<number, boolean>;
  onToggleLayer: (id: number) => void;
  onToggleNewsLayer: (id: number) => void;
  onDelete: (id: number) => void;
  onSortEnd?: (newList: RegisteredStock[]) => void;
}

function DraggableStockItem({ item, ...props }: RegisteredStockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={isDragging ? "bg-gray-100 dark:bg-gray-700 rounded-lg" : ""}
    >
      <div className="flex items-center">
        <span
          {...listeners}
          className="cursor-move mr-2 select-none text-gray-500 dark:text-gray-400"
          title="드래그로 순서 변경"
        >
          ☰
        </span>
        <div className="flex-1">
          <RegisteredStockItem item={item} {...props} />
        </div>
      </div>
    </div>
  );
}

const RegisteredStockList: React.FC<RegisteredStockListProps> = ({
  registered,
  disclosures,
  news,
  openLayers,
  openNewsLayers,
  onToggleLayer,
  onToggleNewsLayer,
  onDelete,
  onSortEnd,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = registered.findIndex((item) => item.id === active.id);
      const newIndex = registered.findIndex((item) => item.id === over.id);
      const newList = arrayMove(registered, oldIndex, newIndex);
      if (onSortEnd) onSortEnd(newList);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={registered.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 gap-2">
          <ul className="space-y-2">
            {registered.map((item) => (
              <DraggableStockItem
                key={item.id}
                item={item}
                disclosures={disclosures[item.id] || []}
                news={news[item.id] || []}
                openLayer={!!openLayers[item.id]}
                openNewsLayer={!!openNewsLayers[item.id]}
                onToggleLayer={() => onToggleLayer(item.id)}
                onToggleNewsLayer={() => onToggleNewsLayer(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default RegisteredStockList;
