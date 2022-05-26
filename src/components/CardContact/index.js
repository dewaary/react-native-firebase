import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();

const CardContact = ({id, ContactItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailContact', {id: id})}>
      <View>
        <Text style={styles.title}>{ContactItem.name}</Text>
        <Text style={styles.phone}>Phone Number : {ContactItem.phone}</Text>
      </View>
      <View style={styles.icon}>
        <Icon
          name="edit"
          size={25}
          color="orange"
          onPress={() => navigation.navigate('EditContact', {id: id})}
        />
        <Icon
          name="delete"
          size={25}
          color="red"
          onPress={() => removeData(id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardContact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  phone: {
    fontSize: 12,
    color: 'grey',
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
