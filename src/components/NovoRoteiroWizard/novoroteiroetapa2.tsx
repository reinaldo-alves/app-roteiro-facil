'use client'

import styles from "./novoroteirowizard.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { attractions } from "@/app/atractions";
import { DndContext, DragEndEvent, useDraggable, useDroppable, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { FaCity, FaStar, FaThList } from "react-icons/fa";
import { IconSelect } from "../IconSelect";
import { IAttraction } from "@/types/types";

export default function NovoRoteiroEtapa2({selected, setSelected}: {selected: Array<IAttraction>, setSelected: Dispatch<SetStateAction<Array<IAttraction>>>}) {
    const [available, setAvailable] = useState([...attractions.filter(attraction => !selected.find(selectedAttraction => selectedAttraction.id === attraction.id))] as IAttraction[]);
    const [activeId, setActiveId] = useState<string | null>(null);

    function handleDragEnd(event: DragEndEvent) {
        setActiveId(null);
        const {over, active} = event;
        if (!over) return;
        if (over.id === 'selected') {
            const draggedItem = available.find(item => item.id === active.id);
            if (draggedItem && !selected.find(item => item.id === active.id)) {
                setAvailable(prev => prev.filter(item => item.id !== active.id));
                setSelected(prev => [...prev, draggedItem]);
            }
        }
        else if (over.id === 'available') {
            const draggedItem = selected.find(item => item.id === active.id);
            if (draggedItem && !available.find(item => item.id === active.id)) {
                setSelected(prev => prev.filter(item => item.id !== active.id));
                setAvailable(prev => [...prev, draggedItem]);
            }
        }
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(String(event.active.id));
    }

    function DroppableList({ id, title, items }: { id: string; title: string; items: any[] }) {
        const { setNodeRef } = useDroppable({ id });
        return (
            <div ref={setNodeRef} className={styles.droppableContainer}>
                <h3>{title}</h3>
                {items.map((item, index) => (
                    <DraggableItem key={index} id={item.id} />
                ))}
            </div>
        );
    }

    function DraggableItem({ id, isOverlay }: { id: string, isOverlay?: boolean }) {
        const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
        const style = {
            transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
            opacity: isDragging && !isOverlay ? 0 : 1,
            boxShadow: isOverlay ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : undefined,
            cursor: isOverlay ? 'grabbing' : 'grab',
        };

        const attraction = attractions.find(attraction => attraction.id === Number(id));
        if (!attraction) return null;

        return (
            <div ref={setNodeRef} className={styles.draggableCard} style={style} {...listeners} {...attributes}>
                <img src={attraction.images} alt={attraction.name} />
                <div className={styles.cardInfo}>
                    <h4>{ attraction.name }</h4>
                    <p><FaStar />{ attraction.score }</p>
                </div> 
            </div>
        );
    }
    
    return (
        <form>
            <h2>Selecione as atrações</h2>
            <div className={styles.filterContainer}>
                <div className={styles.inputContainer}>
                    <label>Filtrar por região</label>
                    <IconSelect options={["Nenhum filtro", "Região 1", "Região 2", "Região 3"]}><FaCity/></IconSelect>
                </div>
                <div className={styles.inputContainer}>
                    <label>Filtrar por categoria</label>
                    <IconSelect options={["Nenhum filtro", "Categoria 1", "Categoria 2", "Categoria 3"]}><FaThList/></IconSelect>
                </div>
            </div>
            <h3>Arraste os cards para adicionar ou remover atrações ao seu roteiro</h3>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className={styles.attractionsContainer}>
                    <DroppableList id="available" title="Atrações disponíveis" items={available} />
                    <div className={styles.buttons}></div>
                    <DroppableList id="selected" title="Atrações selecionadas" items={selected} />
                </div>
                <DragOverlay>
                    {activeId ? <DraggableItem id={activeId} isOverlay /> : null}
                </DragOverlay>
            </DndContext>
        </form>
    )
}