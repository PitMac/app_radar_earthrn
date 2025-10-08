import { View, Text,FlatList, } from "react-native";
import React, {useEffect, useState} from "react";
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";
import GlobalIcon from "../components/GlobalIcon";
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyList from "../components/EmptyList";

export default function ActivitiesScreen() {
  const navigation = useNavigation();
  const keyExtractor = (item, index) => index.toString();
  const [actividades, setActividades] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
      setIsRefreshing(true);
      //getDeudas();
  }

    const renderActividades = (item, index) => {
      console.log(item);
        return (
            <View>

            </View>
        )
    }
    useEffect(() => {
        setActividades([
            {
                "type": "Feature",
                "id": "22251862",
                "properties": {
                    "time": 1759896192000,
                    "mag": 2.5,
                    "place": "New Zealand",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        174.76162,
                        -38.93398,
                        24.5
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251846",
                "properties": {
                    "time": 1759895636000,
                    "mag": 3,
                    "place": "Cyclades Isls.- S. Greece",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        25.71207,
                        36.70921,
                        206.8
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251850",
                "properties": {
                    "time": 1759895448000,
                    "mag": 5.4,
                    "place": "South Sandwich Islands Region",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -24.3806,
                        -57.6808,
                        10
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251839",
                "properties": {
                    "time": 1759895402000,
                    "mag": 3,
                    "place": "Offshore EL Salvador",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -88.7122,
                        12.8977,
                        51.2
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251812",
                "properties": {
                    "time": 1759894885000,
                    "mag": 2.4,
                    "place": "59 km N of Petersville, Alaska",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -150.8884,
                        63.0292,
                        119.1
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251836",
                "properties": {
                    "time": 1759894680000,
                    "mag": 2.3,
                    "place": "Philippines: 004 km N 28° E of Cortes (Surigao Del Sur)",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        126.21,
                        9.31,
                        21
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "22251821",
                "properties": {
                    "time": 1759894564000,
                    "mag": 4.6,
                    "place": "Russia: 204 km From Petropavlovsk-Kamchatskiy",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        161.6575,
                        52.759,
                        15.08
                    ]
                }
            }]);
    }, []);
  return (
    <View>
      <CustomAppBar
        title="Actividades"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
        <SafeAreaView style={{ height:'80%',width: '100%', }}>
            <FlatList
                keyExtractor={keyExtractor}
                data={actividades}
                renderItem={({ item, index }) => renderActividades(item, index)}
                ListEmptyComponent={<EmptyList message="¡Todo en calma por ahora!" message2="Sin eventos sísmicos recientes detectados." />}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    </View>
  );
}
