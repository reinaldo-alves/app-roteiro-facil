'use client'

import styles from "./novoroteirowizard.module.css";
import { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, useDraggable, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor, useDroppable, rectIntersection } from "@dnd-kit/core";
import { FaStar } from "react-icons/fa";
import { IAttraction } from "@/types/types";
import { Rnd } from "react-rnd";
import { count } from "console";

type Event = {
    id: string;
    title: string;
    image: string;
    start: number | null;
    length: number;
    day: number | null;
}

const CELL_HEIGHT = 15;
const TOTAL_DIVISIONS = 96;
const DEFAULT_HEIGHT = 4;
const WEEKDAY = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function NovoRoteiroEtapa4({attractions, startDate, endDate}: {attractions: Array<IAttraction>, startDate: string, endDate: string}) {
    const initialEvents: Array<Event> = attractions.map(attraction => (
        {id: attraction.id.toString(), title: attraction.name, image: attraction.images, start: null, length: DEFAULT_HEIGHT, day: null}
    ))

    const dayArray = () => {
        const start = new Date(startDate.split('T')[0] + 'T00:00:00');
        const end = new Date(endDate.split('T')[0] + 'T00:00:00');
        const days = [];
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        return days;
    };

    const [events, setEvents] = useState<Array<Event>>(initialEvents)
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 4}})
    );

    const columnsRef = useRef<Array<(HTMLDivElement | null)>>([]);

    function getEventById(id: string) {return events.find(event => event.id === id.toString()) ?? null};

    function updateEvent(updated: Event) {
        setEvents(prev => prev.map(event => event.id === updated.id ? updated : event))
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(String(event.active.id));
    }

    function handleDragEnd(event: DragEndEvent) {
        const {over, active} = event;
        setActiveId(null);
        if (!over) return;
        const draggedId = String(active.id).replace(/^depot-/, '');
        const droppableId = String(over.id);
        if (droppableId === 'depot') {
            setEvents(prev => 
                prev.map(item => 
                    item.id === draggedId ? {...item, start: null, day: null} : item
                )
            );
            return;
        }
        const colMatch = String(over.id).match(/^col-(\d+)$/);
        if (!colMatch) return;
        const colIndex = Number(colMatch[1]);
        const col = columnsRef.current[colIndex];
        if (!col) return;
        const rect = col.getBoundingClientRect();
        const pointerY = (window as any).__lastPointerY as number;
        const slot = Math.max(0, Math.min(TOTAL_DIVISIONS - 1, Math.floor((pointerY - rect.top) / CELL_HEIGHT)));
        setEvents(prev => 
            prev.map(item => 
                item.id === draggedId ? {...item, start: slot, day: colIndex} : item
            )
        );
    }

    useEffect(() => {
        function onPointerMove(event: PointerEvent) {
            (window as any).__lastPointerY = event.clientY;
            (window as any).__lastPointerX = event.clientX;
        }
        window.addEventListener('pointermove', onPointerMove);
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, [])

    function onMove(id: string, y: number) {
        const newStart = Math.max(0, Math.round(y / CELL_HEIGHT));
        updateEvent({...(getEventById(id) as Event), start: newStart} as Event);
    }

    function onResize(id: string, heigth: number) {
        const newLength = Math.max(1, Math.round(heigth / CELL_HEIGHT));
        updateEvent({...(getEventById(id) as Event), length: newLength} as Event);
    }

    function renderDepotItems() {
        return events.filter(event => event.day === null).map(item => (
            <DraggableItem key={item.id} id={item.id} data-id={item.id} />
        ))
    }

    function renderColumnEvents(dayIndex: number) {
        return events.filter(event => event.day === dayIndex && event.start !== null).map(item => (
            <ScheduledEvent key={item.id} item={item} day={dayIndex} />
        ));
    }

    function DepotList({ id, title }: { id: string; title: string; }) {
        const { setNodeRef } = useDroppable({ id });
        return (
            <div ref={setNodeRef} className={styles.droppableContainer}>
                <h3>{title}</h3>
                <div className={styles.depot} id={id}>
                    {renderDepotItems()}
                </div>
            </div>
        );
    }

    function DroppableColumn({ date, children, innerRefSetter }: { date: Date, children?: React.ReactNode, innerRefSetter: (ref: HTMLDivElement | null) => void}) {
        const id = `col-${date.getDate()}`
        const { setNodeRef } = useDroppable({ id });
        const combinedRef = (el: HTMLDivElement | null) => {
            setNodeRef(el);
            if (innerRefSetter) innerRefSetter(el);
        };
        return (
            <div className={styles.grid}>
                <h4>Dia {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</h4>
                <h5>({WEEKDAY[date.getDay()]})</h5>
                <div className={styles.column} id={id} data-droppable-id={id} ref={combinedRef}>
                    {[...Array(TOTAL_DIVISIONS)].map((_, i) => (
                        <div style={{borderWidth: i % 4 === 3 ? '1px' : '0', height: CELL_HEIGHT}} key={i} className={styles.cell}></div>
                    ))}
                    {children}
                </div>
            </div>
        )
    }

    function DraggableItem({ id, isOverlay }: { id: string, isOverlay?: boolean }) {
        const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: `depot-${id}` });
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

    function ScheduledEvent({ item, day }: { item: Event, day: number }) {
        
        function handleResize(event: any, dir: any, ref: HTMLElement) {
            const newLength = Math.max(1, Math.round(ref.offsetHeight / CELL_HEIGHT));
            updateEvent({...item, length: newLength} as Event);
        }

        return (
            <Rnd
                bounds={`#col-${day}`}
                enableResizing={{bottom: true}}
                disableDragging={false}
                size={{width: '100%', height: item.length * CELL_HEIGHT}}
                position={{x: 0, y: (item.start ?? 0) * CELL_HEIGHT}}
                onDragStop={(e, d) => {
                    const newStart = Math.max(0, Math.round(d.y / CELL_HEIGHT));
                    updateEvent({...item, start: newStart})
                }}
                onResizeStop={handleResize}
                minHeight={CELL_HEIGHT}
                style={{border: '1px solid #999', borderRadius: 4, zIndex: 5, backgroundImage: `url(${item.image})`}}
                className={styles.event}
            >
                {item.title} - {formatSlotToTime(item.start!)}
                <button onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onClick={() => updateEvent({...item, start: null, day: null})}>X</button>
            </Rnd>
        );
    }
    
    return (
        <form>
            <h2>Monte seu roteiro</h2>
            <h3>Posicione os cards das atrações na tabela ao lado</h3>
            <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className={styles.gridAttractionContainer}>
                    <DepotList id="depot" title="Atrações" />
                    <div className={styles.schedule}>
                        <div className={styles.hourLabel} style={{gap: 2.53 * CELL_HEIGHT}}>
                            {[...Array(TOTAL_DIVISIONS)].map((_, i) => {
                                if (i % 4 === 0 && i !== 0) return <p key={i}>{formatSlotToTime(i)}</p>
                                return null;
                            })}
                        </div>
                        {dayArray().map((date, index) => (
                            <DroppableColumn key={index} date={date} innerRefSetter={(el) => {columnsRef.current[date.getDate()] = el}}>
                                {renderColumnEvents(date.getDate())}
                            </DroppableColumn>
                        ))}
                    </div>
                </div>
                <DragOverlay>
                    {activeId ? <DraggableItem id={activeId.replace('depot-', '')} isOverlay /> : null}
                </DragOverlay>
            </DndContext>
        </form>
    )
}

function formatSlotToTime(slot: number) {
    const totalMinutes = slot * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}