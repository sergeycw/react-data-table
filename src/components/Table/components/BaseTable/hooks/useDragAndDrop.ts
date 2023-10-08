import { useLocalStorage } from "@/components/Table/hooks/useLocalStorage";

export function useDragAndDrop(initialColumns: Array<string>) {
  const [columns, setColumns] = useLocalStorage<Array<string>>(
    "columnsOrder",
    initialColumns,
  );

  let dragSrcEl: number | null = null;

  const handleDragStart = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    index: number,
  ) => {
    dragSrcEl = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (dragSrcEl !== null && dragSrcEl !== index) {
      const newColumns = [...columns];
      [newColumns[dragSrcEl], newColumns[index]] = [
        newColumns[index],
        newColumns[dragSrcEl],
      ];
      setColumns(newColumns);
      dragSrcEl = null;
    }
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    columns,
  };
}
