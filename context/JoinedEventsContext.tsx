import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type JoinedEventsContextType = {
  joinedEventIds: number[];
  joinEvent: (id: number) => void;
  unjoinEvent: (id: number) => void;
  isJoined: (id: number) => boolean;
};

const JoinedEventsContext = createContext<JoinedEventsContextType | undefined>(undefined);

const STORAGE_KEY = '@joined_events';

export const JoinedEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [joinedEventIds, setJoinedEventIds] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setJoinedEventIds(JSON.parse(json));
        }
      } catch (error) {
        console.error('Failed to load joined events:', error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(joinedEventIds));
  }, [joinedEventIds]);

  const joinEvent = (id: number) => {
    setJoinedEventIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const unjoinEvent = (id: number) => {
    setJoinedEventIds((prev) => prev.filter((eid) => eid !== id));
  };

  const isJoined = (id: number) => joinedEventIds.includes(id);

  return (
    <JoinedEventsContext.Provider
      value={{ joinedEventIds, joinEvent, unjoinEvent, isJoined }}
    >
      {children}
    </JoinedEventsContext.Provider>
  );
};

export const useJoinedEvents = () => {
  const context = useContext(JoinedEventsContext);
  if (!context) {
    throw new Error('useJoinedEvents must be used within JoinedEventsProvider');
  }
  return context;
};
