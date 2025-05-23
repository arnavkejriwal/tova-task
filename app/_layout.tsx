import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { BookmarkProvider } from '../context/BookmarkContext';
import { JoinedEventsProvider } from '../context/JoinedEventsContext';

export default function Layout() {
  return (
    <JoinedEventsProvider>
      <BookmarkProvider>
        <Tabs
          screenOptions={{
            headerStyle: { backgroundColor: '#111' },
            headerTintColor: '#DC6532',
            tabBarStyle: { backgroundColor: '#111' },
            tabBarActiveTintColor: '#f60',
            tabBarInactiveTintColor: '#ccc',
          }}
        >
          <Tabs.Screen
            name="(tabs)/EventScreen"
            options={{
              title: '',
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="(tabs)/BookmarksScreen"
            options={{
              title: 'My Bookmarks',
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bookmark-outline" color={color} size={size} />
              ),
              headerTitleStyle: {
                fontFamily: 'Avenir-Heavy',
                fontSize: 22,
                color: '#f60',
              },
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              href: null,
              title: '',
              tabBarShowLabel: false,
            }}
          />
        </Tabs>
      </BookmarkProvider>
    </JoinedEventsProvider>
  );
}
