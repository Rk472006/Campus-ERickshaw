import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, Save, X } from 'lucide-react-native';

export default function Profile({ user, onClose }) {
  const [profileData, setProfileData] = useState({ 
    name: '', 
    email: '', 
    dob: '',
    vehicleNumber: '',
    licenseId: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/api/user/${user.uid}`)
      .then(res => res.json())
      .then(data => {
         setProfileData({
             name: data.name || '',
             email: data.email || user.email,
             dob: data.dob || '',
             vehicleNumber: data.vehicleNumber || '',
             licenseId: data.licenseId || '',
             address: data.address || '',
             phone: data.phone || ''
         });
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [user]);

  const handleSave = () => {
      setSaving(true);
      fetch(`http://10.0.2.2:5000/api/user/${user.uid}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              name: profileData.name,
              dob: profileData.dob,
              vehicleNumber: profileData.vehicleNumber,
              licenseId: profileData.licenseId,
              address: profileData.address,
              phone: profileData.phone
          })
      })
      .then(res => res.json())
      .then(() => {
          setSaving(false);
          Alert.alert("Success", "Profile updated successfully!");
      })
      .catch(() => {
          setSaving(false);
          Alert.alert("Error", "Failed to update profile.");
      });
  };

  if (loading) {
      return (
          <View style={styles.centered}>
              <ActivityIndicator size="large" color="#00df82" />
              <Text style={{color: '#fff', marginTop: 10}}>Loading profile...</Text>
          </View>
      );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <User color="#00df82" size={24} />
                <Text style={styles.headerTitle}>Driver Profile</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
                <X color="#fff" size={24} />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
            <View style={styles.glassPanel}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email (Read Only)</Text>
                    <TextInput 
                        style={[styles.input, styles.disabledInput]} 
                        value={profileData.email} 
                        editable={false} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput 
                        style={styles.input} 
                        value={profileData.name} 
                        onChangeText={text => setProfileData({...profileData, name: text})} 
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TextInput 
                            style={styles.input} 
                            value={profileData.dob} 
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor="#666"
                            onChangeText={text => setProfileData({...profileData, dob: text})} 
                        />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput 
                            style={styles.input} 
                            value={profileData.phone} 
                            onChangeText={text => setProfileData({...profileData, phone: text})} 
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.label}>Vehicle Number</Text>
                        <TextInput 
                            style={styles.input} 
                            value={profileData.vehicleNumber} 
                            onChangeText={text => setProfileData({...profileData, vehicleNumber: text})} 
                        />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.label}>License ID</Text>
                        <TextInput 
                            style={styles.input} 
                            value={profileData.licenseId} 
                            onChangeText={text => setProfileData({...profileData, licenseId: text})} 
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Home Address</Text>
                    <TextInput 
                        style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
                        multiline 
                        value={profileData.address} 
                        onChangeText={text => setProfileData({...profileData, address: text})} 
                    />
                </View>

                <TouchableOpacity 
                    style={styles.saveBtn} 
                    onPress={handleSave}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Save color="#000" size={20} />
                            <Text style={styles.saveBtnText}>Save Details</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1115',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#191c24',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  glassPanel: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  disabledInput: {
    opacity: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#00df82',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
