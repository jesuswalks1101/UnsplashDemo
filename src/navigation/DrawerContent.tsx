import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Title, IconButton } from 'react-native-paper';

export function DrawerContent(props: any) {

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.headerSection}>
          <Title style={styles.headerTitle}>Unsplash Demo</Title>
          <IconButton 
            icon='close' 
            size={24} 
            onPress={() => {
              props.navigation.toggleDrawer();
            }} 
          />
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
            label="Images"
            onPress={() => props.navigation.navigate("Images")}
          />
        </Drawer.Section>
      </View>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  headerSection: {
    padding: 15,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    marginTop: 10,
  },
  drawerSection: {
    padding: 5
  },
});