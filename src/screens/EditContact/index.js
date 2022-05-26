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
import {getDatabase, ref, onValue} from 'firebase/database';

export default class EditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
    };
  }

  componentDidMount() {
    this.getDataContact();
  }

  getDataContact = () => {
    // FIREBASE.database()
    //   .ref('Contact')
    //   .once('value', querySnapShot => {
    //     let data = querySnapShot.val() ? querySnapShot.val : [];
    //     let ContactItem = {...data};
    //     console.log('ini contact item', ContactItem);

    //     this.setState({
    //       contacts: ContactItem,
    //       contactsKey: Object.keys(ContactItem),
    //     });
    //   });

    const db = getDatabase();
    const starCountRef = ref(db, 'Contact/' + this.props.route.params.id);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      const ContactItem = {...data};

      this.setState({
        name: ContactItem.name,
        phone: ContactItem.phone,
        address: ContactItem.address,
      });
    });
  };

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.name && this.state.phone && this.state.address) {
      const contactRefrece = FIREBASE.database().ref(
        'Contact/' + this.props.route.params.id,
      );

      const contact = {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
      };

      contactRefrece
        .update(contact)
        .then(data => {
          Alert.alert('Success', 'Success Update Data');
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
