import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import HelpModal from '../components/HelpModal';
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";
import GlobalIcon from "../components/GlobalIcon";
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyList from "../components/EmptyList";
import { List, Card, Text } from 'react-native-paper';
import { Colors } from "../utils/Colors";
import SismoCard from "../components/SismoCard";
import CustomLoader from "../components/CustomLoader";

export default function ActivitiesScreen() {
    const navigation = useNavigation();
    const keyExtractor = (item, index) => index.toString();
    const [actividades, setActividades] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [helpVisible, setHelpVisible] = useState(false);

    useEffect(() => {
        getLastActividades();
    }, []);

    const handleRefresh = () => {
        setActividades([]);
        setIsRefreshing(true);
        getLastActividades();
    }

    const getLastActividades = () => {
        setActividades([
            {
                "type": "Feature",
                "id": "22261552",
                "properties": {
                    "time": 1760120487000,
                    "mag": 2.8,
                    "place": "Flores Sea, 34 km NW of Pulau Medang Island, West Nusa Tenggara, Indonesia",
                    "source": "BMKG",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        117.18,
                        -7.91,
                        16
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261557",
                "properties": {
                    "time": 1760120220000,
                    "mag": 3.9,
                    "place": "Philippine Sea, 49 km ESE of Manay, Philippines",
                    "source": "PHIVOLCS",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        126.96,
                        7.06,
                        11
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261543",
                "properties": {
                    "time": 1760120122000,
                    "mag": 4.4,
                    "place": "Philippine Sea, 64 km SE of Manay, Philippines",
                    "source": "BMKG",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        127,
                        6.87,
                        10
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261539",
                "properties": {
                    "time": 1760120090000,
                    "mag": 2.6,
                    "place": "17 km SSE of Tarutung, Kabupaten Tapanuli Utara, North Sumatra, Indonesia",
                    "source": "BMKG",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        99.04,
                        1.88,
                        10
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261538",
                "properties": {
                    "time": 1760119916000,
                    "mag": 3.1,
                    "place": "Indian Ocean, 94 km S of Kepanjen, Kabupaten Malang, Jawa Timur, Indonesia",
                    "source": "BMKG",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        112.43,
                        -8.96,
                        36
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261545",
                "properties": {
                    "time": 1760119824000,
                    "mag": 3.4,
                    "place": "Philippine Sea, 59 km E of Manay, Province of Davao Oriental, Davao, Philippines",
                    "source": "EMSC",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        127.06,
                        7.11,
                        20
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261526",
                "properties": {
                    "time": 1760119636000,
                    "mag": 2.9,
                    "place": "South Pacific Ocean, 97 km NW of Vallenar, Huasco, Region de Atacama, Chile",
                    "source": "CSN",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -71.496,
                        -28,
                        36
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22261564",
                "properties": {
                    "time": 1760119560000,
                    "mag": 2.5,
                    "place": "Philippine Sea, 3.2 km NNW of Bogo, Philippines",
                    "source": "PHIVOLCS",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        124,
                        11.08,
                        15
                    ]
                }
            }]);

        setIsRefreshing(false);
    }

    return (
        <View>
            <CustomLoader loading={isLoading} />
            <CustomAppBar
                title="Actividades"
                showDrawerButton
                onDrawerPress={() => navigation.openDrawer()}
                rightComponent={
                    <TouchableOpacity onPress={() => setHelpVisible(true)} style={{ marginRight: 8 }}>
                        <Ionicons name="help-circle" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                }
            />
            <View style={{ height: '85%', width: '100%' }}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={actividades}
                    renderItem={({ item }) => <SismoCard feature={item} />}
                    ListEmptyComponent={<EmptyList message="¡Todo en calma por ahora!" message2="Sin eventos sísmicos recientes detectados." />}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                />
            </View>
            <HelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
        </View>
    );
}

