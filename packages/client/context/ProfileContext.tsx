import React, { createContext, useContext } from 'react'
import { Profile } from '@/types';


export const ProfileContext = createContext<Profile | null>(null)

export const useProfile = () => useContext(ProfileContext);