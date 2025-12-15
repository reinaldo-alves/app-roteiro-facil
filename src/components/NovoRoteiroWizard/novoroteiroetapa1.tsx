'use client'

import styles from "./novoroteirowizard.module.css";
import { FaCalendar, FaPlus } from "react-icons/fa";
import { IconInput } from "@/components/IconInput";
import { Button } from "@/components/Button";
import { Dispatch, SetStateAction, useState } from "react";

export default function NovoRoteiroEtapa1({cities, setCities}: {cities: Array<string | undefined>, setCities: Dispatch<SetStateAction<Array<string | undefined>>>}) {
    const [isHour, setIsHour] = useState(false);
    
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
                    <IconInput type={isHour ? "datetime-local" : "date"}><FaCalendar/></IconInput>
                    <IconInput type={isHour ? "datetime-local" : "date"}><FaCalendar/></IconInput>
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