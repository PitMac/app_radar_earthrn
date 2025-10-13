import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text, TextInput, Button, Switch, Appbar, Divider } from "react-native-paper";
import GlobalIcon from "../components/GlobalIcon";
import { Colors } from "../utils/Colors";


const REGIONS = [
  "Latinoamérica",
  "Norteamérica",
  "Europa",
  "Asia",
  "Oceanía",
  "África",
];

import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [showRegionList, setShowRegionList] = useState(false);
  const [internationalAlerts, setInternationalAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Portada azul */}
        <View style={styles.cover}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
            activeOpacity={0.7}
          >
            <GlobalIcon family="materialC" name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/icon.png')}
                style={styles.avatar}
              />
              <View style={styles.avatarEditCircle}>
                <GlobalIcon
                  family="materialC"
                  name="pencil"
                  size={20}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Card de datos */}
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            mode="outlined"
            value={username}
            onChangeText={setUsername}
            placeholder="Tu nombre"
            style={styles.input}
          />
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            style={styles.input}
            keyboardType="email-address"
          />
          <Button
            mode="contained-tonal"
            style={styles.button}
            onPress={() => {}}
            icon="lock-reset"
          >
            Cambiar contraseña
          </Button>
          <Divider style={{ marginVertical: 16 }} />
          <Text style={styles.label}>Región</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setShowRegionList(!showRegionList)}
            activeOpacity={0.7}
          >
            <Text style={styles.selectText}>{region}</Text>
            <Text style={{ fontSize: 18, color: Colors.primary }}>▼</Text>
          </TouchableOpacity>
          {showRegionList && (
            <View style={styles.regionList}>
              {REGIONS.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={styles.regionItem}
                  onPress={() => {
                    setRegion(r);
                    setShowRegionList(false);
                  }}
                >
                  <Text style={{ color: Colors.primary, fontWeight: region === r ? 'bold' : 'normal' }}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Divider style={{ marginVertical: 16 }} />
          <View style={styles.switchRow}>
            <Text style={styles.label}>Alertas internacionales</Text>
            <Switch value={internationalAlerts} onValueChange={setInternationalAlerts} color={Colors.primary} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Push notifications</Text>
            <Switch value={pushNotifications} onValueChange={setPushNotifications} color={Colors.primary} />
          </View>
          <Divider style={{ marginVertical: 16 }} />
          <Button mode="contained" style={styles.saveButton} onPress={() => {}} icon="content-save">
            Guardar cambios
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  cover: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  menuButton: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    borderRadius: 20,
    padding: 4,
    top: '80%',
    transform: [{ translateY: -20 }], 
  },
  avatarContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  avatarEditCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  card: {
    marginTop: 60,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: 'stretch',
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#f7f7f7',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: '#f7f7f7',
  },
  selectText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  regionList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 8,
    marginTop: -8,
    zIndex: 10,
  },
  regionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 8,
  },
});
