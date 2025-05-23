import { useJoinedEvents } from '@/context/JoinedEventsContext';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import EventCard from '../../components/EventCard';
import { Event } from '../../context/BookmarkContext';
import rawEvents from '../../data/events.json';

const events: Event[] = rawEvents;

export default function EventScreen() {
  const { joinedEventIds, joinEvent, isJoined } = useJoinedEvents();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      ),
      headerTintColor: '#fff',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={styles.list}
      />
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
});
