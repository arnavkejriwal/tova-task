import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Event = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  location: string;
  date: string;
  mainImageUrl: string;
  memberPrice: number;
  nonMemberPrice: number;
  capacity: number;
};

type BookmarkContextType = {
  bookmarks: Event[];
  toggleBookmark: (event: Event) => void;
  isBookmarked: (eventId: number) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const STORAGE_KEY = 'BOOKMARKED_EVENTS';

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Event[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setBookmarks(JSON.parse(json));
        }
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      }
    };
    loadBookmarks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (event: Event) => {
    setBookmarks((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      return exists
        ? prev.filter((e) => e.id !== event.id)
        : [...prev, event];
    });
  };

  const isBookmarked = (eventId: number) => {
    return bookmarks.some((e) => e.id === eventId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used inside BookmarkProvider');
  }
  return context;
};
