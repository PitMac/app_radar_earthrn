import React, { useState } from "react";
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Card, Text, FAB } from 'react-native-paper';
import { Colors } from '../utils/Colors';
import MapView, { Marker, UrlTile } from 'react-native-maps';

export default function SismoCard({ feature }) {
    const { properties, geometry } = feature;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [lon, lat, depth] = geometry.coordinates;
    const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const initialRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    const mapRef = React.useRef(null); // 👈 Referencia para el MapView

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // Ejemplo de formato: "2025-10-06 | 14:30 UTC"
        return date.toLocaleDateString() + ' | ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    };

    // Región de zoom del modal (donde queremos volver)
    const modalTargetRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15
    };

    const handleRecenter = () => {
        if (mapRef.current) {
            // Animamos la vista del mapa de vuelta a la región objetivo
            mapRef.current.animateToRegion(modalTargetRegion, 500); // 500ms de animación
        }
    };

    return (
        <Card
            style={styles.card}
            elevation={2}
            onPress={() => console.log('Ver sismo:', feature.id)}
        >
            <View style={styles.cardContent}>
                <View style={styles.detailsContainer}>
                    <View style={styles.magnitudeBox}>
                        <Text style={styles.magnitudeText}>
                            {properties.mag.toFixed(1)}
                        </Text>
                        <Text style={styles.magnitudeLabel}>
                            MAG
                        </Text>
                        <Text style={styles.depthText}>
                            D:{depth}km
                        </Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.titleText} numberOfLines={2}>
                            {properties.place}
                        </Text>
                        <Text style={styles.dateText}>
                            {formatTime(properties.time)}
                        </Text>
                    </View>
                </View>


                <Pressable
                    onLongPress={() => setModalVisible(true)}
                    //onPressOut={() => setModalVisible(false)}
                    delayLongPress={300}
                    style={styles.mapContainer}
                >
                    <MapView
                        style={styles.mapView}
                        initialRegion={initialRegion}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                        pitchEnabled={false}
                    >
                        <UrlTile urlTemplate={OSM_TILE_URL} />

                        <Marker
                            coordinate={{ latitude: lat, longitude: lon }}
                            pinColor={Colors.primary}
                            tracksViewChanges={false}
                            onPress={() => { }}
                            onLongPress={() => { }}
                        />
                    </MapView>
                </Pressable>

            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.centeredView}
                    onPress={() => setModalVisible(false)} // CIERRA AL TOCAR EL FONDO
                >
                    <Pressable
                        style={styles.modalView}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <MapView
                            ref={mapRef}
                            style={styles.fullMapView}
                            initialRegion={modalTargetRegion}
                            scrollEnabled={true}
                            zoomEnabled={true}
                        >
                            <UrlTile urlTemplate={OSM_TILE_URL} />
                            <Marker
                                coordinate={{ latitude: lat, longitude: lon }}
                                pinColor={Colors.primary}
                            />
                        </MapView>
                        <FAB
                            icon="crosshairs-gps"
                            small={true}
                            onPress={handleRecenter}
                            style={styles.recenterButton}
                            color="white"
                        />
                        {/*
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar</Text>
                        </Pressable>
                        */}
                    </Pressable>
                </Pressable>
            </Modal>
        </Card>
    );
};


const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 0,
        minHeight: 100,
    },
    detailsContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    magnitudeBox: {
        alignItems: 'center',
        marginRight: 15,
    },
    magnitudeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    magnitudeLabel: {
        fontSize: 12,
        color: 'gray',
        marginTop: -5,
    },
    depthText: {
        fontSize: 10, // Pequeño y sutil
        color: Colors.primaryDrawer,
        fontWeight: 'bold',
        marginTop: 5, // Espacio entre MAG y Profundidad
    },
    infoBox: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },

    mapContainer: {
        width: 120, // Ancho fijo para el mini-mapa
        height: '100%',
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    mapView: {
        flex: 1,
    },

    // --- ESTILOS DEL MODAL ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro y semitransparente
    },
    modalView: {
        width: '90%', // Ocupa la mayor parte de la pantalla
        height: '60%', // Altura generosa
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden', // Importante para que el mapa respete el borderRadius
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    fullMapView: {
        flex: 1,
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        bottom: 15,
        padding: 10,
        backgroundColor: Colors.primary, // Usa tu color principal
        borderRadius: 20,
    },
    recenterButton: {
        position: 'absolute',
        top: 20, // Distancia desde arriba
        right: 20, // Distancia desde la derecha
        backgroundColor: Colors.primary, // Usa tu color principal
        zIndex: 10, // Asegura que esté por encima del mapa
    },
});