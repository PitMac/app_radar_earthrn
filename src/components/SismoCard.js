import React, { useState } from "react";
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Card, Text, FAB,useTheme } from 'react-native-paper';
import { Colors } from '../utils/Colors';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import RippleOverlay from "./RippleOverlay";
import { useThemeStore } from "../stores/themeStore";

export default function SismoCard({ feature }) {
    const { properties, geometry } = feature;
    const theme = useTheme();
    const darkMode = useThemeStore((state) => state.darkMode);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [lon, lat, depth] = geometry.coordinates;
    const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const OSM_TILE_URL_BLACK = 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png';
    const mapRef = React.useRef(null);

    const initialRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    const modalTargetRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
    };

    const MAGNITUDE_COLORS = {
        GREEN: '#4CAF50',
        YELLOW: '#FFC107',
        RED: '#F44336',
        VIOLET: '#9C27B0',
        DEFAULT: Colors.primary
    };

    const RIPPLE_PARAMS = {
        // mag <= 3.4: 45 km de radio máximo, 1.8s de duración
        GREEN: { maxR: 45000, dur: 1800 },
        // 3.5 <= mag <= 4.4: 80 km de radio máximo, 2.2s de duración
        YELLOW: { maxR: 80000, dur: 2200 },
        // 4.5 <= mag <= 5.4: 120 km de radio máximo, 2.6s de duración
        RED: { maxR: 120000, dur: 2600 },
        // mag > 5.5: 180 km de radio máximo, 3.0s de duración
        VIOLET: { maxR: 180000, dur: 3000 },
    };

    const getMagnitudeColor = (mag) => {
        if (mag > 5.5) {
            return MAGNITUDE_COLORS.VIOLET;
        } else if (mag >= 4.5) {
            return MAGNITUDE_COLORS.RED;
        } else if (mag >= 3.5) {
            return MAGNITUDE_COLORS.YELLOW;
        } else if (mag >= 0) {
            return MAGNITUDE_COLORS.GREEN;
        }
        return MAGNITUDE_COLORS.DEFAULT;
    };

    const getRippleParams = (mag) => {
        if (mag > 5.5) {
            return RIPPLE_PARAMS.VIOLET;
        } else if (mag >= 4.5) {
            return RIPPLE_PARAMS.RED;
        } else if (mag >= 3.5) {
            return RIPPLE_PARAMS.YELLOW;
        } else if (mag >= 0) {
            return RIPPLE_PARAMS.GREEN;
        }
        return RIPPLE_PARAMS.GREEN;
    };

    function hexToRgba(hex, alpha = 1) {
        let c = hex.replace('#', '');
        if (c.length === 3) {
            c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
        }
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r},${g},${b},${alpha})`;
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // Ejemplo de formato: "2025-10-06 | 14:30 UTC"
        return date.toLocaleDateString() + ' | ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    };

    const handleRecenter = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(modalTargetRegion, 500);
        }
    };

    const ripple = getRippleParams(properties.mag);
    return (
        <Card
            style={[styles.card,{ backgroundColor: theme.colors.surface}]}
            elevation={2}
            onPress={() => {}}
        >
            <View style={styles.cardContent}>
                <View style={styles.detailsContainer}>
                    <View style={styles.magnitudeBox}>
                        <Text style={[styles.magnitudeText, { color: getMagnitudeColor(properties.mag) }]}>
                            {properties.mag.toFixed(1)}
                        </Text>
                        <Text style={styles.magnitudeLabel}>
                            MAG
                        </Text>
                        <Text style={[styles.depthText,{color: darkMode ? 'gray' : Colors.primary}]}>
                            D:{depth}km
                        </Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={[styles.titleText,{color: darkMode ? 'white' : 'black'}]} numberOfLines={3}>
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
                        <UrlTile urlTemplate={!darkMode ? OSM_TILE_URL : OSM_TILE_URL_BLACK} />

                        <Marker
                            coordinate={{ latitude: lat, longitude: lon }}
                            pinColor={getMagnitudeColor(properties.mag)}
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
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable
                        style={styles.modalView}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <MapView
                                key={modalVisible ? 'map-active' : 'map-inactive'}
                                ref={mapRef}
                                style={styles.fullMapView}
                                initialRegion={modalTargetRegion}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                rotateEnabled={false}
                                pitchEnabled={false}
                                toolbarEnabled={false}
                            >
                                <UrlTile urlTemplate={!darkMode ? OSM_TILE_URL : OSM_TILE_URL_BLACK} />
                                {/*} <Marker
                                    coordinate={{ latitude: lat, longitude: lon }}
                                    pinColor={getMagnitudeColor(properties.mag)}
                                />*/}
                                <Marker
                                    coordinate={{ latitude: lat, longitude: lon }}
                                    tracksViewChanges={false}
                                    onPress={() => { }}
                                >
                                    <View style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 16,
                                        backgroundColor: getMagnitudeColor(properties.mag),
                                        borderWidth: 2,
                                        borderColor: 'transparent',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        elevation: 3
                                    }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>{properties.mag.toFixed(1)}</Text>
                                    </View>
                                </Marker>
                            </MapView>
                            <RippleOverlay
                                size={180}
                                color={hexToRgba(getMagnitudeColor(properties.mag), 0.25)}
                                duration={ripple.dur}
                                isPulsing={modalVisible}
                                style={{ position: 'absolute', left: '50%', top: '50%', transform: [{ translateX: -90 }, { translateY: -90 }] }}
                            />
                        </View>
                        {/*<FAB
                            icon="crosshairs-gps"
                            small={true}
                            onPress={handleRecenter}
                            style={styles.recenterButton}
                            color="white"
                        />*/}
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
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 5,
    },
    infoBox: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600'
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },
    mapContainer: {
        width: 120,
        height: '100%',
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    mapView: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
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
        backgroundColor: Colors.primary,
        borderRadius: 20,
    },
    recenterButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: Colors.primary,
        zIndex: 10,
    },
});