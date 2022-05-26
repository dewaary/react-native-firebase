import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import InputData from '../../components/InputData';
import FIREBASE from '../../config/FIREBASE';
import {useNavigation} from '@react-navigation/native';
import {doc} from 'firebase/firestore';

export default class CreateContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
    };
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.name && this.state.phone && this.state.address) {
      const contactRefrece = FIREBASE.database().ref('Contact');

      const contact = {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
      };

      contactRefrece
        .push(contact)
        .then(data => {
          Alert.alert('Success', 'Success Save');
          this.props.navigation.navigate('HomeScreen');
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    } else {
      Alert.alert('Error', 'Required');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <InputData
          label="Name"
          placeholder="Input Name"
          onChangeText={this.onChangeText}
          value={this.state.name}
          nameState="name"
        />

        <InputData
          label="Phone"
          placeholder="Input Phone Number"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.phone}
          nameState="phone"
        />

        <InputData
          label="Address"
          placeholder="Input Address"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.address}
          nameState="address"
        />

        <TouchableOpacity
          style={styles.buttomSubmit}
          onPress={() => this.onSubmit()}>
          <Text style={styles.textButtom}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  buttomSubmit: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textButtom: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
