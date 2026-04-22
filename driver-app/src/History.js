import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Clock, X, MapPin, Navigation } from 'lucide-react-native';

export default function History({ user, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using 10.0.2.2 for Android Emulator compatibility
    fetch(`http://10.0.2.2:5000/api/rides/history/${user.uid}`)
      .then(res => res.json())
      .then(data => {
         setHistory(data);
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'COMPLETED' ? 'rgba(0,223,130,0.1)' : 'rgba(255,71,87,0.1)' }]}>
          <Text style={[styles.statusText, { color: item.status === 'COMPLETED' ? '#00df82' : '#ff4757' }]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.passengerRow}>
        <Text style={styles.label}>Passenger:</Text>
        <Text style={styles.value}>{item.passengerId ? item.passengerId.name : 'Unknown User'}</Text>
      </View>

      <View style={styles.locationRow}>
        <MapPin size={16} color="#00df82" />
        <Text style={styles.locationText}>Picked up from passenger pin</Text>
      </View>
      <View style={styles.locationRow}>
        <Navigation size={16} color="#ff4757" />
        <Text style={styles.locationText}>Dropped off at passenger destination</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerTitleRow}>
                <Clock color="#00df82" size={24} />
                <Text style={styles.headerTitle}>Driving History</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
                <X color="#fff" size={24} />
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            {loading ? (
                <ActivityIndicator size="large" color="#00df82" />
            ) : history.length === 0 ? (
                <Text style={styles.emptyText}>No completed rides found.</Text>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0f1115',
    zIndex: 2000,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#191c24',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#191c24',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  passengerRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    color: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  locationText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  }
});
