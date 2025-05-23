import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Event, useBookmarks } from '../context/BookmarkContext';
import { useJoinedEvents } from '../context/JoinedEventsContext';

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { isJoined, joinEvent } = useJoinedEvents();

  const bookmarked = isBookmarked(event.id);
  const joined = isJoined(event.id);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: event.mainImageUrl }} style={styles.image} />

      <Text style={styles.title}>{event.title}</Text>

      <TouchableOpacity
        onPress={() => toggleBookmark(event)}
        style={styles.bookmarkIcon}
      >
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={bookmarked ? '#f60' : '#d1d1d1'}
        />
      </TouchableOpacity>

      <View style={styles.infoRow}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color="#d1d1d1"
          style={styles.icon}
        />
        <Text style={styles.details}>
          {new Date(event.date).toLocaleString()}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name="location-outline"
          size={16}
          color="#d1d1d1"
          style={styles.icon}
        />
        <Text style={styles.details}>{event.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name="pricetag-outline"
          size={16}
          color="#d1d1d1"
          style={[styles.icon, { marginTop: -50 }]}
        />
        <Text style={styles.price}>
          Member: ${event.memberPrice} | Non-Member: ${event.nonMemberPrice}
        </Text>
      </View>

      {event.capacity !== 0 ? (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.joinButton, joined && styles.joinButtonJoined]}
            onPress={() => joinEvent(event.id)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <View style={styles.joinContent}>
              {joined && (
                <Ionicons
                  name="checkmark"
                  size={18}
                  color="#FF6600"
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={[
                  styles.joinButtonText,
                  joined && styles.joinButtonTextJoined,
                ]}
              >
                {joined ? 'Joined' : 'Join'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Text style={styles.full}>FULL</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 210,
    right: 15,
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
    fontFamily: 'Avenir-Heavy',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  details: {
    fontSize: 14,
    color: '#d1d1d1',
    fontFamily: 'Avenir-Heavy',
  },
  price: {
    fontSize: 14,
    marginBottom: 25,
    paddingBottom: 25,
    color: '#d1d1d1',
    fontFamily: 'Avenir-Heavy',
  },
  full: {
    color: '#FF6600',
    fontWeight: 'bold',
    marginBottom: 5,
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 85,
    textAlign: 'right',
    fontFamily: 'Avenir-Heavy',
  },
  joinButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    right: 5,
    width: 85,
    marginBottom: 5,
  },
  joinButtonJoined: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF6600',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
  },
  joinButtonTextJoined: {
    color: '#FF6600',
    fontFamily: 'Avenir-Heavy',
  },
  joinContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
