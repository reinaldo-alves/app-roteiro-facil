'use client'

import styles from './novoroteirowizard.module.css'
import { notFound, useSearchParams } from 'next/navigation'
import { Button } from '../Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import NovoRoteiroEtapa1 from './novoroteiroetapa1';
import NovoRoteiroEtapa2 from './novoroteiroetapa2';
import NovoRoteiroEtapa3 from './novoroteiroetapa3';
import { useState } from 'react';
import NovoRoteiroEtapa4 from './novoroteiroetapa4';
import { IAttraction } from '@/types/types';

export default function NovoRoteiroWizard() {
    const searchParams = useSearchParams();
    const etapa = Number(searchParams.get('etapa') ?? 1);

    const [cities, setCities] = useState<Array<string | undefined>>([undefined]);
    const [attractions, setAttractions] = useState([] as IAttraction[]);

    if (etapa < 1 || etapa > 4 || isNaN(etapa) || !Number.isInteger(etapa)) {
        notFound();
    }
    
    return (
        <>
            {etapa === 1 && <NovoRoteiroEtapa1 cities={cities} setCities={setCities} />}
            {etapa === 2 && <NovoRoteiroEtapa2 selected={attractions} setSelected={setAttractions} />}
            {etapa === 3 && <NovoRoteiroEtapa3 cities={cities} />}
            {etapa === 4 && <NovoRoteiroEtapa4 attractions={attractions} />}
            <div className={styles.navigation}>
                {etapa > 1 ? <Button type="primary" route={`?etapa=${etapa - 1}`}><FaArrowLeft/>Voltar</Button> : <div></div>}
                {etapa < 4 ? <Button type="primary" route={`?etapa=${etapa + 1}`}>Próximo<FaArrowRight/></Button>: <div></div>}
            </div>
        </>
    )
}