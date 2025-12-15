'use client'

import styles from "./novoroteirowizard.module.css";
import { FaHotel, FaMapMarkerAlt, FaPlane } from "react-icons/fa";
import { IconInput } from "@/components/IconInput";
import { IconSelect } from "../IconSelect";

export default function NovoRoteiroEtapa3({cities}: {cities: Array<string | undefined>}) {
    return (
        <form>
            <h2>Insira algumas informações adicionais (opcional)</h2>
            {cities.map((_, i) => (
                <div className={styles.cityGroup} key={i}>
                    <div className={styles.inputContainer}>
                        <label>Hospedagem - Cidade {i + 1}</label>
                        <IconInput type="text" placeholder="Digite o nome do local de hospedagem"><FaHotel/></IconInput>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Chegada - Cidade {i + 1}</label>
                        <div className={styles.inputDates}>
                            <IconSelect options={["Meio de Transporte", "Avião", "Barco", "Carro", "Ônibus", "Trem"]}><FaPlane/></IconSelect>
                            <IconInput type="text" placeholder="Local de chegada"><FaMapMarkerAlt/></IconInput>
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Saída - Cidade {i + 1}</label>
                        <div className={styles.inputDates}>
                            <IconSelect options={["Meio de Transporte", "Avião", "Barco", "Carro", "Ônibus", "Trem"]}><FaPlane/></IconSelect>
                            <IconInput type="text" placeholder="Local de saída"><FaMapMarkerAlt/></IconInput>
                        </div>
                    </div>
                </div>
            ))}
        </form>
    )
}