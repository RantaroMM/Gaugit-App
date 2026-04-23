import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { BleManager } from "react-native-ble-plx";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useBLE } from '@/hooks/use-ble';


export default function app() {

  const { requestPermissions, scanForPeripherals, allDevices } = useBLE();

  const handleConnectPress = async () => {
    const isGranted = await requestPermissions();
    if (isGranted) {
      scanForPeripherals();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.container}>
          <Text style={styles.text}>FW-RID-RPico2W-SPI</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleConnectPress}>
          <Text>Connect</Text>
        </TouchableOpacity>

        {allDevices.map((device) => (
        <Text key={device.id} style={{ color: 'white' }}>
          {device.name || "Unknown Device"}
        </Text>
      ))}
      
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
  }
})