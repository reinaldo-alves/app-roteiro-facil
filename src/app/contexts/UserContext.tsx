'use client'

import { IUser } from "@/types/types";
import { apiGet } from "@/resources/api";
import { createContext, ReactNode, useEffect, useState } from "react"

type JwtPayload = {
    sub: string;
    email: string;
    name: string;
    createdAt?: string;
};

type IUserContext = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserStore = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const decodeJwtPayload = (jwtToken: string): JwtPayload | null => {
            try {
                const [, payload] = jwtToken.split('.');
                if (!payload) return null;
                const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
                const json = atob(base64);
                return JSON.parse(json) as JwtPayload;
            } catch {
                return null;
            }
        };

        const normalizeUser = (raw: unknown, payload?: JwtPayload): IUser => {
            const data = (raw ?? {}) as Partial<IUser> & { id?: number | string; email?: string; name?: string; reviews?: number[] };
            return {
                id: Number(data.id ?? payload?.sub ?? 0),
                name: data.name ?? payload?.name ?? '',
                email: data.email ?? payload?.email ?? '',
                reviews: Array.isArray(data.reviews) ? data.reviews : [],
            };
        };

        const restoreSession = async () => {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) return;

            setToken(storedToken);
            const payload = decodeJwtPayload(storedToken);
            if (!payload) return;

            // Optimistic user from token payload to avoid login flash
            setUser(normalizeUser(null, payload));

            try {
                const res = await apiGet(`users/${payload.sub}`, storedToken);
                if (res.ok) {
                    const matched = await res.json();
                    if (matched) {
                        setUser(normalizeUser(matched, payload));
                        return;
                    }
                }
            } catch {
                // Ignore network errors and fallback to payload
            }

            setUser(normalizeUser(null, payload));
        };

        void restoreSession();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </UserContext.Provider>
    );
}
