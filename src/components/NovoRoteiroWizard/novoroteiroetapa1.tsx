'use client'

import styles from "./novoroteirowizard.module.css";
import { FaCalendar, FaPlus } from "react-icons/fa";
import { IconInput } from "@/components/IconInput";
import { Button } from "@/components/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function NovoRoteiroEtapa1({cities, setCities, startDate, setStartDate, endDate, setEndDate}: {cities: Array<string | undefined>, setCities: Dispatch<SetStateAction<Array<string | undefined>>>, startDate: string, setStartDate: Dispatch<SetStateAction<string>>, endDate: string, setEndDate: Dispatch<SetStateAction<string>>}) {
    const [isHour, setIsHour] = useState(false);

    useEffect(() => {console.log(startDate, endDate)}, [startDate, endDate]);
    
    return (
        <form>
            <h2>Insira as informações do roteiro</h2>
            <div className={styles.inputContainer}>
                <label>Nome do roteiro</label>
                <IconInput type="text" placeholder="Escolha um nome para o seu roteiro"></IconInput>
            </div>
            <div className={styles.inputContainer}>
                <label>Datas da viagem</label>
                <div className={styles.inputDates}>
                    <IconInput type={isHour ? "datetime-local" : "date"} value={startDate} onChange={(e) => setStartDate(e.target.value)}><FaCalendar/></IconInput>
                    <IconInput type={isHour ? "datetime-local" : "date"} value={endDate} onChange={(e) => setEndDate(e.target.value)}><FaCalendar/></IconInput>
                </div>
                <div className={styles.inputCheckbox}>
                    <input type="checkbox" checked={isHour} onChange={e => setIsHour(e.target.checked)}/>
                    Informar horário
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>Destino da viagem</label>
                {cities.map((_, i) => (
                    <IconInput key={i} type="text" placeholder="Selecione uma cidade"></IconInput>
                ))}
                <Button type="primary" onClick={() => setCities([...cities, undefined])}><FaPlus />Adicionar nova cidade</Button>
            </div>
        </form>
    )
}