import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EventCard from '../../components/EventCard';
import { Event, useBookmarks } from '../../context/BookmarkContext';
import rawEvents from '../../data/events.json';

const events: Event[] = rawEvents;

export default function BookmarksScreen() {
  const { bookmarks } = useBookmarks();
  const [joinedEventIds, setJoinedEventIds] = useState<number[]>([]);

  const handleJoin = (event: Event) => {
    if (!joinedEventIds.includes(event.id)) {
      setJoinedEventIds(prev => [...prev, event.id]);
    } else {
      setJoinedEventIds(prev => prev.filter(id => id !== event.id));
    }
  };

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarked events yet.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <EventCard event={item} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2120',
  },
  list: {
    padding: 16,
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: '#d1d1d1',
    fontFamily: 'Avenir-Heavy',
  },
});
